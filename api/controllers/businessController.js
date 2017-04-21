var Parse = require('parse/node');



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
  business.set({'address':options.direccion});
  business.set({'city':options.cuidad});
  business.set({'country':options.country});
  business.set({'postalCode':options.cp});
  business.set({'typeCommerce':options.tiponegocio});
  business.set({'nameCommerce':options.nombrenegocio});
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



module.exports = BusinessControllers;
