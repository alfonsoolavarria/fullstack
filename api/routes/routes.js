var Parse = require('parse/node');
var middle = require('../../middleware/headers');
var express = require('express')
var Users = require('../models/user');
var UsersContro = require('../controllers/controllersUser');
var BusinessControllers = require('../controllers/businessController');
var EployeeControllers = require('../controllers/employeeController');
var ServiceControllers = require('../controllers/serviceController');
var Booking = require('../controllers/bookingController');
var Env = require('../../config/enviro');
var GloVariable = require('../controllers/globalVariable');
var _ = require('lodash');
//var moment = require('moment');
var moment = require('moment-timezone').tz.setDefault('Europe/Madrid');

var USER_ALL = GloVariable.TYPES;
var usersType = {
  admin:false,
  owner:false,
  employee:false
}

var useTemplate = {
  dashboard:false,
  employee:false,
  admin:false,
  service:false
}
var session={};

module.exports = function(app) {

  app.get('/', function(req, res) {
    var message = '';
    if (req.query.invalid) {
      message = 'Error al logearse';
    }else if (req.query.inactive) {
      message = 'Usuario Inactivo';
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
  |*******Employee********|
  ********************************/

  app.get('/employee', function(req, res) {
    if (session) {
      usersType.admin=false;
      usersType.owner=false;
      usersType.employee=true;
      usersType.userId = req.query.user;
      res.render('index.ejs',{
        usersType,
        session:session
      });
    }else {
      return res.redirect('/');
    }
	});

  app.post('/employee', function(req, res) {
    Users.checkUser(req.body).then(function(result) {
      if (result.code==409) {
        res.json(result);
      }
      EployeeControllers.creteEmployee(req.body).then(function(user) {
        BusinessControllers.addRelationBusiness(req.body,user).then(function(data){
          res.json({code:200});
        });
      });
    });
	});

  app.put('/employee', function(req, res) {
    EployeeControllers.updateEmployee(req.body).then(function(user) {
      res.json(user);
    });

  });

  /*******************************|
  |*******Business-Empresas********|
  ********************************/
  app.get('/business', function(req, res) {
    usersType.userId = req.query.user;
    var valores={};
    Users.getTypeBusiness().then(function(typeBusiness) {
      res.render('business/newbusiness.ejs',{usersType,valores,typeBusiness});
    });
	});

  app.get('/business/list', function(req, res) {
    if (session) {
      var valores={},selectPage=1;
      if (req.query.user && usersType.admin){
        usersType.userId = req.query.user;
      } else {
        req.body.owner = req.query.owner?req.query.owner:req.query.user;
        usersType.userId = req.query.owner;
      }
      if (req.query.page) {
        selectPage=req.query.page;
        req.query.page=req.query.page-1;
      }
      BusinessControllers.searchListBusiness(req.body,req.query.page).then(function(data){
        if (data) {
          valores=JSON.parse(JSON.stringify(data.data));
        }
        Users.getTypeBusiness().then(function(typeBusiness) {
          res.render('business/businesslist.ejs',{
            usersType,
            valores,
            catpage:JSON.parse(JSON.stringify(data.cantPage)),
            selectPage:selectPage,
            typeBusiness
          });
        });
      });
    }else {
      return res.redirect('/');
    }
	});

  app.get('/business/:id/dashboard', function(req, res) {
    var employee='',service='',serviceData={};
    var listService = [], final=[], schedule=[];
    useTemplate.service=false;
    useTemplate.employee = false;
    useTemplate.dashboard = false;
    BusinessControllers.searchGetBusiness(req.params.id).then(function(data){
      if (data) valores=JSON.parse(JSON.stringify(data));
      Users.getTypeBusiness().then(function(typeBusiness) {
        if (req.query.type=='employee' || req.query.type=='service' ) {
          if (req.query.type=='employee') {
            employee='active';
            useTemplate.employee = true;
          }
          if (req.query.type=='service') {
            useTemplate.service=true;
            service='active';
          }
          useTemplate.dashboard = false;
          Users.getEmployeeBusiness(req.params).then(function(employeeB) {
            if (useTemplate.service) {
              ServiceControllers.getService(req.params.id).then(function(serviceData) {
                if (serviceData.length>0) {
                  serviceData = JSON.parse(JSON.stringify(serviceData));
                    for (var i = 0; i < serviceData.length; i++) {
                      if (serviceData[i].alfonso[0].length>0) {
                        for (var o = 0; o < serviceData[i].alfonso[0].length; o++) {
                            listService.push(serviceData[i].alfonso[0][o].objectId);
                          }
                          final.push(JSON.parse(JSON.stringify(listService)));
                          listService=[];
                      }else {
                        final.push(['']);
                      }
                    }
                }

                res.render('business/dashboard.ejs',{
                  usersType,
                  valores,
                  typeBusiness,
                  useTemplate,
                  employeeB,
                  dashboard:'',
                  employee,
                  service,
                  serviceData,
                  final,
                  listService,
                  schedule,
                });

              });

            }else {
              res.render('business/dashboard.ejs',{
                usersType,
                valores,
                typeBusiness,
                useTemplate,
                employeeB,
                dashboard:'',
                employee,
                service,
                serviceData,
                final,
                listService,
                schedule,
              });
            }
          });
        }
        else {
          useTemplate.dashboard = true;
          res.render('business/dashboard.ejs',{
            usersType,
            valores,
            typeBusiness,
            useTemplate,
            employeeB:null,
            dashboard:'active',
            employee:'',
            service:'',
            serviceData,
            final,
            listService,
            schedule,
          });
        }
      });
    });
	});

  /*app.get('/business/:id/employee', function(req, res) {
    console.log('employeeeeeeeeeeee mando');
    useTemplate.employee=true;
    res.render('business/dashboard.ejs',{
      usersType,
      useTemplate
    });
	});*/

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
      Users.checkUser(req.body).then(function(result) {
        if (result.code==409) {
          res.json({usersType,valores,result});
        }
        BusinessControllers.createBusiness(req.body).then(function(dataBusiness){
          if (dataBusiness.ready) {
            Users.createUser(req.body,dataBusiness)
            .then(function (user) {
              BusinessControllers.addPointerBusiness(dataBusiness,user.id)
              .then(function(data){
                res.json({usersType,valores,data});
              });
            });
          }else {
            res.json({usersType,valores,data});
          }
        });
      });
    }
	});

  app.put('/business', function(req, res) {

    if (req.body.deleteB || req.body.activa) {
      BusinessControllers.deleteBusiness(req.body).then(function(data) {
        Users.activateDesactivate(req.body,data).then(function() {
          return res.json({code:200});
        });
      });
    }

    if (req.body.flagBusiness) {
      BusinessControllers.updateBusiness(req.body).then(function(data) {
        if (data.code==500) {
          return res.json({code:500});
        }
        if (req.body.flagUser) {
          Users.updateUserBusiness(req.body).then(function (user) {
            return res.json({code:200});
          });
        }else {
          return res.json({code:200});
        }
      });
    }else if (req.body.flagUser) {
      Users.updateUserBusiness(req.body).then(function (user) {
        return res.json({code:200});
      });
    }else {
      return res.json({code:200});
    }
  });


  /*******************************|
  |*******Service********|
  ********************************/
  app.post('/service', function(req, res) {
    ServiceControllers.createService(req.body).then(function(data){
      if (req.body.employee) {
        for (var i = 0; i < req.body.employee.length; i++) {
          ServiceControllers.addReationEmployee(data.id,req.body.employee[i].id).then(function(ready) {
            res.json({code:200});
          });
        }
      }

    });
  });

  app.put('/service', function(req, res) {
    ServiceControllers.updateService(req.body).then(function(data){
      for (var i = 0; i < req.body.employee.length; i++) {
        ServiceControllers.addReationEmployee(data.id,req.body.employee[i].id).then(function(ready) {
          res.json({code:200});
        });
      }
    });
  });


  /********************************
  ************CALENDAR************
  ********************************/
  app.get('/calendar', function(req, res) {
    if (session) {
      usersType.admin=true ? req.query.admin:false;
      usersType.owner=true ? req.query.owner:false;
      usersType.employee=true ? req.query.employee:false;
      usersType.userId = req.query.employee ? req.query.employee : req.query.owner ?req.query.owner: req.query.admin ? req.query.admin:0;
      Users.getUsersClient('Cliente').then(function(data){
        var idUserEmploOwner = 0;
        if (req.query.employee) {
          idUserEmploOwner = req.query.employee;
        }else if (req.query.owner) {
          idUserEmploOwner = req.query.owner;
        }

        BusinessControllers.searchBusinessEmployee(req.query,idUserEmploOwner).then(function(dataBusiness1) {
          var id = 0;
          if (dataBusiness1.length>0) id = JSON.parse(JSON.stringify(dataBusiness1[0])).business;
          ServiceControllers.getService(id).then(function(serviceData) {
            var listaemploye=[],listaservice=[],final2=[], flag=[], bussiId=0;
            var datakk = JSON.parse(JSON.stringify(serviceData));
            for (var i = 0; i < datakk.length; i++) {
              bussiId=datakk[i].business.objectId;
              listaservice.push({name:datakk[i].serviceName,id:datakk[i].objectId,bussi:datakk[i].business.objectId});
              if (datakk[i].alfonso[0].length>0) {
                for (var o = 0; o < datakk[i].alfonso[0].length; o++) {
                  if (flag.indexOf(datakk[i].alfonso[0][o].objectId)===-1) {
                    listaemploye.push({id:datakk[i].alfonso[0][o].objectId,name:datakk[i].alfonso[0][o].name,servi:datakk[i].objectId});
                    flag.push(datakk[i].alfonso[0][o].objectId);
                  }
              }
              }else {
                listaemploye.push(['']);
              }
            }
            if (bussiId==0){
              session.business=id;
              bussiId=id;
            }else {
              session.business=bussiId;
              bussiId=bussiId;
            }
            session.service=JSON.stringify(listaservice);
            session.employee=JSON.stringify(listaemploye);
            res.render('calendar/calendar.ejs',{
              usersType,
              session:session,
              client:data,
              service:JSON.stringify(listaservice),
              employee:JSON.stringify(listaemploye),
              Idbussi:bussiId,
            });
          });
        });
      });
    }else {
      return res.redirect('/');
    }
	});

  /********************************
  *****Booking - Reservas-Citas****
  ********************************/
  app.get('/booking',function(req,res) {
    Booking.getBooking(session.business).then(function (data) {
      var colors = {'0':'green','1':'blue','3':'orange'}
      var nuevo = [];
      for (var i = 0; i < data.length; i++) {
        var pos = JSON.parse(JSON.stringify(data[i])).state;
        nuevo.push({
          title:JSON.parse(JSON.stringify(data[i])).client.name,
          start:JSON.parse(JSON.stringify(data[i])).startDate.iso,
          backgroundColor:colors[pos],
          color:colors[pos],
          alfonso: {
            end: moment(JSON.parse(JSON.stringify(data[i])).startDate.iso).format("HH:mm"),
            duration:JSON.parse(JSON.stringify(data[i])).duration,
            service:JSON.parse(JSON.stringify(data[i])).service,
            serviceName:JSON.parse(JSON.stringify(data[i])).service.serviceName,
            employee:JSON.parse(JSON.stringify(data[i])).employee,
            employeeName:JSON.parse(JSON.stringify(data[i])).employee.username,
            bussines:JSON.parse(JSON.stringify(data[i])).bussines,
            client:JSON.parse(JSON.stringify(data[i])).client,
            clientName:JSON.parse(JSON.stringify(data[i])).client.username,
            additionalInfo:JSON.parse(JSON.stringify(data[i])).additionalInfo,
            idBooking:JSON.parse(JSON.stringify(data[i])).objectId,
            state:JSON.parse(JSON.stringify(data[i])).state,
            dataGeneral:session,
          },
        });
      }
      res.json({code:200,data:nuevo});
    });
  });

   app.post('/booking', function(req, res) {
     Booking.createBooking(req.body).then(function (data) {
       if (data.ready) {
         res.json({code:200,data:req.body,id:data.id});
       }else {
         res.json({code:500});
       }
     });
   });

   app.put('/booking', function(req, res) {
     Booking.updateBooking(req.body.idBooking,req.body).then(function (data) {
       if (data.ready) {
         res.json({code:200});
       }else {
         res.json({code:500});
       }
     });
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
        if (user.data.get('isActive')==true) {
          req.session['timesapp-token-session'] = user.data.get('sessionToken');
          session.toke = req.session['timesapp-token-session'];
          var id = user.data.id;
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
        }else {
          return res.redirect('/'+'?inactive=true');
        }

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
  session = {};
  return res.redirect('/');
});



};
