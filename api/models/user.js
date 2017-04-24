var Parse = require('parse/node');
var type_business = require('../../default/typeBusiness.js');
var _ = require('lodash');

Parse.initialize('8a70d849-410c-409f-9be4-b199125afb10',null,'0ae7ebf4-0021-4a48-a8a7-d40502cd35de');
Parse.serverURL ='https://timesapp.azurewebsites.net/parse';

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


  var query = new Parse.Query('User');
  return query.equalTo('username',options.email).find().then(function(userEx){
    if (userEx.length<=0) {
      var user = new Parse.User();
      user.set('username', options.email);
      user.set('name', options.name);
      user.set('phone', options.phone);
      user.set('password', options.pwd);
      user.set('email', options.email);
      user.set('type', options.type);
      user.set('isActive', true);
      user.signUp();
      return user.save(null, { useMasterKey: true });
    }
    else {
      disableBusiness(object.id).then(function(data){
        return {code:409,error:'User Exist'};
      });
    }
  });

};


UsersModel.createTypeBusiness = function createTypeBusiness () {

  var query = new Parse.Query('TypeBusiness');
  return query.find().then(function(dataType) {
      if (dataType.length>0) {
        dataType.forEach(function(data) {
            data.destroy({success: function() {},error: function() {}
          });
        });
      }
      _.each(type_business.all_business,function(typeb){
        var typeB = new Parse.Object('TypeBusiness');
        typeB.set('name', typeb.name);
        typeB.save(null,{ useMasterKey: true });
      });
  }).then(null, function (error) {
    _.each(type_business.all_business,function(typeb){
      var typeB = new Parse.Object('TypeBusiness');
      typeB.set('name', typeb.name);
      typeB.save(null,{ useMasterKey: true });
    });
  });

};

UsersModel.getTypeBusiness = function getTypeBusiness () {
  var query = new Parse.Query('TypeBusiness');
  return query.find().then(function(dataType) {
      //console.log('----------> data',JSON.stringify(dataType));
      var typeArray = [];
      _.forEach(dataType,function(typeb){
        typeArray.push({name:JSON.parse(JSON.stringify(typeb)).name});
      });
      return typeArray;
  });

};


module.exports = UsersModel;
