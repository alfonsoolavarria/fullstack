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
  service.set('employee',options.employee);
  service.set('schedule',options.schedule);
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
    }
    return dataS.save().then(function(saveData) {
        // The save was successful.
        return {ready:true,successful:'Created Service',id:saveData.id};
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

  if (reqparams.type=='service') consulta = query.descending('createdAt').limit(2).skip(page*2).find();
  else consulta = query.find();
  query.count().then(function(cantData) {
    if ((cantData/2)>0 && (cantData/2)%1==0) {
      //entero
      cantpage=(cantData/2)*10;
    }else if ((cantData/2)>0 && (cantData/2)%1!=0) {
      //redondeo
      cantpage=(parseInt(cantData/2)+1)*10;
    }else {
      //una sola pagina
      cantpage=1*10;
    }
  });

  return consulta.then(function(data) {
    var promises = [];
    var kk = 0;
    _.forEach(data, function(allD) {
        promises.push(allD.relation('employee2').query().find());
    });
    return Parse.Promise.when(promises).then(function(resultados, index) {
        for (var i = 0; i < resultados.length; i++) {
            data[i] = data[i].toJSON();
            data[i].alfonso = [];
            data[i].alfonso.push(resultados[i]);
        }
        if (reqparams.type=='service') data.push({catpageE:cantpage});
        return data;
    });
  });
};

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



module.exports = ServiceControllers;
