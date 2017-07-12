var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');
var _ = require('lodash');

var BusinessControllers = {};

BusinessControllers.searchBusiness = function searchBusiness (options) {
  var query = new Parse.Query('Business');
  //query.equalTo('latlong', (parseFloat(options.latitude),parseFloat(options.longitude)));
  return query.find({
    success: function(object) {},
    error: function(error) {
      // error is an instance of Parse.Error.
      console.log('error search Business');
      console.log('%j',error);
    }
  });
};

BusinessControllers.searchListBusiness = function searchListBusiness (options,pageparams) {
  var query = new Parse.Query('Business');
  var cantpage=1;
  var flag = 0;
  var page=pageparams ? pageparams : 0;
  function twicequery(boolflag) {
    var query2 = new Parse.Query('Business');
    if (boolflag==1) {
      query2.equalTo('owner', new Parse.Object('_User', { id: options.owner }));
    }
    //cantidad de paginas, paginador para el html
    return query2.find().then(function (a) {
      if ((a.length/2)>0 && (a.length/2)%1==0) {
        //entero
        return cantpage=(a.length/2)*10;
      }else if ((a.length/2)>0 && (a.length/2)%1!=0) {
        //redondeo
        return cantpage=(parseInt(a.length/2)+1)*10;
      }else {
        //una sola pagina
        return cantpage=1*10;
      }
    });
  }

  if (options.owner) {
    query.equalTo('owner', new Parse.Object('_User', { id: options.owner }));
    flag = 1;
  }
  //pagination businesslist
  query.descending('createdAt');
  query.limit(2);
  query.skip(page*2);

  query.include('owner.name');
  query.include('owner.email');
  query.include('owner.phone');
  query.include('owner.username');
  query.include('typeCommerce.name');

  return query.find().then(function (objectData) {
    return twicequery(flag).then(function() {
      if (objectData.length<1) {
        cantpage=0;
      }
      //hacer una validacion de paginacion para cuando sea el Propietario
      return {data:objectData,cantPage:cantpage};
    });
  });
};

BusinessControllers.searchGetBusiness = function searchGetBusiness (id) {
  var query = new Parse.Query('Business');
  query.include('owner.name');
  query.include('owner.email');
  query.include('owner.phone');
  query.include('owner.username');
  //query.equalTo('status',true);
  return query.get(id,{
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
  business.set('typeCommerce',{"__type":"Pointer","className":"TypeBusiness","objectId":options.typeCommerce});
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

BusinessControllers.addPointerBusiness = function addPointerBusiness (idBusiness,userId) {
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
      if (options.typeCommerce) dataB.set('typeCommerce',{"__type":"Pointer","className":"TypeBusiness","objectId":options.typeCommerce});
      if (options.nameCommerce) dataB.set({'nameCommerce':options.nameCommerce});
      dataB.save(null, { useMasterKey: true });
      return{success:true,code:200};
    }, function(error) {
      console.log('Business update Error',error);
      return {ready:false,error:'Business update Error '+error, code:500};
    });
};

BusinessControllers.deleteBusiness = function deleteBusiness (options) {
    var query = new Parse.Query('Business');
    return query.get(options.id).then(function(dataB){
      if (options.deleteB) {
        dataB.set({'status':false});
      }else {
        dataB.set({'status':true});
      }
      dataB.save(null, { useMasterKey: true });
      return{success:true,code:200,business:dataB};
    }, function(error) {
      console.log('Business delete/activate Error',error);
      return {ready:false,error:'Business delete/activate Error '+error};
    });
};

BusinessControllers.addRelationBusiness = function addRelationBusiness (idBusiness,userId) {
    var query = new Parse.Query('Business');
    return query.get(idBusiness.id).then(function(dataB){
      dataB.relation('employee').add(userId);
      dataB.save(null, { useMasterKey: true });
      return{success:true,code:200};
    }, function(error) {
      console.log('Business Add relation Error',error);
      return {ready:false,error:'Business Add relation Error '+error};
    });
};

BusinessControllers.searchBusinessEmployee = function searchBusinessEmployee (options,idEmployeeorOwner) {
  var query = new Parse.Query('Business');
  if (options.owner) {
    query.equalTo('owner', new Parse.Object('_User', { id: options.owner }));
  }
  return query.find().then(function(dataE){
    var promises = [];
    _.forEach(dataE, function(allD) {
        promises.push(allD.relation('employee').query().find().then(function (employess) {
          for (var i = 0; i < employess.length; i++) {
            if (options.owner) {
              return {
                business:JSON.parse(JSON.stringify(allD)).objectId,
                nameEmployee:JSON.parse(JSON.stringify(employess[i])).name,
                idEmployeeorOwner:JSON.parse(JSON.stringify(employess[i])).objectId,
              };
            }else {
              if (JSON.parse(JSON.stringify(employess[i])).objectId==idEmployeeorOwner) {
                return {
                  business:JSON.parse(JSON.stringify(allD)).objectId,
                  nameEmployee:JSON.parse(JSON.stringify(employess[i])).name,
                  idEmployeeorOwner:JSON.parse(JSON.stringify(employess[i])).objectId,
                };
              }
            }
          }
        }));
    });
    return Parse.Promise.when(promises).then(function(resultados, index) {
      var dataFinal = resultados.filter(function(n){ return n != undefined });
      return dataFinal;
    });
  });
};



module.exports = BusinessControllers;
