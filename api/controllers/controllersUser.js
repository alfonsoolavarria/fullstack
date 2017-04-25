var Parse = require('parse/node');
var ParseInit = require('../../default/parseInit.js');


var UsersControllers = {};

UsersControllers.logIn = function logIn (options) {
  return Parse.User.logIn(options.email, options.password).then(function (user) {
      //var userdata = user.toJSON();
      return {code:200,data:user};

    })
    .then(null, function (error) {
      console.log('Error al logearse');
      console.log(error);
      return {code:409,data:'username / password Invalido.'};
    });
};

module.exports = UsersControllers;
