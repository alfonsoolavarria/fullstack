var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');
var _ = require('lodash');

var ServiceControllers = {};

ServiceControllers.createService = function createService (options) {
  var service = new Parse.Object('Service');
  service.set('status',true);
  service.set({'serviceName':options.serviceName});
  service.set({'duration':options.duration});
  service.set({'price':options.price});
  service.set({'description':options.description});
  service.set('business', {"__type":"Pointer","className":"Business","objectId":options.idBusiness});
  service.set('serviCategory', {"__type":"Pointer","className":"serviceCategory","objectId":options.category});
  //service.set('employee',options.employee);
  service.set('schedule',options.schedule);
  //service.set('category',options.category);
  var acl = new Parse.ACL();
  acl.setPublicWriteAccess(true);
  acl.setPublicReadAccess(true);
  service.setACL(acl);
  return service.save().then(function(saveData) {
      // The save was successful.
      return {ready:true,successful:'Created Service',id:saveData.id};
    }, function(error) {
      console.log('Service Save Error',error);
      return {ready:false,error:'Service Save Error '+error};
    });

};

ServiceControllers.updateService = function updateService (options) {
  var query = new Parse.Query('Service');
  query.equalTo('status',true);
  return query.get(options.id).then(function(dataS) {
    if (options.delete) {
      dataS.set('status',false);
    }else {
      if (options.serviceName) dataS.set({'serviceName':options.serviceName});
      if (options.price) dataS.set({'price':options.price});
      if (options.duration) dataS.set({'duration':options.duration});
      if (options.description) dataS.set({'description':options.description});
      if (options.employee) dataS.set({'employee':options.employee});
      if (options.schedule) dataS.set({'schedule':options.schedule});
      if (options.category) dataS.set('serviCategory', {"__type":"Pointer","className":"serviceCategory","objectId":options.category});
      if (options.isFeatured) dataS.set({'isFeatured':JSON.parse(options.isFeatured)});
    }
    return dataS.save().then(function(saveData) {
        // The save was successful.
        return {ready:true,successful:'Created Service',id:saveData.id,dataCustom:JSON.stringify(dataS)};
      }, function(error) {
        console.log('Service Save Error',error);
        return {ready:false,error:'Service Save Error '+error};
      });
    });


};

ServiceControllers.getService = function getService (id,reqparams) {
  var page=reqparams.page ? reqparams.page : 0;
  var cantpage=10;
  var query = new Parse.Query('Service');
  var consulta;
  if (id) {
    query.equalTo('business', new Parse.Object('Business', {id: id}));
  }
  query.equalTo('status', true);

  return query.find().then(function(cate) {
    return query.count().then(function(cantData) {
      var listC = [];
      _.forEach(cate, function(categories) {
        if (listC.indexOf(categories.get('category'))<0) {
          listC.push(categories.get('category'));
        }
      });
      if ((cantData/2)>0 && (cantData/2)%1==0) {
        //entero
        cantpage=(cantData/2)*10;
      }else if ((cantData/2)>0 && (cantData/2)%1!=0) {
        //redondeo
        cantpage=Math.round(cantData/2)*10;
      }else {
        //una sola pagina
        cantpage=1*10;
      }

      if (reqparams.type=='service') consulta = query.descending('createdAt').limit(2).skip(page*2).find();
      else consulta = query.find();

      return consulta.then(function(data) {
        var promises = [];
        var kk = 0;
        _.forEach(data, function(allD) {
            promises.push(allD.relation('employee2').query().equalTo('isActive',true).find());
        });
        return Parse.Promise.when(promises).then(function(resultados, index) {
            for (var i = 0; i < resultados.length; i++) {
                data[i] = data[i].toJSON();
                data[i].alfonso = [];
                data[i].alfonso.push(resultados[i]);
            }
            if (reqparams.type=='service') data.push({catpageE:cantpage,liscate:listC});
            if (reqparams.type=='listcate') data.push({liscate:listC});
            return data;
        });
      });
    });
  });
};

ServiceControllers.getService2 = function getService2 (id,reqparams) {
  var query1 = new Parse.Query('Business');
  query1.equalTo('owner', new Parse.Object('_User', { id:id }));
  return query1.find().then(function(dataE){
    var page=reqparams.page ? reqparams.page : 0;
    //var cantpage=10;
    var query = new Parse.Query('Service');
    var consulta;

    query.equalTo('business', new Parse.Object('Business', {id: dataE[0].id}));
    query.equalTo('status', true);

    return query.find().then(function(cate) {
      var promises1 = [], cateselected=[], onlylistcat=[], destacados = [];
      return dataE[0].relation('serviCategory').query().find().then(function(services) {
        /*_.each(cate, function(servidata,index) {
          if (JSON.parse(JSON.stringify(servidata)).isFeatured==true && JSON.parse(JSON.stringify(servidata)).status==true) {
            destacados.push(JSON.parse(JSON.stringify(servidata)));
          }
        });*/
        _.each(services, function(serviceonettoone,index) {
          for (var i = 0; i < cate.length; i++) {
            /*console.log('11111111111111');
            console.log('iddd1',JSON.parse(JSON.stringify(cate[i])).objectId);
            console.log('idd222',JSON.parse(JSON.stringify(services[index])).objectId);
            console.log('2222222');*/
            if (JSON.parse(JSON.stringify(cate[i])).serviCategory.objectId == JSON.parse(JSON.stringify(serviceonettoone)).objectId) {
              cateselected.push({
                name:JSON.parse(JSON.stringify(serviceonettoone)).name,
                id:JSON.parse(JSON.stringify(serviceonettoone)).objectId
              });
            }
          }
          onlylistcat.push(JSON.parse(JSON.stringify(serviceonettoone)).name);
          promises1.push({id:JSON.parse(JSON.stringify(serviceonettoone)).objectId,name:JSON.parse(JSON.stringify(serviceonettoone)).name});
        });
        var listC = [];
        //tool de schedule
        var dow = [], allhours = [];
        var lun1 = [], lun2 = [], lun3 = [], lun4 = [],
            mart1 = [], mart2 = [], mart3 = [], mart4 = [],
            mier1 = [] , mier2 = [], mier3 = [], mier4 = [],
            jue1 = [], jue2 = [], jue3 = [], jue4 = [],
            vie1 = [] , vie2 = [], vie3 = [], vie4 = [],
            sab1 = [] , sab2 = [], sab3 = [], sab4 = [],
            dom1 = [] , dom2 = [], dom3 = [], dom4 = [];
        function orderforDay(days) {
          if (days[0].Lunes[0].horario1[0].length>0) {
            //lunes
            lun1.push(days[0].Lunes[0].horario1[0]);

            lun2.push(days[0].Lunes[0].horario1[1]);
            lun3.push(days[0].Lunes[0].horario2[0]);

            lun4.push(days[0].Lunes[0].horario2[1]);
            dow.push(1);
            allhours.push(days[0].Lunes[0].horario1[0]);
            allhours.push(days[0].Lunes[0].horario1[1]);
            allhours.push(days[0].Lunes[0].horario2[0]);
            allhours.push(days[0].Lunes[0].horario2[1]);
          }
          if (days[0].Martes[0].horario1[0].length>0) {
            //martes
            mart1.push(days[0].Martes[0].horario1[0]);

            mart2.push(days[0].Martes[0].horario1[1]);
            mart3.push(days[0].Martes[0].horario2[0]);

            mart4.push(days[0].Martes[0].horario2[1]);
            dow.push(2);
            allhours.push(days[0].Martes[0].horario1[0]);
            allhours.push(days[0].Martes[0].horario1[1]);
            allhours.push(days[0].Martes[0].horario2[0]);
            allhours.push(days[0].Martes[0].horario2[1]);
          }
          if (days[0].Miercoles[0].horario1[0].length>0) {
            //miercoles
            mier1.push(days[0].Miercoles[0].horario1[0]);

            mier2.push(days[0].Miercoles[0].horario1[1]);
            mier3.push(days[0].Miercoles[0].horario2[0]);

            mier4.push(days[0].Miercoles[0].horario2[1]);
            dow.push(3);
            allhours.push(days[0].Miercoles[0].horario1[0]);
            allhours.push(days[0].Miercoles[0].horario1[1]);
            allhours.push(days[0].Miercoles[0].horario2[0]);
            allhours.push(days[0].Miercoles[0].horario2[1]);
          }
          if (days[0].Jueves[0].horario1[0].length>0) {
            //jueves
            jue1.push(days[0].Jueves[0].horario1[0]);

            jue2.push(days[0].Jueves[0].horario1[1]);
            jue3.push(days[0].Jueves[0].horario2[0]);

            jue4.push(days[0].Jueves[0].horario2[1]);
            dow.push(4);
            allhours.push(days[0].Jueves[0].horario1[0]);
            allhours.push(days[0].Jueves[0].horario1[1]);
            allhours.push(days[0].Jueves[0].horario2[0]);
            allhours.push(days[0].Jueves[0].horario2[1]);
          }
          if (days[0].Viernes[0].horario1[0].length>0) {
            //viernes
            vie1.push(days[0].Viernes[0].horario1[0]);

            vie2.push(days[0].Viernes[0].horario1[1]);
            vie3.push(days[0].Viernes[0].horario2[0]);

            vie4.push(days[0].Viernes[0].horario2[1]);
            dow.push(5);
            allhours.push(days[0].Viernes[0].horario1[0]);
            allhours.push(days[0].Viernes[0].horario1[1]);
            allhours.push(days[0].Viernes[0].horario2[0]);
            allhours.push(days[0].Viernes[0].horario2[1]);
          }
          if (days[0].Sabado[0].horario1[0].length>0) {
            //sabados
            sab1.push(days[0].Sabado[0].horario1[0]);

            sab2.push(days[0].Sabado[0].horario1[1]);
            sab3.push(days[0].Sabado[0].horario2[0]);

            sab4.push(days[0].Sabado[0].horario2[1]);
            dow.push(6);
            allhours.push(days[0].Sabado[0].horario1[0]);
            allhours.push(days[0].Sabado[0].horario1[1]);
            allhours.push(days[0].Sabado[0].horario2[0]);
            allhours.push(days[0].Sabado[0].horario2[1]);
          }
          if (days[0].Domingo[0].horario1[0].length>0) {
            //domingos
            dom1.push(days[0].Domingo[0].horario1[0]);

            dom2.push(days[0].Domingo[0].horario1[1]);
            dom3.push(days[0].Domingo[0].horario2[0]);

            dom4.push(days[0].Domingo[0].horario2[1]);
            dow.push(0);
            allhours.push(days[0].Domingo[0].horario1[0]);
            allhours.push(days[0].Domingo[0].horario1[1]);
            allhours.push(days[0].Domingo[0].horario2[0]);
            allhours.push(days[0].Domingo[0].horario2[1]);
          }
          return;
        }
        //ates de abrir
        function sortByhours(array1) {
          array1.sort();
          var num = array1[0];
          return num;
        }

        function sortReverseByhours(array1) {
          array1.sort();
          array1.reverse();
          var num = array1[0];
          return num;
        }


        //fin del tool de schedule
        _.forEach(cate, function(categories) {
          orderforDay(categories.get('schedule'));
          if (listC.indexOf(categories.get('category'))<0) {
            listC.push(categories.get('category'));
          }
        });
        for (var i = 0; i < [1,2,3,4,5,6,7].length; i++) {
          if (i==0) {
            // fase 1 cierre-antes de abrir el negocio
            lun1 = sortByhours(lun1);
            // fase 2 hora de descando
            lun2 = sortReverseByhours(lun2);
            lun3 = sortByhours(lun3);
            //fase 3 hora de cierre
            lun4 = sortReverseByhours(lun4);
          }else if (i==1) {
            // fase 1 cierre-antes de abrir el negocio
            mart1 = sortByhours(mart1);
            // fase 2 hora de descando
            mart2 = sortReverseByhours(mart2);
            mart3 = sortByhours(mart3);
            //fase 3 hora de cierre
            mart4 = sortReverseByhours(mart4);
          }else if (i==2) {
            // fase 1 cierre-antes de abrir el negocio
            mier1 = sortByhours(mier1);
            // fase 2 hora de descando
            mier2 = sortReverseByhours(mier2);
            mier3 = sortByhours(mier3);
            //fase 3 hora de cierre
            mier4 = sortReverseByhours(mier4);
          }else if (i==3) {
            // fase 1 cierre-antes de abrir el negocio
            jue1 = sortByhours(jue1);
            // fase 2 hora de descando
            jue2 = sortReverseByhours(jue2);
            jue3 = sortByhours(jue3);
            //fase 3 hora de cierre
            jue4 = sortReverseByhours(jue4);
          }else if (i==4) {
            // fase 1 cierre-antes de abrir el negocio
            vie1 = sortByhours(vie1);
            // fase 2 hora de descando
            vie2 = sortReverseByhours(vie2);
            vie3 = sortByhours(vie3);
            //fase 3 hora de cierre
            vie4 = sortReverseByhours(vie4);
          }else if (i==5) {
            // fase 1 cierre-antes de abrir el negocio
            sab1 = sortByhours(sab1);
            // fase 2 hora de descando
            sab2 = sortReverseByhours(sab2);
            sab3 = sortByhours(sab3);
            //fase 3 hora de cierre
            sab4 = sortReverseByhours(sab4);
          }else if (i==6) {
            // fase 1 cierre-antes de abrir el negocio
            dom1 = sortByhours(dom1);
            // fase 2 hora de descando
            dom2 = sortReverseByhours(dom2);
            dom3 = sortByhours(dom3);
            //fase 3 hora de cierre
            dom4 = sortReverseByhours(dom4);
          }else {
            console.log('nada');
          }
        };

        if (reqparams.type=='service') consulta = query.descending('createdAt').limit(2).skip(page*2).find();
        else consulta = query.find();
        return consulta.then(function(data) {
          var promises = [];
          var kk = 0;
          _.forEach(data, function(allD) {
            promises.push(allD.relation('employee2').query().equalTo('isActive',true).find());
          });
          return Parse.Promise.when(promises).then(function(resultados) {
            for (var i = 0; i < resultados.length; i++) {
              data[i] = data[i].toJSON();
              data[i].alfonso = [];
              data[i].alfonso.push(resultados[i]);
            }
            for (var ii = 0; ii < data.length; ii++) {
              for (var iii = 0; iii < cateselected.length; iii++) {
                if (cateselected[iii].id==data[ii].serviCategory.objectId) {
                  data[ii].serviCategoryName = cateselected[iii].name;
                }
              }
            }
            if (reqparams.type=='service') data.push({catpageE:cantpage,liscate:listC});
            if (reqparams.type=='listcate') data.push({liscate:listC});
            if (reqparams.type=='listcate2') {
              data.push({liscate2:promises1});
              data.push({cateselected:cateselected});
              data.push({listOnly:onlylistcat});
            }

            var minimo = _.uniq(allhours).sort();
            var maximo = _.uniq(allhours).sort().reverse();
            // ad:antes de abrir, d:descanso, c:Cerrado
            data.push({
              lunes:{ad:lun1,d:[lun2,lun3],c:lun4},
              martes:{ad:mart1,d:[mart2,mart3],c:mart4},
              miercoles:{ad:mier1,d:[mier2,mier3],c:mier4},
              jueves:{ad:jue1,d:[jue2,jue3],c:jue4},
              viernes:{ad:vie1,d:[vie2,vie3],c:vie4},
              sabado:{ad:sab1,d:[sab2,sab3],c:sab4},
              domingo:{ad:dom1,d:[dom2,dom3],c:dom4},
              dias:_.uniq(dow),
              minimo:minimo[0] ? minimo[0] : '00:00:00',
              maximo:maximo[0] ? maximo[0] : '24:00:00',
            });
            return data;
          });
        });
        });

    });
  });
};

ServiceControllers.getServiceOne = function getServiceOne (id) {
  var query = new Parse.Query('Service');
  query.equalTo('status', true);
  return query.find().then(function(cate) {
    return query.get(id).then(function(data) {
      var query1 = new Parse.Query('Business');
      return query1.get(JSON.parse(JSON.stringify(data)).business.objectId).then(function(dataS) {
        return dataS.relation('serviCategory').query().find().then(function(services) {
          var promises1 = [], cateselected={};
          _.each(services, function(serviceonettoone) {
            if (JSON.parse(JSON.stringify(data)).serviCategory.objectId == JSON.parse(JSON.stringify(serviceonettoone)).objectId) {
              cateselected={
                name:JSON.parse(JSON.stringify(serviceonettoone)).name,
                id:JSON.parse(JSON.stringify(serviceonettoone)).objectId
              }
            }
            promises1.push({id:JSON.parse(JSON.stringify(serviceonettoone)).objectId,name:JSON.parse(JSON.stringify(serviceonettoone)).name});
          });
          var listC = [];
          _.forEach(cate, function(categories) {
            if (listC.indexOf(categories.get('category'))<0) {
              listC.push(categories.get('category'));
            }
          });
          var promises = [];
          promises.push(data.relation('employee2').query().find());
          return Parse.Promise.when(promises).then(function(resultados,index) {
            for (var i = 0; i < resultados.length; i++) {
              data = data.toJSON();
              data.alfonso = [];
              data.alfonso.push(resultados[i]);
            }
            data.categories=promises1;
            data.categoriesSelected=cateselected;
            data.liscate=listC;
            return [data];
          });
        });
      });
    });
  });
}


ServiceControllers.addReationEmployee = function addReationEmployee (serviceId,employeeId) {
    var query1 = new Parse.Query('_User');
    return query1.get(employeeId).then(function(UserData) {
        var query = new Parse.Query('Service');
        query.get(serviceId).then(function(dataS) {
            dataS.relation('employee2').add(UserData);
            dataS.save(null, {
                useMasterKey: true
            });
            return {
                success: true,
                code: 200
            };
        }, function(error) {
            console.log('Service Get', error);
            return {};
        });
    }, function(error) {
        console.log('User Get', error);
        return {};
    });

};

ServiceControllers.removeReationEmployee = function removeReationEmployee (serviceId) {
    var query = new Parse.Query('Service');
    return query.get(serviceId).then(function(dataS) {
      return dataS.relation('employee2').query().find().then(function(userdelete) {
        dataS.relation('employee2').remove(userdelete);
        dataS.save(null, {
            useMasterKey: true
        });
        return {
            success: true,
            code: 200
        };
      });

    }, function(error) {
        console.log('Service Get', error);
        return {};
    });
};

ServiceControllers.createServiceCategory = function createServiceCategory (options) {
  var serviceCate = new Parse.Object('serviceCategory');
  var query = new Parse.Query('serviceCategory');
  query.equalTo('name',options.categoryservice);
  return query.find().then(function(dataSerCat) {
    if (dataSerCat.length<1) {
        serviceCate.set({'name':options.categoryservice});
        serviceCate.set('business', {"__type":"Pointer","className":"Business","objectId":options.idBusiness});
        var acl = new Parse.ACL();
        acl.setPublicWriteAccess(true);
        acl.setPublicReadAccess(true);
        serviceCate.setACL(acl);
        return serviceCate.save().then(function(saveData) {
            // The save was successful.
            return {code:200,id:saveData.id};
          }, function(error) {
            console.log('Service Save Error',error);
            return {code:500,error:'Service Save Error '+error};
          });
    }else {
      return {code:409,error:'Category Duplicate'};
    }
  });


};

ServiceControllers.addRelationServiceCategory = function addRelationServiceCategory (serviceCateId,options) {
  var query = new Parse.Query('Business');
  return query.get(options.idBusiness).then(function(dataS) {
    var query2 = new Parse.Query('serviceCategory');
    return query2.get(serviceCateId).then(function(dataService) {
      dataS.relation('serviCategory').add(dataService);
      dataS.save(null, {
          useMasterKey: true
      });
      return {code:200};
    }, function(error) {
      console.log('Service Get in Category', error);
      return {code:409};
    });

  });

};

ServiceControllers.updateOrder = function updateOrder (idServiceOrder,idB,position) {
  var query = new Parse.Query('Service');
  query.equalTo('status',true);
  return query.get(idServiceOrder).then(function(dataB) {
    dataB.set({'categoryOrder':position});
    return dataB.save(null, {useMasterKey: true});
  });

};



module.exports = ServiceControllers;
