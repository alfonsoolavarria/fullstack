// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var app = express();
var path = require('path');
var Parse = require('parse/node');
var bodyParser = require('body-parser');
var session = require('express-session');

var dic={cloud: __dirname + '/cloud/main.js'};

var configEnv = require('./config/enviro2.js');

  dic.appId = configEnv.PARSE_APP_ID;
  dic.masterKey= configEnv.PARSE_MASTER_KEY;
  dic.serverURL= configEnv.PARSE_SERVER_URL;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session(
  {secret: 'turno123dev',
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = configEnv.PARSE_MOUNT || '/parse';

var port = configEnv.PORT || 1339;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('turnos running on port ' + port + '.');
});

require('./api/routes/routes.js')(app);
