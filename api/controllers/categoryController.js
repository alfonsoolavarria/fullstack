var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');
var _ = require('lodash');

var CategoryControllers = {};

/*Registro de Categorias*/
CategoryControllers.createCategory = function createCategory (options) {

  function filesImages(data) {
    var promise = new Parse.Promise();
    try {
      var avatarImg = new Parse.File(data.name + '-img.png', { base64: data.imagen });
      avatarImg.save();
      promise.resolve(avatarImg);
      return promise;
    } catch (e) {
      promise.resolve(0);
      return promise;
    }
  }

  return filesImages(options).then(function(base64imagen){
    var query = new Parse.Query("TypeBusiness");
    query.equalTo('name',options.name);
    return query.find().then(function (objectData) {
      if (objectData.length>0) {
        return {ready:false,error:'TypeBusiness Exist', code:409};
      }
      var business = new Parse.Object('TypeBusiness');
      business.set('name',options.name);
      if (options.imagen) business.set('image', base64imagen);
      var acl = new Parse.ACL();
      acl.setPublicWriteAccess(true);
      acl.setPublicReadAccess(true);
      business.setACL(acl);
      return business.save().then(function(saveData) {
        // The save was successful.
        return {ready:true,successful:'Created Business', code:200};
      }, function(error) {
        console.log('Business Save Error',error);
        return {ready:false,error:'TypeBusiness Save Error '+error, code:500};
      });
    });
  });

};

CategoryControllers.getCategories = function getCategories() {
  var query = new Parse.Query("TypeBusiness");
  return query.find().then(function (objectData) {
    return JSON.stringify(objectData);
  });
}

CategoryControllers.updateCategory = function updateCategory(options) {
  function filesImages(data) {
    var promise = new Parse.Promise();
    try {
      var avatarImg = new Parse.File(data.nameicon+'-img.png', { base64: data.icon });
      avatarImg.save();
      promise.resolve(avatarImg);
      return promise;
    } catch (e) {
      promise.resolve(0);
      return promise;
    }
  }

  return filesImages(options).then(function(base64imagen){
    var query = new Parse.Query("TypeBusiness");
    return query.get(options.id).then(function (objectData) {
      if (options.name) objectData.set({'name':options.name});
      if (options.icon) objectData.set('image',base64imagen);
      objectData.save(null, { useMasterKey: true });
      return {success:true,code:200};
    }, function(error) {
      console.log('TypeBusiness update Error',error);
      return {error:'TypeBusiness update Error '+error, code:500};
    });
  });
};

module.exports = CategoryControllers;
