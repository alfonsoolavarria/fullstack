var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');
var _ = require('lodash');


var EmployeeModel = {};


EmployeeModel.creteEmployee = function creteEmployee (options) {

  function filesImages(data) {
    var promise = new Parse.Promise();
    try {
      var avatarImg = new Parse.File(data.email + '-img.png', { base64: data.imagen });
      avatarImg.save();
      promise.resolve(avatarImg);
      return promise;
    } catch (e) {
      promise.resolve(0);
      return promise;
    }
  }

    return filesImages(options).then(function(base64imagen){
      var employee =  new Parse.User();
      if (options.imagen) employee.set('image', base64imagen);
      employee.set('username', options.email);
      employee.set('name', options.name);
      employee.set('phone', options.phone);
      employee.set('email', options.email);
      employee.set('password', options.password);
      employee.set('type', 'Empleado');
      employee.set('isActive', true);
      var acl = new Parse.ACL();
      acl.setPublicWriteAccess(true);
      acl.setPublicReadAccess(true);
      employee.setACL(acl);
      return employee.save(null,{ useMasterKey: true });

    });
};

EmployeeModel.updateEmployee = function updateEmployee (options) {
    var query = new Parse.Query('_User');
    return query.get(options.id).then(function(dataB){
      if (options.deleteB) {
          dataB.set({'isActive':false});
      }else if (options.activa) {
        dataB.set({'isActive':true});
      }else {
        if (options.name) dataB.set({'name':options.name});
        if (options.phone) dataB.set({'phone':options.phone});
        if (options.email) {
          dataB.set({'email':options.email});
          dataB.set({'username':options.email});
        }
      }
      dataB.save(null, { useMasterKey: true });
      return{success:true,code:200};
    }, function(error) {
      console.log('Employee update Error',error);
      return {ready:false,error:'Employee update Error '+error,code:500};
    });
};


module.exports = EmployeeModel;
