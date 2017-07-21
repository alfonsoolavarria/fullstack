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
        typeArray.push({name:JSON.parse(JSON.stringify(typeb)).name,id:JSON.parse(JSON.stringify(typeb)).objectId});
      });
      return typeArray;
  });

};

UsersModel.checkSession = function checkSession (req) {
  if (req.session) {
    var sess = req.headers['x-parse-session-token']?req.headers:req.session['x-parse-session-token']?req.session:0;
    var query = new Parse.Query('_User');
    return query.first('sessionToken',sess).then(function(userSess){
      if (userSess.length<=0) return {success:false};
      else return {success:true};
    }).then(null, function (error) {
      console.log('Error al validar la sessionToken');
      console.log(error);
      return {success:false};
    });
  }else {
    return {success:false};
  }

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

UsersModel.getEmployeeBusiness = function getEmployeeBusiness (options,reqparams) {
  var queryB = new Parse.Query('Business');
  var cantpage=10;
  var page=reqparams.page ? reqparams.page : 0;
  return queryB.get(options.id).then(function(data){
    if (reqparams.type=='employee') {
      return data.relation('employee').query().descending('createdAt').limit(2).skip(page*2).find().then(function(gente1){
        return data.relation('employee').query().find().then(function(gente2){
          if ((gente2.length/2)>0 && (gente2.length/2)%1==0) {
            //entero
            cantpage=(gente2.length/2)*10;
          }else if ((gente2.length/2)>0 && (gente2.length/2)%1!=0) {
            //redondeo
            cantpage=(parseInt(gente2.length/2)+1)*10;
          }else {
            //una sola pagina
            cantpage=1*10;
          }
          return {data:data,employee:JSON.parse(JSON.stringify(gente1)),cantPage:cantpage};
        });
      });
    }else {
      return data.relation('employee').query().find().then(function(gente){
        return {data:data,employee:JSON.parse(JSON.stringify(gente)),cantPage:10};
      });
    }
  });

};

UsersModel.getEmployeeBusiness2 = function getEmployeeBusiness2 (id,reqparams) {
  var cantpage=10;
  var page=reqparams.page ? reqparams.page : 0;
  var query = new Parse.Query('Business');
  query.equalTo('owner', new Parse.Object('_User', { id:id }));
  return query.find().then(function(dataE){
    return dataE[0].relation('employee').query().find().then(function(employess2){
      if (reqparams.flag) {
        return dataE[0].relation('employee').query().descending('createdAt').limit(2).skip(page*2).find().then(function (employess) {
          if ((employess2.length/2)>0 && (employess2.length/2)%1==0) {
            //entero
            cantpage=(employess2.length/2)*10;
          }else if ((employess2.length/2)>0 && (employess2.length/2)%1!=0) {
            //redondeo
            cantpage=(parseInt(employess2.length/2)+1)*10;
          }else {
            //una sola pagina
            cantpage=1*10;
          }
          return {
            employee:JSON.parse(JSON.stringify(employess)),
            cantPage:cantpage,
          };
        });
      }else {
        return {
          employee:JSON.parse(JSON.stringify(employess2)),
          cantPage:cantpage,
          idBusiness:dataE[0].id,
        };
      }
    });
  });
};

UsersModel.getEmployeeBusinessOne = function getEmployeeBusinessOne (id) {
  var query = new Parse.Query('Business');
  return query.get(id).then(function(dataE){
    return dataE.relation('employee').query().find().then(function(employess){
      return {employee:JSON.parse(JSON.stringify(employess))};
    });
  });
};

UsersModel.getUsersClient = function getUsersClient (typeUser,reqparams) {
  var page=reqparams.page ? reqparams.page : 0;
  var cantpage=10;
  var consulta;
  var queryU = new Parse.Query('_User');
  if (reqparams.type=='client') consulta = queryU.descending('createdAt').limit(2).skip(page*2).find();
  else consulta = queryU.find();

  queryU.equalTo('isActive',true);
  queryU.equalTo('type',typeUser);
  return consulta.then(function(dataUsers){
    return queryU.count().then(function(cantData) {
      if ((cantData/2)>0 && (cantData/2)%1==0) {
        //entero
        cantpage=(cantData/2)*10;
      }else if ((cantData/2)>0 && (cantData/2)%1!=0) {
        //redondeo
        cantpage=(parseInt(cantData/2)+1)*10;
      }else {
        //una sola pagina
        cantpage=1*10;
      }
      if (reqparams.type=='client') dataUsers.push({catpageE:cantpage});
      return JSON.stringify(dataUsers);
    });
  });

};




module.exports = UsersModel;
