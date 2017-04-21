var Parse = require('parse/node');
var middle = require('../../middleware/headers');
var express = require('express')
var Users = require('../models/user');
var UsersContro = require('../controllers/controllersUser');
var BusinessControllers = require('../controllers/businessController');
var Env = require('../../config/enviro');
var GloVariable = require('../controllers/globalVariable');
var USER_ALL = GloVariable.TYPES;
var usersType = {
  admin:false,
  owner:false,
  employee:false
}

module.exports = function(app) {

  app.get('/', function(req, res) {
    var message = '';
    if (req.query.invalid) {
      message = 'Error al logearse';
    }
    Users.createTypeBusiness().then(function(){
      res.render('login.ejs',{message});
    });
	});

  /*******************************|
  |*******Admin********|
  ********************************/

  app.get('/admin', function(req, res) {
    usersType.admin = true;
    usersType.userId = req.query.user;
    res.render('index.ejs',{usersType});
	});

  /*******************************|
  |*******Owner********|
  ********************************/

  app.get('/owner', function(req, res) {
    console.log('owner');
    usersType.owner=true;
    res.render('index.ejs',{usersType});
	});

  /*******************************|
  |*******Employee********|
  ********************************/

  app.get('/employee', function(req, res) {
    console.log('employee');
    usersType.employee=true;
    res.render('index.ejs',{usersType});
	});

  /*******************************|
  |*******Business-Empresas********|
  ********************************/
  app.get('/business', function(req, res) {
    usersType.userId = req.query.user;
    var valores={};
    Users.getTypeBusiness().then(function(typeBusiness) {
      res.render('newbusiness.ejs',{usersType,valores,typeBusiness});
    });
	});

  app.get('/business/list', function(req, res) { //in progress
    var valores={};
    usersType.userId = req.query.user;
    BusinessControllers.searchListBusiness(req.body.latlon).then(function(data){
      if (data) {
        valores=data;
      }
      res.render('businesslist.ejs',{usersType,valores});
    });
	});

  app.post('/business', function(req, res) {
    var valores={};
    if (req.body.latlon && req.body.latlon.latitude && req.body.latlon.latitude) {
      BusinessControllers.searchBusiness(req.body.latlon).then(function(data){
        if (data) {
          valores=data;
        }
        res.json({usersType,valores});
      });
    }else {
      BusinessControllers.createBusiness(req.body).then(function(dataBusiness){
        if (dataBusiness.ready) {
          Users.createUser(req.body,dataBusiness)
            .then(function (user) {
              BusinessControllers.addRelationBusiness(dataBusiness,user.id)
                .then(function(data){
                  res.json({usersType,valores,data});
                });
          });
        }else {
          res.json({usersType,valores,data});
        }
      });
    }
	});



  /********************************
  ************CALENDAR************
  ********************************/
  app.get('/calendar', function(req, res) {
    res.render('calendar/calendar.ejs');
	});

  /********************************
  ************VISITS************
  ********************************/

  app.get('/alfonso', function(req, res) {
    var test = Parse.Object.extend("GameScore");
		var game = new Parse.Query('GameScore');
    var promises = [],data2=[];
    game.find().then(function(result){
      promises.push(result);
      res.json(promises);
    });


	});

  //signUp user
  app.post('/user',middle.checkParams, function(req, res) {
    Users.createUser(req.body)
      .then(function (user) {
        res.status(user.code).send(user);
    });

  });

 //Login User
  app.post('/login', function(req, res) {

    function dataUser(id) {
      var query = new Parse.Query('UserData');
      return query.get(id, {
          success: function(object) {},
          error: function(error) {
              // error is an instance of Parse.Error.
              console.log('error search UserData');
              console.log('%j', error);
          }
      });
    }

    if (req.body && req.body.email && req.body.password) {
      UsersContro.logIn({ email: req.body.email, pwd: req.body.password })
      .then(function (user) {
        req.session['timesapp-token-session'] = user.data.get('sessionToken');
        var id = user.data.get('data').id;
        return dataUser(id).then(function(data){
          if (data.get('type')==USER_ALL.admin) {
            console.log('Administrador');
            return res.redirect('/admin?'+'user='+user.data.id);
          }
          if (data.get('type')==USER_ALL.owner) {
            console.log('Propietario');
            return res.redirect('/owner?'+'user='+user.data.id);
          }
          if (data.get('type')==USER_ALL.employee) {
            console.log('Empleado');
            return res.redirect('/employee?'+'user='+user.data.id);
          }

          return res.status(user.code).send(user.data);
        });

      }).then(null, function (error) {
        console.log('Error al logearse');
        console.log(error);
        //return res.status(409).send({error:'Error al logearse.'});
        return res.redirect('/'+'?invalid=true');
      });
    }else {
      return res.status(409).send({error:'Email or Password are required'});
    }
	});

};
