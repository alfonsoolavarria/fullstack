var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');

var BusinessControllers = {};

BusinessControllers.searchBusiness = function searchBusiness (options) {
  var query = new Parse.Query('Business');
  query.equalTo('latlong', (parseFloat(options.latitude),parseFloat(options.longitude)));
  return query.find({
    success: function(object) {},
    error: function(error) {
      // error is an instance of Parse.Error.
      console.log('error search Business');
      console.log('%j',error);
    }
  });
};

BusinessControllers.searchListBusiness = function searchListBusiness (options) {
  var query = new Parse.Query('Business');
  query.include('owner.name');
  query.include('owner.email');
  query.include('owner.phone');
  query.include('owner.username');
  query.equalTo('status',true);
  return query.find({
    success: function(object) {},
    error: function(error) {
      // error is an instance of Parse.Error.
      console.log('error search Business');
      console.log('%j',error);
    }
  });
};

/*Registro de Empresa*/
BusinessControllers.createBusiness = function createBusiness (options) {
  var business = new Parse.Object('Business');
  business.set('status',true);
  business.set({'address':options.address});
  business.set({'city':options.city});
  business.set({'country':options.country});
  business.set({'postalCode':options.cp});
  business.set({'typeCommerce':options.typeCommerce});
  business.set({'nameCommerce':options.nameCommerce});
  var acl = new Parse.ACL();
  acl.setPublicWriteAccess(true);
  acl.setPublicReadAccess(true);
  business.setACL(acl);
  return business.save().then(function(saveData) {
      // The save was successful.
      return {ready:true,successful:'Created Business',id:saveData.id};
    }, function(error) {
      console.log('Business Save Error',error);
      return {ready:false,error:'Business Save Error '+error};
    });

};

BusinessControllers.addRelationBusiness = function addRelationBusiness (idBusiness,userId) {
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
    var query = new Parse.Query('Business');
    return query.get(options.id).then(function(dataB){
      if (options.address) dataB.set({'address':options.address});
      if (options.city) dataB.set({'city':options.city});
      if (options.country) dataB.set({'country':options.country});
      if (options.cp) dataB.set({'postalCode':options.cp});
      if (options.typeCommerce) dataB.set({'typeCommerce':options.typeCommerce});
      if (options.nameCommerce) dataB.set({'nameCommerce':options.nameCommerce});
      dataB.save(null, { useMasterKey: true });
      return{success:true,code:200};
    }, function(error) {
      console.log('Business update Error',error);
      return {ready:false,error:'Business update Error '+error};
    });
};

BusinessControllers.deleteBusiness = function deleteBusiness (id) {
    var query = new Parse.Query('Business');
    return query.get(id).then(function(dataB){
      dataB.set({'status':false});
      dataB.save(null, { useMasterKey: true });
      return{success:true,code:200};
    }, function(error) {
      console.log('Business delete Error',error);
      return {ready:false,error:'Business delete Error '+error};
    });
};



module.exports = BusinessControllers;
