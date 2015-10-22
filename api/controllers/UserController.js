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

		User.findOne({name: name, type: 'user'})
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

		if (!id || !pass) {
			return returnError(res, "notFound");
		}

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

				let user = req.params.all();
				user.type = 'user';
				// if we can create it
				User.create(user)
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
		let native_id = req.param('native_id');
		if (!native_id || typeof native_id !== "object") return returnError(res, "validationError");

		User.findOne({
		  or : [
		    { native_id: {contains: native_id}},
		    { email: req.param('email') }
		  ]
		})
		.then((user) => {
			//if user exists
			if (user) {

				if (!user.icon) {
					user.icon = generateIconUrl(native_id);
				}

				//if previous email account update with 3rd party id
				if (user.native_id && user.native_id.length) {

					//if another native_id add this
					if (!_.findWhere(user.native_id, {id: native_id.id, type: native_id.type})) { 
						user.native_id.push(native_id);
						user.save(function(err){ err && console.error(err) });
					}

				} else {
					user.native_id = [native_id];
					user.save(function(err){ err && console.error(err) });
				}
				//update cookie and return
				setUserCookie(req, res, user);
				returnUser(res, user);

			} else {
				// else, we have to create it
				User.create({
					type: 'user',
					name: '',
					showName: req.param('name'),
					email: req.param('email'),
					native_id: [native_id],
					icon: generateIconUrl(native_id)
				})
				.then((item) => {

					setUserCookie(req, res, item);
					returnUser(res, item);
				});
			}
		});

	},


	autocomplete(req, res) {
		
		if (!req.param('text')) return res.send([]);

		User.find()
			.where({
			  or : [
			    { name: {contains: req.param('text')} },
			    { email: {contains: req.param('text')} },
			    { showName: {contains: req.param('text')} }
			  ],
			  type: 'user'
			})
			.limit(req.param('limit') || 10)
			.then((users) => {
				let data = users.map((user) => { return {id: user.id, name: user.name || user.showName, icon: user.icon}; });
				res.send(data);
			},
			(error) => {
				console.error(error);
				res.send([]);
			})
	},	


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to NameController)
   */
  _config: {}

  
};

function generateIconUrl(native_id = {}) {
	if (native_id.type == 'fb') {
		return 'http://graph.facebook.com/'+native_id.id+'/picture';
	}

	return null;
}


function chooseNameToShow(user) {
	return (!user.name || user.name == 'user') && user.showName 
						? user.showName 
						: user.name;
}


/** Sends the user information to the client. 
	It only filters the field that we want to expose to the client, saving private info on the server.
	@param res | expresss request
	@param user | {} user object
	@void
*/

function returnUser(res, user) {
	let obj = { id: user.id, 
				name: chooseNameToShow(user), 
				icon: user.icon,
				signup: user.signup,
				native_id: user.native_id
			  };
		
	
	User.find({
		"users.id": user.id 
	})
	.then((orgs) => {
		obj.organizationsDetails = orgs;
		res.send(obj);
	});
	
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
	ctx.user = 
		item ? 
		{
			name: chooseNameToShow(item), 
			id: item.id, 
			icon: item.icon || null
		} 
		: null;
	res.cookie(sails.config.constants.cookieName, ctx);
}
