var configEnv = require('../config/enviro.js');

var Headers = {};

Headers.checkParams = function checkParams (req,res, next) {
  if (req.headers['x-parse-application-id']!=configEnv.PARSE_APP_ID) {
    return res.status(401).send({status:401,error:'Unauthorized'});
  }
  next();

};

module.exports = Headers;
