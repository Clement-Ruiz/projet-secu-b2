/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


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
};

