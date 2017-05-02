var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');
var _ = require('lodash');


var EmployeeModel = {};


EmployeeModel.creteEmployee = function creteEmployee (options) {
  var employee =  new Parse.User();
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
};

EmployeeModel.updateEmployee = function updateEmployee (options) {
    var query = new Parse.Query('User');
    return query.get(options.id).then(function(dataB){
      if (options.delete) {
          dataB.set({'isActive':false});
      }else {
        if (options.name) dataB.set({'name':options.name});
        if (options.phone) dataB.set({'phone':options.phone});
        if (options.email) dataB.set({'email':options.email});
      }
      dataB.save(null, { useMasterKey: true });
      return{success:true,code:200};
    }, function(error) {
      console.log('Employee update Error',error);
      return {ready:false,error:'Employee update Error '+error};
    });
};


module.exports = EmployeeModel;
