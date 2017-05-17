/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  var hasher = require('password-hash');
  var admin = {
    id: 1,
    email: 'admin@webservice.com',
    password: hasher.generate('adminpass'),
    firstName: 'Local',
    lastName: 'Admin'
  }
  User.find({id: 1}).exec(function(err, user){
    if(err){
      console.log("euuuh. problème à la création de l'admin");
    }
    if(!user){
      User.create(admin).exec(function(err, usr){
        if(err){
          console.log("euuuh. problème à la création de l'admin");
          console.log(err);
        }
      });
    }
    if(user){
      User.destroy(user).exec(function(err, usr){
        User.create(admin).exec(function(err2, usr2){
          if(err2){
            console.log("euuuh. problème à la création de l'admin (mais on l'a trouvé)");
            console.log(err2);
          }
          if(usr2){
            console.log("Admin créé");
          }
        });
      });
    }
  });
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
