var Parse = require('parse/node');
var configEnv = require('../config/enviro.js');

var Headers = {};

Headers.checkParams = function checkParams (req,res, next) {
  if (req.headers['x-parse-application-id']!=configEnv.PARSE_APP_ID) {
    return res.status(401).send({status:401,error:'Unauthorized'});
  }
  next();

};

Headers.checkSession = function checkSession (req,res, next) {
  if (req.session && req.session['x-parse-session-token']) {
    var sess = req.session['x-parse-session-token']?req.session:0;
    var query = new Parse.Query(Parse.Session);
    return query.first({ useMasterKey: true }).then(function(userSess){
      if (userSess.length<=0) {
        return res.redirect('/');
      }
      next();
    }).then(null, function (error) {
      return res.redirect('/');
    });
  }else {
    return res.redirect('/');
  }

};

module.exports = Headers;
