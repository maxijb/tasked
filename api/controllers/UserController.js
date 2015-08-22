/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: Creates and handles user records. Login, signup, login by FB and 3rd parties
 *
 */

module.exports = {

	/** Resets the user in the cookie, login out efectively */
	logout: function(req, res) {
		setUserCookie(req, res, null);
		res.send({});
	},


	/* Quickly check if this name is been used
		@return status: boolean to the client
	*/
	checkName: function(req, res) {
		var name = req.param('name');
		if (!name) return res.send({status: false});

		User.findOne({name: name})
		.then(function(user) {
			res.send({status: !!user});
		});
	},
    
  
	/* Authenticate user 
		@param idLogin : username o email
		@param passwordLogin : password
		@return user object 
		@error code: not-found or database-error
	*/
	login: function(req, res) {
		var id = req.param('idLogin'),
			pass = helpers.sha1sum(req.param('passwordLogin'));

		User.findOne()
		.where({
		  or : [
		    { name: id },
		    { email: id }
		  ],
		  password: pass
		})
		.then(function(user){
			if (user) {
			  setUserCookie(req, res, user);
			  res.send(user);
			} else {
				returnError(res, "notFound");
			}
		})
		.catch(function(err){
		  returnError(res, "databaseError");
		});
	},

	/* Create new user 
		@param name : username
		@param email : email
		@param password : password
		@return user object 
		@error code: notFound or databaseError
	*/
	signup : function(req, res) {
		var name = req.param('name'),
			email = req.param('email');


		User.findOne()
		.where({
		  or : [
		    { name: name },
		    { email: email }
		  ]
		})
		.then(function(user){
			if (user) {

				if (user.name == name) {
					returnError(res, "usedName");
				} else if (user.email == email) {
					returnError(res, "usedEmail");
				}

			} else {
				User.create(req.params.all())
					.then(function(item) {
		        		setUserCookie(req, res, item);
						res.send(item);
				}, function(error) {
					if (typeof error == "string") {
						returnError(res, error);
					} else {
						returnError(res, "databaseError");
					}
				});

			}
		});

	},


	/*
	Logs in users with a 3rd party (FB)
	Checks if the account exits, otherwise it creates it
	TODO: check if email exists and update in that case
	*/
	signup3rdParty : function(req, res) {
		User.findOne({type: req.param('type'), native_id: req.param('native_id')})
			.then(function(user) {
				if (user) {
					setUserCookie(req, res, user);
					res.send(user);
				} else {
					User.create(req.params.all())
						.then(function(item) {
							setUserCookie(req, res, item);
							res.send(item);
						});
				}
			});

	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to NameController)
   */
  _config: {}

  
};

/* 
Sends an error to the client in the format of {errors: {errorName: 1}}
@param error : can be a string or an array
*/
function returnError(res, error) {
	var errors = {};
	if (typeof error == "object") {
		for (var i = 0; i < error.length; i++) {
			errors[error[i]] = 1;
		}
	} else if (error) {
		errors[error] = 1;
	}
	res.send({errors: errors});
}


/*
Sets this user as the one in the cookie
It can be null
@param req, res : regular expresss objects
@param item: user object or null
*/
function setUserCookie(req, res, item) {
	var ctx = req.cookies[sails.config.constants.cookieName];
	ctx.user = item ? {name: item.name, id: item.id} : null;
	console.log(ctx);
	res.cookie(sails.config.constants.cookieName, ctx);
}
