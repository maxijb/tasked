/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: Creates and handles user records. Login, signup, login by FB and 3rd parties
 *
 */

export default  {

	/** Resets the user in the cookie, login out efectively */
	logout(req, res) {
		setUserCookie(req, res, null);
		res.ok();
	},


	/* Quickly check if this name is been used
		@return status: boolean to the client
	*/
	checkName(req, res) {
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
	login(req, res) {
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
			  returnUser(res, user);
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
	signup(req, res) {
		let name = req.param('name');
		let email = req.param('email');


		User.findOne()
		.where({
		  or : [
		    { name: name },
		    { email: email }
		  ]
		})
		.then((user) => {
			// if exitss
			if (user) {

				returnError(res, user.name == name ? "usedName" : "usedEmail");

			} else {
				
				// if we can create it
				User.create(req.params.all())
					.then((item) => {
		        	
		        		setUserCookie(req, res, item);
						returnUser(res, item);
					
					}, (error) => {
					
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
	signup3rdParty(req, res) {
		
		User.findOne({
		  or : [
		    {type: req.param('type'), native_id: req.param('native_id')},
		    { email: req.param('email') }
		  ]
		})
			.then((user) => {
				//if user exists
				if (user) {
					
					//if previous email account update with 3rd party id
					if (user.type != req.param('type') || user.native_id != req.param('native_id')) {
						user.type = req.param('type');
						user.native_id = req.param('native_id');
						user.save(function(err){ console.error(err) });
					}
					//update cookie and return
					setUserCookie(req, res, user);
					returnUser(res, user);
				} else {
					// else, we have to create it
					User.create(req.params.all())
						.then((item) => {

							setUserCookie(req, res, item);
							returnUser(res, item);
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


/** Sends the user information to the client. 
	It only filters the field that we want to expose to the client, saving private info on the server.
	@param res | expresss request
	@param user | {} user object
	@void
*/

function returnUser(res, user) {
	let obj = {id: user.id, 
				name: user.name,
				icon: user.icon,
				signup: user.signup,
				type: user.type
			  };
	res.send(obj);
}

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
	res.cookie(sails.config.constants.cookieName, ctx);
}
