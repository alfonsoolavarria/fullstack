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
var session='';

module.exports = function(app) {

  app.get('/', function(req, res) {
    var message = '';
    if (req.query.invalid) {
      message = 'Error al logearse';
    }
    res.render('login.ejs',{message});

	});

  /*******************************|
  |*******Admin********|
  ********************************/

  app.get('/admin', function(req, res) {
    if (session) {
      usersType.admin = true;
      usersType.owner=false;
      usersType.employee=false;
      usersType.userId = req.query.user;
      return res.render('index.ejs',{
        usersType,
        session:session
      });
    }else {
      return res.redirect('/');
    }
	});

  /*******************************|
  |*******Owner********|
  ********************************/

  app.get('/owner', function(req, res) {
    if (session) {
      usersType.admin=false;
      usersType.employee=false;
      usersType.owner=true;
      return res.render('index.ejs',{
        usersType,
        session:session
      });
    }else {
      return res.redirect('/');
    }
  });

  /*******************************|
  |*******Employee********|
  ********************************/

  app.get('/employee', function(req, res) {
    if (session) {
      usersType.admin=false;
      usersType.owner=false;
      usersType.employee=true;
      res.render('index.ejs',{
        usersType,
        session:session
      });
    }else {
      return res.redirect('/');
    }
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
  ************User************
  ********************************/


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
      UsersContro.logIn({ email: req.body.email, password: req.body.password })
      .then(function (user) {
        console.log('userrr',JSON.stringify(user));
        req.session['timesapp-token-session'] = user.data.get('sessionToken');
        session = req.session['timesapp-token-session'];
        var id = user.data.id;
        //return dataUser(id).then(function(data){
          if (user.data.get('type')==USER_ALL.admin) {
            console.log('Administrador');
            return res.redirect('/admin?'+'user='+id);
          }
          else if (user.data.get('type')==USER_ALL.owner) {
            console.log('Propietario');
            return res.redirect('/owner?'+'user='+id);
          }
          else if (user.data.get('type')==USER_ALL.employee) {
            console.log('Empleado');
            return res.redirect('/employee?'+'user='+id);
          }else {
            return res.status(user.code).send(user.data);
          }

        //});

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

//Logout user
app.get('/logout', function(req, res) {
  req.session['timesapp-token-session'] = "";
  session = "";
  return res.redirect('/');
});



};
