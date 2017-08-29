var Parse = require('parse/node');
var middle = require('../../middleware/headers');
var express = require('express')
var Users = require('../models/user');
var UsersContro = require('../controllers/controllersUser');
var BusinessControllers = require('../controllers/businessController');
var EployeeControllers = require('../controllers/employeeController');
var ServiceControllers = require('../controllers/serviceController');
var Booking = require('../controllers/bookingController');
var Category = require('../controllers/categoryController');
var ClienteControllers = require('../controllers/clientController');
var Env = require('../../config/enviro');
var GloVariable = require('../controllers/globalVariable');
var _ = require('lodash');
var moment2 = require('moment');
var moment = require('moment-timezone').tz.setDefault('Europe/Madrid');

var USER_ALL = GloVariable.TYPES;
var usersType = {};

var useTemplate = {
  dashboard:false,
  employee:false,
  admin:false,
  service:false
}

module.exports = function(app) {

  app.get('/', function(req, res) {
    if (req.session) {
      if (req.session.admin) {
        return res.redirect('/business/list?'+'user='+req.session.userId);
      }else if (req.session.owner) {
        return res.redirect('/calendar?'+'owner='+req.session.userId+'&twoService='+1);
      }else if (req.session.employee) {
        return res.redirect('/calendar?'+'employee='+req.session.userId);
      }else if (req.session.ownerAdmin) {
        return res.redirect('/branch?ownerAdmin='+req.session.userId);
      }
    }
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
  //
  app.get('/admin',middle.checkSession, function(req, res) {
    usersType.admin = true;
    usersType.owner=false;
    usersType.employee=false;
    usersType.userId = req.query.user;
    return res.render('index.ejs',{
      usersType,
      session:req.session,
      businessSelec:0,
      dashSelec:1,
      branchSelect:0,
      employeeSelec:0,
      calendarSelec:0,
      categorySelec:0,
      serviSelect:0,
      clientSelect:0,
    });
	});

  /*******************************|
  |*******Owner********|
  ********************************/

  app.get('/owner',middle.checkSession, function(req, res) {
    usersType.admin=false;
    usersType.employee=false;
    usersType.owner=true;
    usersType.userId = req.query.user;
    //res.redirect('/calendar');
    /*return res.render('index.ejs',{
      usersType,
      session:session,
      businessSelec:0,
      dashSelec:1,
      calendarSelec:0,
      employeeSelec:0,
      categorySelec:0,
      serviSelect:0,
    });*/
  });

  /*******************************|
  |*******Employee********|
  ********************************/

  app.get('/employee',middle.checkSession, function(req, res) {
    usersType.admin=false;
    usersType.owner=false;
    usersType.employee=true;
    usersType.userId = req.query.user;
    res.render('index.ejs',{
      usersType,
      session:req.session,
      businessSelec:0,
      dashSelec:1,
      branchSelect:0,
      calendarSelec:0,
      employeeSelec:0,
      categorySelec:0,
      serviSelect:0,
      clientSelect:0,
    });
	});

  app.get('/employee/:id',middle.checkSession, function(req, res) {
    var selectPageE=1;
    if (req.query.page) {
      selectPageE=req.query.page;
      req.query.page=req.query.page-1;
    }
    req.query.flag=true;
    Users.getEmployeeBusiness2(req.params.id,req.query).then(function(employeeB) {
      res.render('business/employee.ejs',{
        employeeB,
        usersType,
        selectPageE,
        catpageE:JSON.parse(JSON.stringify(employeeB.cantPage)),
        businessSelec:0,
        employeeSelec:1,
        branchSelect:0,
        calendarSelec:0,
        dashSelec:0,
        session:req.session,
        categorySelec:0,
        serviSelect:0,
        clientSelect:0,
      });
    });
  });

  app.get('/employee/:id/details',middle.checkSession, function(req, res) {
    Users.getOneClient(req.params.id,req.query).then(function(employeeB) {
      res.render('business/employeedetails.ejs',{
        employeeB,
        usersType,
        businessSelec:0,
        employeeSelec:1,
        branchSelect:0,
        calendarSelec:0,
        dashSelec:0,
        session:req.session,
        categorySelec:0,
        serviSelect:0,
        clientSelect:0,
      });
    });
  });

  app.post('/employee',middle.checkSession, function(req, res) {
    Users.checkUser(req.body).then(function(result) {
      if (result.code==409) {
        res.json(result);
      }
      EployeeControllers.creteEmployee(req.body).then(function(user) {
        BusinessControllers.addRelationBusiness(user,req.body).then(function(data){
          res.json({code:200});
        });
      });
    });
	});

  app.put('/employee',middle.checkSession, function(req, res) {
    ///console.log('lleguee',req.body);
    return Users.checkUser(req.body).then(function(result) {
      if (result.code==409) {
        res.json(result);
        return;
      }
      EployeeControllers.updateEmployee(req.body).then(function(user) {
        res.json(user);
      });
    });

  });

  /*******************************|
  |*******Business-Empresas********|
  ********************************/
  app.get('/business',middle.checkSession, function(req, res) {
      usersType.userId = req.query.user;
      var valores={}; var templat = '';
      Users.getTypeBusiness().then(function(typeBusiness) {
        if (req.params.branch) templat = 'business/newbranch.ejs';
        else templat = 'business/newbusiness.ejs';
        res.render(templat,{
          usersType,
          valores,
          session:req.session,
          typeBusiness,
          businessSelec:1,
          dashSelec:0,
          branchSelect:0,
          employeeSelec:0,
          calendarSelec:0,
          categorySelec:0,
          serviSelect:0,
          clientSelect:0,
        });
      });
	});

  app.get('/business/list',middle.checkSession, function(req, res) {
    var valores={},selectPage=1;
    if (req.query.user && usersType.admin){
      req.session.userId = req.query.user;
    } else {
      req.body.owner = req.query.owner?req.query.owner:req.query.user;

      if (!req.session.ownerAdmin) {
        req.session.userId = req.query.owner;
      }
    }
    if (req.query.page) {
      selectPage=req.query.page;
      req.query.page=req.query.page-1;
    }
    BusinessControllers.searchListBusiness(req.body,req.query.page).then(function(data){
      if (data) {
        valores=JSON.parse(JSON.stringify(data.data));
      }
      res.render('business/businesslist.ejs',{
        usersType,
        valores,
        session:req.session,
        catpage:JSON.parse(JSON.stringify(data.cantPage)),
        selectPage:selectPage,
        businessSelec:1,
        branchSelect:0,
        calendarSelec:0,
        dashSelec:0,
        employeeSelec:0,
        categorySelec:0,
        serviSelect:0,
        clientSelect:0,
      });
    });
	});

  app.get('/mainbusiness/list',middle.checkSession, function(req, res) {
    var valores={},selectPage=1;
    if (req.query.user && usersType.admin){
      req.session.userId = req.query.user;
    }
    if (req.query.page) {
      selectPage=req.query.page;
      req.query.page=req.query.page-1;
    }
    BusinessControllers.searchListMainBusiness(req.body,req.query.page).then(function(data){
      if (data) {
        valores=JSON.parse(JSON.stringify(data.data));
      }
      res.render('business/mainbusinesslist.ejs',{
        valores,
        session:req.session,
        catpage:JSON.parse(JSON.stringify(data.cantPage)),
        selectPage:selectPage,
        businessSelec:1,
        branchSelect:0,
        calendarSelec:0,
        dashSelec:0,
        employeeSelec:0,
        categorySelec:0,
        serviSelect:0,
        clientSelect:0,
      });
    });
	});

  app.get('/business/:id/dashboard',middle.checkSession, function(req, res) {
    var employee='',service='',client='', selectPageE=1, catpage=10, serviceData={};
    var listService = [], final=[], schedule=[], dataClient=[], listCateSelect,listCategory=[];
    if (req.query.page) {
      selectPageE=req.query.page;
      req.query.page=req.query.page-1;
    }

    useTemplate.client=false;
    useTemplate.service=false;
    useTemplate.employee = false;
    useTemplate.dashboard = false;
    if (req.query.type=='client') {
      useTemplate.client=true;
      client='active';
      Users.getUsersClient('Cliente',req.query).then(function(userClient){
        dataClient = JSON.parse(userClient);
        for (var ii = 0; ii < dataClient.length; ii++) {
          if (dataClient[ii].catpageE) {
            catpage = dataClient[ii].catpageE;
          }
        }
        for (var ii = 0; ii < dataClient.length; ii++) {
          dataClient = dataClient.filter(function(el) {
            return !el.catpageE;
          });
        }
        res.render('business/dashboard.ejs',{
          usersType,
          valores:{objectId:req.params.id},
          typeBusiness:{},
          useTemplate,
          employeeB:null,
          dashboard:'',
          employee,
          service,
          bussiId:req.params.id,
          selectPageE,
          employeeSelec:0,
          catpageE:catpage,
          dataClient:dataClient,
          client:'active',
          businessSelec:1,
          branchSelect:0,
          calendarSelec:0,
          dashSelec:0,
          session:req.session,
          categorySelec:0,
          serviSelect:0,
          clientSelect:0,
        });
      });
    }else {
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
            Users.getEmployeeBusiness(req.params,req.query).then(function(employeeB) {
              if (useTemplate.service) {
                req.query.type='listcate';
                ServiceControllers.getService(req.params.id,req.query).then(function(serviceData) {
                  req.query.type='service';
                  for (var ii = 0; ii < serviceData.length; ii++) {
                    if (serviceData[ii].liscate) {
                      listCateSelect = serviceData[ii].liscate;
                    }
                  if (serviceData[ii].catpageE) {
                      catpage = serviceData[ii].catpageE;
                    }
                  }
                  serviceData = serviceData.filter(function(el) {
                    return !el.liscate;
                  });
                  serviceData = serviceData.filter(function(el) {
                    return !el.catpageE;
                  });

                  if (serviceData.length>0) {
                    serviceData = JSON.parse(JSON.stringify(serviceData));
                    for (var i = 0; i < serviceData.length; i++) {
                      if (listCategory.indexOf(serviceData[i].category)<0) {
                        listCategory.push(serviceData[i].category);
                      }
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
                  serviceData = _.orderBy(serviceData, ['category'], ['desc']);
                  res.render('business/dashboard.ejs',{
                    usersType,
                    valores,
                    typeBusiness,
                    useTemplate,
                    bussiId:req.params.id,
                    employeeB,
                    dashboard:'',
                    employee,
                    selectPageE,
                    catpageE:catpage,
                    listCategory,
                    listCateSelect,
                    service,
                    client,
                    serviceData,
                    final,
                    dataClient,
                    listService,
                    schedule,
                    businessSelec:1,
                    branchSelect:0,
                    employeeSelec:0,
                    calendarSelec:0,
                    dashSelec:0,
                    session:req.session,
                    categorySelec:0,
                    serviSelect:0,
                    clientSelect:0,
                  });
                });
              }else {
                res.render('business/dashboard.ejs',{
                  usersType,
                  valores,
                  typeBusiness,
                  useTemplate,
                  employeeB,
                  bussiId:req.params.id,
                  dashboard:'',
                  employee,
                  catpageE:employeeB.cantPage,
                  selectPageE,
                  service,
                  client,
                  serviceData,
                  listCateSelect,
                  listCategory,
                  final,
                  dataClient,
                  listService,
                  schedule,
                  businessSelec:1,
                  calendarSelec:0,
                  branchSelect:0,
                  dashSelec:0,
                  employeeSelec:0,
                  session:req.session,
                  categorySelec:0,
                  serviSelect:0,
                  clientSelect:0,
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
              bussiId:req.params.id,
              employeeB:null,
              dashboard:'active',
              employee:'',
              service:'',
              serviceData,
              final,
              dataClient,
              listService,
              schedule,
              client,
              businessSelec:1,
              calendarSelec:0,
              branchSelect:0,
              dashSelec:0,
              employeeSelec:0,
              session:req.session,
              categorySelec:0,
              serviSelect:0,
              clientSelect:0,
            });
          }
        });
      });
    }
	});


  app.post('/business',middle.checkSession, function(req, res) {
    if (req.body.branch=='true') {
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
            return;
          }
          BusinessControllers.createBusiness(req.body).then(function(dataBusiness){
            if (dataBusiness.ready) {
              Users.createUser(req.body,dataBusiness)
              .then(function (user) {
                BusinessControllers.addPointerBusiness(dataBusiness,user.id)
                .then(function(data){
                  BusinessControllers.addRelationMainBusiness(req.body,dataBusiness)
                  .then(function(data){
                  res.json({usersType,valores,data});
                  });
                });
              });
            }else {
              res.json({usersType,valores,data});
            }
          });
        });
      }
    }else {
      Users.checkUser(req.body).then(function(result) {
        if (result.code==409) {
          res.json(result);
          return;
        }
        Users.createUser(req.body).then(function (user) {
          BusinessControllers.createMainBusiness(req.body,user.id,req.session.userId).then(function(dataBusiness){
            res.json(dataBusiness);
          });
        });
      });
    }//end else
	});

  app.put('/business',middle.checkSession, function(req, res) {

    if (req.body.main =='1') {
      if (req.body.deleteB || req.body.activa) {
        return BusinessControllers.updateMainBusiness(req.body).then(function(data) {
          return Users.activateDesactivate(req.body,data).then(function() {
            return res.json({code:200});
          });
        });
      }
      if (req.body.flaguser) {
        Users.checkUser(req.body).then(function(result) {
          if (result.code==409) {
            res.json(result);
            return;
          }
        });
      }
      return BusinessControllers.updateMainBusiness(req.body).then(function(data) {
        if (data.code==500) {
          return res.json({code:500});
        }
        if (req.body.flaguser) {
          Users.updateUserBusiness(req.body).then(function (user) {
            return res.json({code:200});
          });
        }else {
          return res.json({code:200});
        }
      });
    }

    if (req.body.deleteB || req.body.activa) {
      BusinessControllers.deleteBusiness(req.body).then(function(data) {
        BusinessControllers.searchListMainBranchesSubtract(req.body).then(function(data2) {
          Users.activateDesactivate(req.body,data).then(function() {
            return res.json({code:200});
          });
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
  |*******Main Branch********|
  ********************************/

  app.get('/branch',middle.checkSession, function(req, res) {
    var valores={},branch={},selectPage=1;
    var varbuss=0,varowner=0, list=[];
    if (req.query.page) {
      selectPage=req.query.page;
      req.query.page=req.query.page-1;
    }
    BusinessControllers.searchListMainBranches(req.session.userId,req.query.page).then(function(data){
      if (data) {
        valores=JSON.parse(JSON.stringify(data.data));
        branch=data.branch[0];
        if (req.query.buss && req.query.owner) {
          varbuss = req.query.buss;
          varowner = req.query.owner;
        }else if(data.branch[0].length>0) {
          varbuss = data.branch[0][0].objectId;
          varowner = data.branch[0][0].owner.objectId;
        }
      }

      list.push(varowner);
      Users.getTypeBusiness().then(function(typeBusiness) {
        req.session.valores=valores;
        req.session.branch=branch;
        req.session.varbuss=varbuss;
        req.session.varowner=varowner;
        req.session.list=list;
        //flagParamas 0:business 1:branch 2:calendar 3:employee y servicelist 4:client
        if (req.query.flagParamas=='0') {
          return res.redirect(req.query.value+'owner='+varowner);
        }else if (req.query.flagParamas=='2') {
          return res.redirect(req.query.value+'&owner='+varowner);
        }else if (req.query.flagParamas=='3') {
          return res.redirect(req.query.value+varowner);
        }else if (req.query.flagParamas=='4') {
          return res.redirect(req.query.value+varbuss);
        }else {
          if (req.session.branch.length<1 || req.query.flag=='true') {
            res.render('ownerAdmin/newbranch.ejs',{
              usersType,
              typeBusiness,
              session:req.session,
              catpage:JSON.parse(JSON.stringify(data.cantPage)),
              selectPage:selectPage,
              businessSelec:0,
              branchSelect:1,
              calendarSelec:0,
              dashSelec:0,
              employeeSelec:0,
              categorySelec:0,
              serviSelect:0,
              clientSelect:0,
            });
          }else {
            return res.redirect('/calendar?owner='+req.session.varowner+'&twoService=1');
          }
        }
      });
    });
	});


  /*******************************|
  |*******Service********|
  ********************************/

  app.get('/service/:id/:bussines',middle.checkSession, function(req, res) {
    var selectPageE=1, catpage=10, serviceData={};
    var listService = [], final=[], schedule=[], dataClient=[], listCateSelect,listCategory=[];
    Users.getEmployeeBusinessOne(req.params.bussines).then(function(employeeB) {
      ServiceControllers.getServiceOne(req.params.id).then(function(serviceData) {
        for (var ii = 0; ii < serviceData.length; ii++) {
          if (serviceData[ii].liscate) {
            listCateSelect = serviceData[ii].liscate;
          }
        }
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
        res.render('service/service.ejs',{
          employeeB,
          usersType,
          serviceData,
          listService,
          selectPageE,
          catpageE:catpage,
          final,
          listCategory,
          listCateSelect,
          bussiId:employeeB.idBusiness,
          businessSelec:0,
          employeeSelec:0,
          calendarSelec:0,
          branchSelect:0,
          dashSelec:0,
          session:req.session,
          categorySelec:0,
          serviSelect:1,
          clientSelect:0,
        });
      });
    });
  });

  app.get('/servicelist/:id',middle.checkSession, function(req, res) {
    var selectPageE=1, serviceData={}, catpage=10, listService = [], final=[], listCategory=[], listCateSelect;
    if (req.query.page) {
      selectPageE=req.query.page;
      req.query.page=req.query.page-1;
    }
    req.query.flag=false;
    Users.getEmployeeBusiness2(req.params.id,req.query).then(function(employeeB) {
      req.query.type='listcate';
      ServiceControllers.getService2(req.params.id,req.query).then(function(serviceData) {
        for (var ii = 0; ii < serviceData.length; ii++) {
          if (serviceData[ii].liscate) {
            listCateSelect = serviceData[ii].liscate;
          }
        }
        serviceData = serviceData.filter(function(el) {
          return !el.liscate;
        });

        if (serviceData.length>0) {
          serviceData = JSON.parse(JSON.stringify(serviceData));
          for (var i = 0; i < serviceData.length; i++) {
            if (listCategory.indexOf(serviceData[i].category)<0) {
              listCategory.push(serviceData[i].category);
            }
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
        serviceData = _.orderBy(serviceData, ['category'], ['desc']);
        res.render('service/servicelist.ejs',{
          employeeB,
          usersType,
          serviceData,
          selectPageE,
          catpageE:catpage,
          final,
          listCategory,
          listCateSelect,
          bussiId:employeeB.idBusiness,
          businessSelec:0,
          employeeSelec:0,
          calendarSelec:0,
          dashSelec:0,
          session:req.session,
          categorySelec:0,
          serviSelect:1,
          branchSelect:0,
          clientSelect:0,
        });
      });
    });
  });

  app.post('/service',middle.checkSession, function(req, res) {
    ServiceControllers.createService(req.body).then(function(data){
      if (req.body.employee) {
        for (var i = 0; i < req.body.employee.length; i++) {
          ServiceControllers.addReationEmployee(data.id,req.body.employee[i].id).then(function(ready) {
            res.json({code:200});
          });
        }
      }else {
        res.json({code:200});
      }
    });
  });

  app.put('/service',middle.checkSession, function(req, res) {
    ServiceControllers.updateService(req.body).then(function(data){
      if (req.body.employee) {
        ServiceControllers.removeReationEmployee(data.id).then(function() {
          for (var i = 0; i < req.body.employee.length; i++) {
            ServiceControllers.addReationEmployee(data.id,req.body.employee[i].id).then(function(ready) {
              res.json({code:200});
            });
          }
        });
      }else {
        res.json({code:200});
      }
    });
  });


  /********************************
  ************CALENDAR************
  ********************************/
  app.get('/calendar',middle.checkSession, function(req, res) {
    //session.userId = req.query.employee ? req.query.employee : req.query.owner ?req.query.owner: req.query.admin ? req.query.admin:0;
    Users.getUsersClient('Cliente',{type:'special',page:0}).then(function(data){
      var idUserEmploOwner = 0, idgetservice=0;
      if (req.query.employee) {
        idUserEmploOwner = req.query.employee;
      }else if (req.query.owner) {
        idUserEmploOwner = req.query.owner;
      }
      BusinessControllers.searchBusinessEmployee(req.query,idUserEmploOwner).then(function(dataBusiness1) {
        if (req.query.employee) req.query.idowner = dataBusiness1[0].owner //filtro de solo empleado
        Users.getEmployeeBusiness2(idUserEmploOwner,req.query).then(function(employeeB) {
          var id = 10;
          if (dataBusiness1.length>0) id = JSON.parse(JSON.stringify(dataBusiness1[0])).business;
          if (req.session.ownerAdmin) {
            idgetservice=req.query.owner;
          }else {
            idgetservice=req.session.userId
          }

          if (req.query.twoService=='1') {
            var queryQuery = ServiceControllers.getService2(idgetservice,{type:'',page:0});
          }else {
            var queryQuery = ServiceControllers.getService(id,{type:'',page:0});
          }
          queryQuery.then(function(serviceData) {
            var listaemploye=[],listaservice=[],final2=[], flag=[], bussiId=0;
            var datakk = JSON.parse(JSON.stringify(serviceData));
            for (var i = 0; i < datakk.length; i++) {
              bussiId=datakk[i].business.objectId;
              listaservice.push({name:datakk[i].serviceName,id:datakk[i].objectId,bussi:datakk[i].business.objectId,duration:datakk[i].duration});
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
              req.session.business=id;
              bussiId=id;
            }else {
              req.session.business=bussiId;
              bussiId=bussiId;
            }
            res.render('calendar/calendar.ejs',{
              usersType,
              session:req.session,
              client:data,
              service:JSON.stringify(listaservice),
              employee:JSON.stringify(listaemploye),
              employee2:JSON.stringify(employeeB.employee),
              Idbussi:bussiId,
              businessSelec:0,
              dashSelec:0,
              calendarSelec:1,
              branchSelect:0,
              categorySelec:0,
              employeeSelec:0,
              serviSelect:0,
              clientSelect:0,
            });
          });
        });
      });
    });
	});

  /********************************
  *****Booking - Reservas-Citas****
  ********************************/
  app.get('/booking', function(req,res) {
    Booking.getBooking(req.session.business).then(function (data) {
      var colors = {'0':'green','1':'blue','3':'orange'}
      var nuevo = [];
      for (var i = 0; i < data.length; i++) {
        var pos = JSON.parse(JSON.stringify(data[i])).state;
        nuevo.push({
          title:JSON.parse(JSON.stringify(data[i])).client.name,
          start:moment(JSON.parse(JSON.stringify(data[i])).startDate.iso).format(),
          serviceName:JSON.parse(JSON.stringify(data[i])).service.serviceName,
          backgroundColor:JSON.parse(JSON.stringify(data[i])).employee.color,
          colorState:colors[pos],
          color:JSON.parse(JSON.stringify(data[i])).employee.color,
          alfonso: {
            end: moment(JSON.parse(JSON.stringify(data[i])).startDate.iso).format("HH:mm"),
            duration:JSON.parse(JSON.stringify(data[i])).duration,
            service:JSON.parse(JSON.stringify(data[i])).service,
            serviceName:JSON.parse(JSON.stringify(data[i])).service.serviceName,
            employee:JSON.parse(JSON.stringify(data[i])).employee,
            employeeName:JSON.parse(JSON.stringify(data[i])).employee.name,
            employeeColor:JSON.parse(JSON.stringify(data[i])).employee.color,
            bussines:JSON.parse(JSON.stringify(data[i])).bussines,
            client:JSON.parse(JSON.stringify(data[i])).client,
            clientName:JSON.parse(JSON.stringify(data[i])).client.username,
            additionalInfo:JSON.parse(JSON.stringify(data[i])).additionalInfo,
            idBooking:JSON.parse(JSON.stringify(data[i])).objectId,
            state:JSON.parse(JSON.stringify(data[i])).state,
            dataGeneral:req.session,
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
   ************Client************
   ********************************/

   app.get('/client/:id',middle.checkSession, function(req,res) {
     var selectPageE=1, catpageE=10;
     if (req.query.page) {
       selectPageE=req.query.page;
       req.query.page=req.query.page-1;
     }
     req.query.type='client';
     Users.getUsersClient('Cliente',req.query).then(function(userClient){
       dataClient = JSON.parse(userClient);
       for (var ii = 0; ii < dataClient.length; ii++) {
         if (dataClient[ii].catpageE) {
           catpage = dataClient[ii].catpageE;
         }
       }
       for (var ii = 0; ii < dataClient.length; ii++) {
         dataClient = dataClient.filter(function(el) {
           return !el.catpageE;
         });
       }
       res.render('client/client.ejs',{
         usersType,
         typeBusiness:{},
         employeeB:null,
         dashboard:'',
         bussiId:req.params.id,
         selectPageE,
         employeeSelec:0,
         catpageE:catpage,
         dataClient:dataClient,
         businessSelec:0,
         calendarSelec:0,
         branchSelect:0,
         dashSelec:0,
         session:req.session,
         categorySelec:0,
         serviSelect:0,
         clientSelect:1,
       });
     });
   });

   app.get('/client/:id/details',middle.checkSession, function(req,res) {
     if (req.query.historial) {
       Users.getHistorialClient(req.params.id).then(function(dataClient){
         res.render('client/clientdetails.ejs',{
           clientData:dataClient,
           employeeSelec:0,
           details:0,
           detailsString:'',
           historialString:'active',
           idclient:req.params.id,
           calendarSelec:0,
           dashSelec:0,
           session:req.session,
           categorySelec:0,
           serviSelect:0,
           businessSelec:1,
           clientSelect:1,
           branchSelect:0,
         });
       });
     }else {
       Users.getOneClient(req.params.id).then(function(userClient){
         res.render('client/clientdetails.ejs',{
           clientData:userClient,
           employeeSelec:0,
           details:1,
           detailsString:'active',
           historialString:'',
           idclient:req.params.id,
           calendarSelec:0,
           dashSelec:0,
           session:req.session,
           categorySelec:0,
           serviSelect:0,
           businessSelec:1,
           branchSelect:0,
           clientSelect:1,
         });
       });
     }
   });

   app.post('/client',middle.checkSession, function(req, res) {
     Users.checkUser(req.body).then(function(result) {
       if (result.code==409) {
         res.json(result);
       }
       ClienteControllers.createCliente(req.body).then(function(user) {
         res.json({code:200,data:user});
       });
     });
   });

   app.put('/client',middle.checkSession, function(req, res) {
     Users.checkUser(req.body).then(function(result) {
       if (result.code==409) {
         res.json(result);
       }
       ClienteControllers.updateCliente(req.body).then(function(user) {
         res.json(user);
       });
     });
   });

   /********************************
    ************Category***********
    ********************************/
    app.get('/category',middle.checkSession, function(req, res) {
      res.render('category/categories.ejs',{
        usersType,
        session:req.session,
        businessSelec:0,
        dashSelec:0,
        calendarSelec:0,
        categorySelec:1,
        branchSelect:0,
        employeeSelec:0,
        serviSelect:0,
        clientSelect:0,
      });
    });

    app.get('/category/list',middle.checkSession, function(req, res) {
      Category.getCategories().then(function(dataC) {
        res.render('category/categorieslist.ejs',{
          usersType,
          session:req.session,
          businessSelec:0,
          dashSelec:0,
          listCateg:JSON.parse(dataC),
          calendarSelec:0,
          categorySelec:1,
          branchSelect:0,
          employeeSelec:0,
          serviSelect:0,
          clientSelect:0,
        });
      });
    });

    app.post('/category',middle.checkSession, function(req, res) {
      Category.createCategory(req.body).then(function(dataC) {
        res.json(dataC);
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
          req.session['x-parse-session-token'] = user.data.get('sessionToken');
          req.session.name = user.data.get('name');
          req.session.id = user.data.id;
          var id = user.data.id;
          if (user.data.get('type')==USER_ALL.admin) {
            console.log('Administrador');
            //return res.redirect('/admin?'+'user='+id);
            usersType.admin = true;
            req.session.admin=true;
            req.session.owner=false;
            req.session.ownerAdmin=false;
            req.session.employee=false;
            req.session.userId=id;
            //return res.redirect('/business/list?'+'user='+id);
            return res.redirect('/mainbusiness/list?'+'user='+id);
          }
          else if (user.data.get('type')==USER_ALL.owner) {
            console.log('Propietario');
            usersType.owner=true;
            req.session.admin=false;
            req.session.owner=true;
            req.session.ownerAdmin=false;
            req.session.employee=false;
            req.session.userId=id;
            //return res.redirect('/owner?'+'user='+id);
            return res.redirect('/calendar?'+'owner='+id+'&twoService='+1);
            //return res.redirect('/service/'+id);
          }
          else if (user.data.get('type')==USER_ALL.ownerAdmin) {
            console.log('Propietario Administrador');
            usersType.owner=true;
            req.session.admin=false;
            req.session.ownerAdmin=true;
            req.session.owner=false;
            req.session.employee=false;
            req.session.userId=id;
            //return res.redirect('/owner?'+'user='+id);
            return res.redirect('/branch?'+'ownerAdmin='+id);
            //return res.redirect('/service/'+id);
          }
          else if (user.data.get('type')==USER_ALL.employee) {
            console.log('Empleado');
            req.session.admin=false;
            req.session.owner=false;
            req.session.ownerAdmin=false;
            req.session.employee=true;
            req.session.userId=id;
            return res.redirect('/calendar?'+'employee='+id);
            //return res.redirect('/employee?'+'user='+id);
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
  req.session.destroy();
  return res.redirect('/');
});

//Forgot Password
app.get('/forgot', function(req, res) {
  res.render('templates/forgot.ejs',{});
});

app.post('/forgot', function(req, res) {
  console.log(req.body);
  return Parse.User.requestPasswordReset(req.body.email, {
    success: function() {
      console.log('listooo');
    // Password reset request was sent successfully
    },
    error: function(error) {
      console.log('error-->'+JSON.stringify(error));
    }
  });

});

//pruebas postman
/*app.get('/test/:id',function(req,res) {
  console.log('aquiiii');
  Users.getHistorialClient(req.params.id).then(function(dataClient){
    res.render('client/clientdetails.ejs',{
      clientData:dataClient,
      employeeSelec:0,
      details:0,
      detailsString:'',
      historialString:'active',
      idclient:req.params.id,
      calendarSelec:0,
      dashSelec:0,
      session:req.session,
      categorySelec:0,
      serviSelect:0,
      businessSelec:1,
      clientSelect:1,
    });
  });
});*/


};
