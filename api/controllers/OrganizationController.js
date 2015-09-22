/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: Creates and handles user records. Login, signup, login by FB and 3rd parties
 *
 */

export default  {

	create(req, res) {
		let {name, icon, users, status, auth} = req.params.all();

		users = users.map((user, index) => {
			return (typeof user === "string") ?
				{id: user, type: index == 0 ? 'admin' : 'editor'}
				: user;
		});

		User.create({
			name: name, 
			icon: icon,
			users: users || [{
				id: req.W.user.id,
				type: 'admin'
			}],
			status: status || 'visible',
			auth: auth || 'private',
			type: 'organization'

		})
		.then((org) => {
			User.findOne({id: req.W.user.id})
			.then((user) => {
				if (!user) return returnError("databaseError");

				if (user.organizations) {
					user.organizations.push(org.id);
				} else {
					user.organizations = [org.id];
				}
				user.save();
			});
			console.log(org);
			res.send(org);
		}, 
		(error) => {
			return returnError("databaseError");
		});

	},


	getMine(req, res) {
		let user;
		
		try {
			user = req.W.user.id
		} catch (e) {
			return returnError("databaseError");
		}

		User.find({
			"users.id": req.W.user.id 
		})
		.then((orgs) => {
			res.send({organizations: orgs});
		}, 
		(err) => {
			returnError("databaseError");
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

