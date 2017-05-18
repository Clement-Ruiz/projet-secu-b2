/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	signUp: function (req, res) {
		var params ={
			email: req.param("email"),
			password: req.param("password"),
			firstName: req.param('firstName'),
			lastName: req.param('lastName')
		};
		if (params.password != req.param('confirmation')){
			return res.redirect('/signup', {message : "Password Confirmation failed"});
		}
		User.findOne({
			email: params.email
		}).exec(function(err, usr){
			console.log('user SignUp : searching for already existant users...');
			if(err){
				console.log('user Signup : Error '+err);
				console.log('user SignUp : FAILED');
				return res.negotiate(err);
			}
			else if (usr){
				return res.view('500');
			}
			else {
				var hasher = require("password-hash");
				params.password = hasher.generate(params.password);
				console.log('user SignUp : email free to use. Creating ...');
				User.create(params, function(err, user) {
					if(err){
						console.log('user Signup : Error '+err);
						console.log('user SignUp : FAILED');
						return res.negotiate(err);
					}
					if(user) {
						console.log('user SignUp : OK');
						console.log('user SignUp : User ID '+user.id);
						req.session.user = user;
						return res.redirect('user/'+user.id);
					}
					else {
						return res.view('user/new', user);
					}
				});
			}
		});
	},

	login: function (req, res) {
		var email= req.param("email");
		var password= req.param("password");
		User.findOne({
			email: email
		}).exec(function(err, user){
			if(err){
				return res.negociate(err);
			}
			if (user) {
				var hasher = require("password-hash");
        if (hasher.verify(password, user.password)) {
					console.log('Login : '+user.email+' password match. Connecting ...');
        	req.session.user.id = user.id;
					return res.redirect('/user/'+user.id	);
				}
				else {
					console.log('Login : '+user.email+' typed wrong password')
					return res.redirect('/login', {message : "Incorrect Password"});
				}
			}
			else {
				return res.redirect('/login');
			}
		})
	},

	logout: function (req, res) {
		req.session.user = null
		return res.redirect('/');
	},

	get: function(req, res) {
		if (req.session.user.id === 1){
			var id= req.param("id");
		}
		else {
			var id= req.session.user.id;
		}
		User.findOne({
			id: id
		}).populate('webftps').populate('vpsusers').populate('vpsroots').exec(function(err, user){
			if(err){
				return res.view('500');
			}
			else if (!user) {
				return res.redirect('user/'+id);
			}
			else{
				return res.view('user/profile', user);
			}
		})
	},

	update: function(req, res) {
		if (req.session.user.id === 1){
			var id = req.param("id");
		}
		else {
			var id = req.session.user.id;
		}
		var newUser = req.params.all();
		newUser.id = id;
		User.update({id: id}, newUser).exec(function(err, usr){
			if(err){
				return res.view('500');
			}
			else {
				return res.redirect('/user/'+id);
			}
		});
	},

	delete: function(req, res) {
		if (req.session.user.id === 1){
			var id = req.param("id");
		}
		else {
			var id = req.session.user.id;
		}
		User.destroy({ id: id }).exec(function(err){
			if(err){
				return res.view('500');
			}
			else {
				return User.logout(req, res);
			}
		})
	}

};
