/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	// Charge la page de sign-up --> new.ejs
	signUp: function (req, res) {
		var mail= req.param("email");
		User.findOne({
			email: mail
		}).exec(function(err, usr){
			if(err){
				return res.negociate(err);
			}
			else if (usr){
				return res.send(400, {error: "This email is already used."});
			}
			else {
				User.create(req.param.all()), function userCreated(err, user) {
					if(err){
						return res.negociate(err);
					}
					if(user) {
						req.session.userID = user.id;
						return res.view('user/profile', user);
					}
					else {
						return res.view('user/new', user);
					}
				}
			}
		});
	},

	login: function (req, res) {
		var mail= req.param("email");
		var password= req.param("password");
		User.findOne({
			email: mail
		}).exec(function(err, user){
			if(err){
				return res.negociate(err);
			}
			if (user) {
				if (user.password === password){
					req.session.userID = user.id;
					return res.redirect('/user/'+req.session.userID);
				}
				else {
					return res.send(400, {error: "Wrong password"});
				}
			}
			else {
				return res.redirect('/login');
			}
		})
	},

	logout: function (req, res) {
		req.session.userID = null
		return res.redirect('/');
	},

	get: function(req, res) {
		if (req.session.userID === 1){
			var id= req.param("id");
		}
		else {
			var id= req.session.userID;
		}
		User.findOne({
			id: id
		}).exec(function(err, user){
			if(err){
				res.send(400, { error: "What the fuck is going on"});
			}
			else{
				res.view('user/profile', user);
			}
		})
	},

	update: function(req, res) {
		var id = req.param("id")
	},
};
