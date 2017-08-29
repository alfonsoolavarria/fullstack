var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');
var _ = require('lodash');
var moment = require('moment-timezone').tz.setDefault('Europe/Madrid');
var moment2 = require('moment');

var Datadays = {
  0:'Lunes',
  1:'Martes',
  2:'Miércoles',
  3:'Jueves',
  4:'Viernes',
  5:'Sábado',
  6:'Domingo'
}

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
        return {code:409,message:'Email Existente',tag:0};
    }else {
      query.equalTo('email',options.emailcont);
      return query.find().then(function(userB){
        if (userB.length>0) {
            return {code:409,message:'Email Existente',tag:2};
        }else {
          return {code:200,message:''};
        }
      });
    }
  });
};

UsersModel.activateDesactivate = function activateDesactivate (options,data) {
  var id=0;
  if (data.business) {
    id = data.business.get('owner').id;
  }else {
    id = options.iduser;
  }
  var query = new Parse.Query('_User');
  return query.get(id).then(function(userB){
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
  if (reqparams.employee) {
    query.equalTo('owner', new Parse.Object('_User', { id:reqparams.idowner }));
  }else {
    query.equalTo('owner', new Parse.Object('_User', { id:id }));
  }
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
  var promises2 = [];
  var queryUser = new Parse.Query('_User');
  queryUser.equalTo('type','Cliente')
  var queryU = new Parse.Query('Booking');
  queryU.include('client');
  return queryUser.find().then(function(Clientes) {
    _.forEach(Clientes, function(uc) {
      promises2.push({
        name:uc.get('name'),
        email:uc.get('username'),
        objectId:uc.id,
      });
    });
    if (reqparams.type!='special') {
      return queryU.find().then(function(cantData) {

        if (reqparams.type=='client') consulta = queryU.descending('createdAt').limit(6).skip(page*6).find();
        else consulta = queryU.descending('createdAt').find();

        return consulta.then(function(dataUsers){
          var promises = [], filters=[],filters2=[];
          //filter all data
          _.forEach(cantData, function(allData) {
            if (filters2.indexOf(allData.get('client').id)<0) {
              filters2.push(allData.get('client').id);
            }
          });
          //filter six data
          _.forEach(dataUsers, function(allD) {
            moment2.locale('es');
            if (filters.indexOf(allD.get('client').id)<0) {
              var finalHour = new Date(allD.createdAt);
              promises.push({
                name:allD.get('client').get('name'),
                email:allD.get('client').get('username'),
                objectId:allD.get('client').id,
                phone:allD.get('client').get('phone'),
                dayName:Datadays[moment2(allD.createdAt).weekday()],
                dayNumber:moment(allD.createdAt).get('date'),
                month:(moment(allD.createdAt).month())+1,
                //hour:finalHour.getHours()+'hs'
                hour:moment(allD.createdAt).format('HH')+'hs'
              });
              filters.push(allD.get('client').id);
            }
          });

          if ((filters2.length/6)>0 && (filters2.length/6)%1==0) {
            //entero
            cantpage=(filters2.length/6)*10;
          }else if ((filters2.length/6)>0 && (filters2.length/6)%1!=0) {
            //redondeo
            cantpage=(parseInt(filters2.length/6)+1)*10;
          }else {
            //una sola pagina
            cantpage=1*10;
          }
          return Parse.Promise.when(promises).then(function(resultados, index) {
            dataUsers=resultados;
            if (reqparams.type=='client') dataUsers.push({catpageE:cantpage});
            return JSON.stringify(dataUsers);
          });
        });
      });
    }else {
      dataUsers=promises2;
      return JSON.stringify(dataUsers);
    }
  });
};

UsersModel.getOneClient = function getOneClient (id) {
  var query = new Parse.Query('_User');
  return query.get(id).then(function(dataE){
    return JSON.parse(JSON.stringify(dataE));
  });
}

UsersModel.getHistorialClient = function getOneClient (id) {
  var queryU = new Parse.Query('Booking');
  var data = [];
  queryU.include('service');
  queryU.include('employee');
  queryU.equalTo('client', new Parse.Object('_User', { id:id }));
  return queryU.find().then(function(dataE){
    for (var i = 0; i < dataE.length; i++) {
      data.push({
        service:JSON.parse(JSON.stringify(dataE[i])).service.serviceName,
        precio:JSON.parse(JSON.stringify(dataE[i])).service.price,
        employee:JSON.parse(JSON.stringify(dataE[i])).employee.name,
        dia:Datadays[moment2(dataE[i].createdAt).weekday()],
        horario:moment(JSON.parse(JSON.stringify(dataE[i])).startDate.iso).format('HH:mm')+'hs',
      });
    }
    return data;
  });
}



module.exports = UsersModel;
