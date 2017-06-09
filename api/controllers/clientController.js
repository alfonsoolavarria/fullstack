var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');

var ClientModel = {};

ClientModel.createCliente = function createCliente (options) {

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
    var userCliente =  new Parse.User();
    if (options.imagen) userCliente.set('image', base64imagen);
    userCliente.set('username', options.email);
    userCliente.set('name', options.name);
    userCliente.set('phone', options.phone);
    userCliente.set('email', options.email);
    userCliente.set('password', options.password);
    userCliente.set('type', 'Cliente');
    userCliente.set('isActive', true);
    var acl = new Parse.ACL();
    acl.setPublicWriteAccess(true);
    acl.setPublicReadAccess(true);
    userCliente.setACL(acl);
    return userCliente.save(null,{ useMasterKey: true });

    });

};

ClientModel.updateCliente = function updateCliente(options) {
  var query = new Parse.Query('_User');
  return query.get(options.id).then(function(dataCl){
    if (options.flagClient=='0') {
        dataCl.set({'isActive':false});
    }else {
      dataCl.set({'isActive':true});
    }
    if (options.name) dataCl.set({'name':options.name});
    if (options.phone) dataCl.set({'phone':options.phone});
    if (options.email) {
      dataCl.set({'email':options.email});
      dataCl.set({'username':options.email});
    }
    dataCl.save(null, { useMasterKey: true });
    return{success:true,code:200};
  }, function(error) {
    console.log('Client update Error',error);
    return {ready:false,error:'Client update Error '+error,code:500};
  });
};


module.exports = ClientModel;
