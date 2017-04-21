var Parse = require('parse/node');



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
