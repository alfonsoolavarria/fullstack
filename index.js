//TimesApp.

var express = require('express');
var app = express();
var path = require('path');
var ParseInit = require('./default/parseInit.js');
var Parse = require('parse/node');
var bodyParser = require('body-parser');
var session = require('express-session');
var dic={cloud: __dirname + '/cloud/main.js'};
var configEnv = require('./config/enviro.js');
var type_business = require('./default/typeBusiness.js');
var _ = require('lodash');

 dic.appId = configEnv.PARSE_APP_ID;
 dic.masterKey= configEnv.PARSE_MASTER_KEY;
 dic.serverURL= configEnv.PARSE_SERVER_URL;


//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(session({
  secret: 'turno123dev',
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));
// Serve the Parse API on the /parse URL prefix
var mountPath = configEnv.PARSE_MOUNT || '/parse';

function createTB() {
  var query = new Parse.Query("TypeBusiness");
  return query.find({
    success: function(dataType) {
      if (dataType.length>0) {
        Parse.Object.destroyAll(dataType);
    }
    _.each(type_business.all_business,function(typeb){
      var typeB = new Parse.Object("TypeBusiness");
      typeB.set('name', typeb.name);
      typeB.save(null,{ useMasterKey: true });
    });

    },
    error: function(error) {
      _.each(type_business.all_business,function(typeb){
        var typeB = new Parse.Object("TypeBusiness");
        typeB.set('name', typeb.name);
        typeB.save(null,{ useMasterKey: true });
      });
    }
  });
}

//createTB(); //create type_business

//clean cache
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

var port = configEnv.PORT || 1339;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('turnos running on port ' + port + '.');
});

require('./api/routes/routes.js')(app);
