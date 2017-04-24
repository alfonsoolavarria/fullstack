var Parse = require('parse/node');

Parse.initialize('8a70d849-410c-409f-9be4-b199125afb10');
Parse.serverURL ='https://timesapp.azurewebsites.net/parse';

var UsersControllers = {};

UsersControllers.logIn = function logIn (options) {
  return Parse.User.logIn(options.email, options.pwd).then(function (user) {
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
