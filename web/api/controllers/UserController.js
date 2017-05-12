/**
 * UserController
 *
<<<<<<< HEAD
 * @description :: Server-side logic for managing Users
=======
 * @description :: Server-side logic for managing users
>>>>>>> 5c4e277fb6d8683a3c372464332be40970915e9f
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
<<<<<<< HEAD


	// Charge la page de sign-up --> new.ejs
	'new': function (req, res) {
		res.view();
	},

	create: function (req, res, next) {


		User.create(req.params.all(), function userCreated (err,user) {
		
			if (err) return next(err);	
			
			res.json(user);
		});
	}
=======
	
>>>>>>> 5c4e277fb6d8683a3c372464332be40970915e9f
};

