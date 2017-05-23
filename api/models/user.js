var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');
var _ = require('lodash');


var UsersModel = {};


UsersModel.createUser = function createUser (options,object) {

  function disableBusiness(id) {
    var query = new Parse.Query('Business');
    return query.get(id).then(function(dataB){
      dataB.set('status',false);
      dataB.save(null, { useMasterKey: true });
      return{success:true};
    }, function(error) {
      console.log('Business Edit status Error',error);
      return {ready:false,error:'Business Edit status Error '+error};
    });
  }


  var query = new Parse.Query('_User');
    var user = new Parse.User();
    user.set('username', options.email);
    user.set('name', options.name);
    user.set('phone', options.phone);
    user.set('password', options.password);
    user.set('email', options.email);
    user.set('type', options.type);
    user.set('isActive', true);
    user.signUp();
    return user.save(null,{ useMasterKey: true });

};


UsersModel.getTypeBusiness = function getTypeBusiness () {
  var query = new Parse.Query('TypeBusiness');
  return query.find().then(function(dataType) {
      var typeArray = [];
      _.forEach(dataType,function(typeb){
        typeArray.push({name:JSON.parse(JSON.stringify(typeb)).name});
      });
      return typeArray;
  });

};

UsersModel.checkSession = function checkSession (sess) {
  var query = new Parse.Query('_User');
  return query.first('sessionToken',sess).then(function(userSess){
    if (userSess.length<=0) return {success:false};
    else return {success:true};
  }).then(null, function (error) {
    console.log('Error al validar la sessionToken');
    console.log(error);
    return {success:false};
  });

};


UsersModel.updateUserBusiness = function updateUserBusiness (options) {
  var query = new Parse.Query('_User');
  return query.get(options.iduser).then(function(userB){
    if (options.email) userB.set('username', options.email);
    if (options.name) userB.set('name', options.name);
    if (options.phone) userB.set('phone', options.phone);
    if (options.email) userB.set('email', options.email);
    return userB.save(null,{ useMasterKey: true });
  });
};

UsersModel.checkUser = function checkUser (options) {
  var query = new Parse.Query('_User');
  query.equalTo('email',options.email);
  return query.find().then(function(userB){
    if (userB.length>0) {
        return {code:409,message:'Email Existente'};
    }else {
        return {code:200,message:''};
    }
  });
};

UsersModel.activateDesactivate = function activateDesactivate (options,data) {

  var query = new Parse.Query('_User');
  return query.get(data.business.get('owner').id).then(function(userB){
    if (options.deleteB) {
      userB.set({'isActive':false});
    }else {
      userB.set({'isActive':true});
    }
    return userB.save(null,{ useMasterKey: true });
  });
};

UsersModel.getEmployeeBusiness = function getEmployeeBusiness (options) {
  var queryB = new Parse.Query('Business');
  return queryB.get(options.id).then(function(data){
    return data.relation('employee').query().find().then(function(gente){
      return {data:data,employee:JSON.parse(JSON.stringify(gente))};
    });

  });

};

UsersModel.getUsersClient = function getUsersClient (typeUser) {
  var queryU = new Parse.Query('_User');
  queryU.equalTo('type',typeUser);
  return queryU.find().then(function(dataUsers){
    return JSON.stringify(dataUsers);
  });

};




module.exports = UsersModel;
