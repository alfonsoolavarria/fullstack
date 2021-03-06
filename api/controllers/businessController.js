var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');
var _ = require('lodash');

var BusinessControllers = {};

BusinessControllers.searchBusiness = function searchBusiness (options) {
  var query = new Parse.Query('Business');
  //query.equalTo('latlong', (parseFloat(options.latitude),parseFloat(options.longitude)));
  return query.find({
    success: function(object) {},
    error: function(error) {
      // error is an instance of Parse.Error.
      console.log('error search Business');
      console.log('%j',error);
    }
  });
};

BusinessControllers.searchListBusiness = function searchListBusiness (options,pageparams) {
  var query = new Parse.Query('Business');
  var cantpage=1;
  var flag = 0;
  var page=pageparams ? pageparams : 0;
  function twicequery(boolflag) {
    var query2 = new Parse.Query('Business');
    if (boolflag==1) {
      query2.equalTo('owner', new Parse.Object('_User', { id: options.owner }));
    }
    //cantidad de paginas, paginador para el html
    return query2.find().then(function (a) {
      if ((a.length/2)>0 && (a.length/2)%1==0) {
        //entero
        return cantpage=(a.length/2)*10;
      }else if ((a.length/2)>0 && (a.length/2)%1!=0) {
        //redondeo
        return cantpage=(parseInt(a.length/2)+1)*10;
      }else {
        //una sola pagina
        return cantpage=1*10;
      }
    });
  }

  if (options.owner) {
    query.equalTo('owner', new Parse.Object('_User', { id: options.owner }));
    flag = 1;
  }
  //pagination businesslist
  query.descending('createdAt');
  query.limit(2);
  query.skip(page*2);

  query.include('owner.name');
  query.include('owner.email');
  query.include('owner.phone');
  query.include('owner.username');
  query.include('typeCommerce.name');

  return query.find().then(function (objectData) {
    return twicequery(flag).then(function() {
      if (objectData.length<1) {
        cantpage=0;
      }
      //hacer una validacion de paginacion para cuando sea el Propietario
      return {data:objectData,cantPage:cantpage};
    });
  });
};

BusinessControllers.searchListMainBusiness = function searchListMainBusiness (options,pageparams) {
  var query = new Parse.Query('MainBusiness');
  var cantpage=1;
  var flag = 0;
  var page=pageparams ? pageparams : 0;

  function twicequery(boolflag) {
    var query2 = new Parse.Query('MainBusiness');
    //cantidad de paginas, paginador para el html
    return query2.find().then(function (a) {
      if ((a.length/2)>0 && (a.length/2)%1==0) {
        //entero
        return cantpage=(a.length/2)*10;
      }else if ((a.length/2)>0 && (a.length/2)%1!=0) {
        //redondeo
        return cantpage=(parseInt(a.length/2)+1)*10;
      }else {
        //una sola pagina
        return cantpage=1*10;
      }
    });
  }

  //pagination businesslist
  query.descending('createdAt');
  query.limit(2);
  query.skip(page*2);

  query.include('ownerAdmin.name');
  query.include('ownerAdmin.email');
  query.include('ownerAdmin.phone');
  query.include('ownerAdmin.username');

  return query.find().then(function (objectData) {
    return twicequery(flag).then(function() {
      if (objectData.length<1) {
        cantpage=0;
      }
      //hacer una validacion de paginacion para cuando sea el Propietario
      return {data:objectData,cantPage:cantpage};
    });
  });
};

BusinessControllers.searchListMainBranches = function searchListMainBranches (id,pageparams) {
  var query = new Parse.Query('MainBusiness');
  query.include('branch.name');
  query.include('typeCommerce');
  query.equalTo('ownerAdmin', new Parse.Object('_User', { id:id }));
  return query.find().then(function (objectData) {
    var promises = [], branchs=[];

    _.forEach(objectData, function(allD) {
        promises.push(allD.relation('branch').query().descending('createdAt').equalTo('status',true).find());
    });
    return Parse.Promise.when(promises).then(function(resultados, index) {
      for (var i = 0; i < resultados.length; i++) {
        branchs.push(JSON.parse(JSON.stringify(resultados[i])));
      }
      return {data:objectData,cantPage:10,branch:branchs};
    });
  });

};

BusinessControllers.searchGetBusiness = function searchGetBusiness (id) {
  var query = new Parse.Query('Business');
  query.include('owner.name');
  query.include('owner.email');
  query.include('owner.phone');
  query.include('owner.username');
  //query.equalTo('status',true);
  return query.get(id,{
    success: function(object) {},
    error: function(error) {
      // error is an instance of Parse.Error.
      console.log('error search Business');
      console.log('%j',error);
    }
  });
};

/*Registro de Empresa*/
BusinessControllers.createMainBusiness = function createMainBusiness (options,userId,adminId) {
  var mainbusiness = new Parse.Object('MainBusiness');
  mainbusiness.set('status',true);
  mainbusiness.set({'name':options.nameB});
  mainbusiness.set({'branchCount':0});
  mainbusiness.set('typeCommerce',{"__type":"Pointer","className":"TypeBusiness","objectId":options.typeCommerce});
  mainbusiness.set('ownerAdmin', {"__type":"Pointer","className":"_User","objectId":userId});
  return mainbusiness.save().then(function(saveData) {
    // The save was successful.
    return {ready:true,successful:'Created Business',id:saveData.id};
  }, function(error) {
    console.log('Business Save Error',error);
    return {ready:false,error:'Business Save Error '+error};
  });
};

BusinessControllers.updateMainBusiness = function updateMainBusiness (options) {
  var query = new Parse.Query('MainBusiness');
  return query.get(options.id).then(function(dataB){
    if (options.name) dataB.set({'name':options.name});
    if (options.deleteB=='true') dataB.set({'status':false});
    if (options.activa=='true') dataB.set({'status':true});
    dataB.save(null, { useMasterKey: true });
    return{success:true,code:200};
  }, function(error) {
    console.log('Business update Error',error);
    return {ready:false,error:'Business update Error '+error, code:500};
  });

};

BusinessControllers.createBusiness = function createBusiness (options) {

  function filesImages(data) {
    var promise = new Parse.Promise();
    try {
      var avatarImg;
      if (data.icon) {
        avatarImg = new Parse.File(data.name+'icon' + '-img.png', { base64: data.icon });
      }else if(data.banner) {
        avatarImg = new Parse.File(data.name+'banner' + '-img.png', { base64: data.banner });
      }
      avatarImg.save();
      promise.resolve(avatarImg);
      return promise;
    } catch (e) {
      promise.resolve(0);
      return promise;
    }
  }

  return filesImages(options).then(function(base64icon){
    options.icon2 = options.icon;
    options.icon = null;
    return filesImages(options).then(function(base64banner){
      var business = new Parse.Object('Business');
      business.set('status',true);
      business.set('categoryOrder',[]);
      business.set({'address':options.address});
      business.set({'city':options.city});
      business.set({'country':options.country});
      business.set({'postalCode':options.cp});
      business.set('typeCommerce',{"__type":"Pointer","className":"TypeBusiness","objectId":options.typeCommerce});
      business.set({'nameCommerce':options.nameCommerce});
      business.set({'schedule':options.horario});
      business.set({'web':options.web});
      business.set({'details':options.detalles});
      business.set({'phone':options.phonecont});
      business.set({'email':options.emailcont});
      if (options.icon2) business.set('imageIcon', base64icon);
      if (options.banner) business.set('imageBanner', base64banner);
      var acl = new Parse.ACL();
      acl.setPublicWriteAccess(true);
      acl.setPublicReadAccess(true);
      business.setACL(acl);
      return business.save().then(function(saveData) {
        // The save was successful.
        return {ready:true,successful:'Created Business',id:saveData.id, rela:saveData};
      }, function(error) {
        console.log('Business Save Error',error);
        return {ready:false,error:'Business Save Error '+error};
      });
    });
  });

};

BusinessControllers.addPointerBusiness = function addPointerBusiness (idBusiness,userId) {
    var query = new Parse.Query('Business');
    return query.get(idBusiness.id).then(function(dataB){
      dataB.set('owner', {"__type":"Pointer","className":"_User","objectId":userId});
      dataB.save(null, { useMasterKey: true });
      return{success:true,code:200};
    }, function(error) {
      console.log('Business Add relation Error',error);
      return {ready:false,error:'Business Add relation Error '+error};
    });
};

BusinessControllers.updateBusiness = function updateBusiness (options) {
  function filesImages(data) {
    var promise = new Parse.Promise();
    try {
      var avatarImg;
      if (data.icon) {
        avatarImg = new Parse.File(data.name?data.name:data.nameicon+'icon' + '-img.png', { base64: data.icon });
      }else if(data.banner) {
        avatarImg = new Parse.File(data.name?data.name:data.namebanner+'banner' + '-img.png', { base64: data.banner });
      }
      avatarImg.save();
      promise.resolve(avatarImg);
      return promise;
    } catch (e) {
      promise.resolve(0);
      return promise;
    }
  }

  return filesImages(options).then(function(base64icon){
    options.icon2 = options.icon;
    options.icon = null;
    return filesImages(options).then(function(base64banner){
      var query = new Parse.Query('Business');
      return query.get(options.id).then(function(dataB){
        if (options.address) dataB.set({'address':options.address});
        if (options.city) dataB.set({'city':options.city});
        if (options.country) dataB.set({'country':options.country});
        if (options.cp) dataB.set({'postalCode':options.cp});
        //if (options.typeCommerce) dataB.set('typeCommerce',{"__type":"Pointer","className":"TypeBusiness","objectId":options.typeCommerce});
        if (options.nameCommerce) dataB.set({'nameCommerce':options.nameCommerce});
        if (options.phonecont) dataB.set({'phone':options.phonecont});
        if (options.emailcont) dataB.set({'email':options.emailcont});
        if (options.schedule) dataB.set({'schedule':options.schedule});
        if (options.details) dataB.set({'details':options.details});
        if (options.web) dataB.set({'web':options.web});
        if (options.icon2) dataB.set('imageIcon', base64icon);
        if (options.banner) dataB.set('imageBanner', base64banner);
        dataB.save(null, { useMasterKey: true });
        return{success:true,code:200};
      }, function(error) {
        console.log('Business update Error',error);
        return {ready:false,error:'Business update Error '+error, code:500};
      });
    });
  });
};

BusinessControllers.deleteBusiness = function deleteBusiness (options) {
    var query = new Parse.Query('Business');
    return query.get(options.id).then(function(dataB){
      if (options.deleteB) {
        dataB.set({'status':false});
      }else {
        dataB.set({'status':true});
      }
      dataB.save(null, { useMasterKey: true });
      return{success:true,code:200,business:dataB};
    }, function(error) {
      console.log('Business delete/activate Error',error);
      return {ready:false,error:'Business delete/activate Error '+error};
    });
};

BusinessControllers.searchListMainBranchesSubtract = function searchListMainBranches (params) {
  var query = new Parse.Query('MainBusiness');
  return query.find().then(function (objectData) {
    var promises = [], promises2 = [], branchs=0;
    _.forEach(objectData, function(allD,index) {
        promises.push(allD.relation('branch').query().descending('createdAt').equalTo('objectId',params.id).find().then(function (data) {
          _.each(data, function(ids) {
             var ids = ids.toJSON();
             promises2.push({idbuss:ids.objectId,branch:JSON.parse(JSON.stringify(objectData[index])).objectId});
          });
        }));
    });

    return Parse.Promise.when(promises).then(function(result) {
      for (var i = 0; i < promises2.length; i++) {
        if (promises2[i]) {
          branchs = promises2[i].branch;
        }
      }

      return query.get(branchs).then(function (objectMain) {
        if (params.deleteB) {
          objectMain.set({'branchCount':JSON.parse(JSON.stringify(objectMain)).branchCount-1});
        }else {
          objectMain.set({'branchCount':JSON.parse(JSON.stringify(objectMain)).branchCount+1});
        }
        objectMain.save(null, { useMasterKey: true });
        return{success:true,code:200};
      });
    });
  });

};

BusinessControllers.addRelationBusiness = function addRelationBusiness (userId,params) {
    var query = new Parse.Query('Business');
    if (params.flag=='2') {
      return query.get(params.id).then(function(dataB){
        dataB.relation('employee').add(userId);
        dataB.save(null, { useMasterKey: true });
        return{success:true,code:200};
      }, function(error) {
        console.log('Business Add relation Error',error);
        return {ready:false,error:'Business Add relation Error '+error};
      });

    }else {
      query.equalTo('owner', new Parse.Object('_User', { id:params.id }));
      return query.find().then(function(dataB){
        dataB[0].relation('employee').add(userId);
        dataB[0].save(null, { useMasterKey: true });
        return{success:true,code:200};
      }, function(error) {
        console.log('Business Add relation Error',error);
        return {ready:false,error:'Business Add relation Error '+error};
      });
    }
};

BusinessControllers.addRelationMainBusiness = function addRelationMainBusiness (params,dataBusiness) {
    var query = new Parse.Query('MainBusiness');
    return query.get(params.idmain).then(function(dataB){
      dataB.set({'branchCount':JSON.parse(JSON.stringify(dataB)).branchCount+1});
      dataB.relation('branch').add(dataBusiness.rela);
      dataB.save(null, { useMasterKey: true });
      return{success:true,code:200};
    }, function(error) {
      console.log('Branch Add relation Error',error);
      return {ready:false,error:'Branch Add relation Error '+error};
    });

};

BusinessControllers.searchBusinessEmployee = function searchBusinessEmployee (options,idEmployeeorOwner) {
  var query = new Parse.Query('Business');
  if (options.owner) {
    query.equalTo('owner', new Parse.Object('_User', { id: options.owner }));
  }
  return query.find().then(function(dataE){
    if (JSON.parse(JSON.stringify(dataE)).length>0) {
      var promises = [];
      _.forEach(dataE, function(allD) {
        promises.push(allD.relation('employee').query().find().then(function (employess) {
          for (var i = 0; i < employess.length; i++) {
            if (options.owner) {
              return {
                business:JSON.parse(JSON.stringify(allD)).objectId,
                nameEmployee:JSON.parse(JSON.stringify(employess[i])).name,
                idEmployeeorOwner:JSON.parse(JSON.stringify(employess[i])).objectId,
              };
            }else {
              if (JSON.parse(JSON.stringify(employess[i])).objectId==idEmployeeorOwner) {
                return {
                  business:JSON.parse(JSON.stringify(allD)).objectId,
                  nameEmployee:JSON.parse(JSON.stringify(employess[i])).name,
                  owner:JSON.parse(JSON.stringify(allD)).owner.objectId,
                  idEmployeeorOwner:JSON.parse(JSON.stringify(employess[i])).objectId,
                };
              }
            }
          }
        }));
      });
      return Parse.Promise.when(promises).then(function(resultados, index) {
        var dataFinal = resultados.filter(function(n){ return n != undefined });
        return dataFinal;
      });
    }else {
      return [];
    }
  });
};



module.exports = BusinessControllers;
