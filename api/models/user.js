var Parse = require('parse/node');
var type_business = require('../../default/typeBusiness.js');
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
      console.log('----------> data',dataType);
      if (dataType.length>0) {
        dataType.forEach(function(data) {
            data.destroy({success: function() {},error: function() {}
          });
        });
      }
      _.each(type_business.all_business,function(typeb){
        var typeB = new Parse.Object('TypeBusiness');
        typeB.set('name', typeb.name);
        typeB.save();
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
