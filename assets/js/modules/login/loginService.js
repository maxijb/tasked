export default class Service {

	constructor($rootScope, $http, loginUrls) {
		/*-------------- Dependencies ------------ */
		let self = this;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.loginUrls = loginUrls;

		window.fbAsyncInit = function() {
		    FB.init({
			      appId      : '378165722393720',
			      xfbml      : true,
			      version    : 'v2.3'
			});


		    /* IMPORTANT: we need to activate thsi code in order to allow users to automatically log in if they have an associated FB account */
			// if (!self.user) {
			//     FB.getLoginStatus(function(response) {
			// 	    self.FBstatusChangeCallback(response);
			//     });   
			// }
		};


	    (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	    }(document, 'script', 'facebook-jssdk'));


		/*-------------- Initialize ------------- */
		this.user = W.user ? angular.extend({}, W.user, {type: 'user'}) : null;
		//broadcaste user if one is logged
		if (this.user) {
			updateUser.call(this, this.user);
			this.loadOrganizations();
		}
	}


	/* ---------------------- Getters -------------------------------- */

	get identities() { 
		if (!this.user) { return []; } 
		else {
			let user = angular.copy(this.user);
			delete user.organizationsDetails;
			return [].concat(user).concat(this.user.organizationsDetails || []); 
		}

	}	


	/* Exposes user  as public getter */
	get userObject() { return this.user || null; }

	
	/* Exposes userId  as public getter */
	get userId() { return this.user ? this.user.id : null }

	/* Exposes userName  as public getter */
	get userName() { return this.user ? this.user.name : null }
	get userFirstName() { return this.user && this.user.name ? this.user.name.split(" ")[0] : null }

	get userIcon() { return this.user ? this.user.icon || null : null}


	/* ------------------------------ Public methods ------------------------ */

	/* Reset user information, closing session on the client and the server */
	logout() {
		return this.$http.post(this.loginUrls.logout)
				.then(() => {
					this.user = null;
					this.organizationsDetails = [];
					updateUser.call(this, null);
				});
	}



	/* Creates new user
	   @param user {idLogin: string, passwordLogin: string}
	   @void
	   @calls update event
	 */
	authenticateUser(user) {
		//validation
		let errors = validateLogin(user);
		if (errors) return notificateError.call(this, errors);

		//auth server side
		return this.$http.get(this.loginUrls.login, {params: user})
		.then((response) => {
			if (response && response.data) {
				
				if (!response.data.errors ) updateUser.call(this, response.data);
				else notificateError.call(this, response.data.errors)
				
			} else {
				notificateError.call(this, {'databaseError': true})
			} 

		});
	}

	/* Creates new user
	   @param user {name: string, email: string, confirmEmail: string, password: string}
	   @void
	   @calls update event
	 */
	createUser(user) {
		//validation
		let errors = validateCreate(user);
		if (errors) return notificateError.call(this, errors);

		return this.$http.post(this.loginUrls.signup, user)
		.then((response) => {
			if (response && response.data) {
				if (!response.data.errors ) updateUser.call(this, response.data);
				else notificateError.call(this, response.data.errors)
				
			} else {
				notificateError.call(this, {'databaseError': true})
			} 

		});
	}


	/* Check if user name is already taken
	@ param name : string
	@ param cb : callback receiving the status
	@ void
	@ calls event to update UI
	*/
	checkUserName(name, cb) {
		
		return this.$http.get(this.loginUrls.checkUserName, {params: {name: name}})
		.then((response) => {
			if (response && response.data && response.data.hasOwnProperty('status')) {
				cb(response.data.status);
			} else {
				cb(false);
			}
		})
	}


	/* Starts logging in process with a FB account. 
		This is the method to call from outside the service to log in into facebook 
	   @void
	 */
	loginFacebook() {
		
		FB.getLoginStatus((resp) => {
			
			if (resp.status === "connected") {
				this.FBstatusChangeCallback(resp);
			} else {

				FB.login(() => {
					FB.getLoginStatus((response) => {
				      this.FBstatusChangeCallback(response);
				    });
				});

			}
		});
	}


	/* Checks for FB session status and sets the user as current user in case we are logged in
	   @param response : FB session response
	   @void
	 */
	FBstatusChangeCallback(response) {
		
		if (response.status === 'connected') {
			
			FB.api('/me', (response) => {
				
				if (response.name && !this.user) {
		    		response.native_id = {
		    			id: response.id,
		    			type: 'fb'
		    		}
					delete response.id;
					
					this.$http.post(this.loginUrls.signup3rdParty, response)
					.then((res) => {
							if (res && res.data && res.data.id) {
					    		this.user = angular.extend({}, res.data, {type: 'user'});
					    		updateUser.call(this, res.data);
					    	}
				   });
				}

		    });

		} else if (response.status === 'not_authorized') {
		    // The person is logged into Facebook, but not your app.
		     //document.getElementById('status').innerHTML = 'Please log ' +'into this app.';
		} else {
		    // The person is not logged into Facebook, so we're not sure if
		    // they are logged into this app or not.
		    //document.getElementById('status').innerHTML = 'Please log ' +'into Facebook.';
		}
	}



	/* ---------------------- Organizations --------------------- */
	createOrganization(name, users) {
		return this.$http.post(this.loginUrls.createOrganization, {name, users})
				.then((response) => {
					this.user.organizationsDetails.push(response.data);
					updateOrganizations.call(this, response.data);
				})
	}

	loadOrganizations() {
		if (this.user) {
			if (!this.user.organizationsDetails) this.user.organizationsDetails = [];

			return this.$http.get(this.loginUrls.loadOrganizations)
					.then((response) => {
						debugger;
						this.user.organizationsDetails = response && response.data ? response.data.organizations || [] : [];
						updateOrganizations.call(this, response.data);
					});
		}
	}


}  // - END CLASS -

	

/* --------------- Private methods ---------------- */
/* --------------- Events ---------------- */
function updateOrganizations(org) {
	this.$rootScope.$broadcast("USER-update-organizations", (org.length ? org : [org]));
}

function updateUser(user) {
	this.$rootScope.$broadcast("USER-update", user);
}

function notificateError(errors) {
	this.$rootScope.$broadcast("USER-error", null, errors);
}





/* --------------- Validation ---------------- */

/* validates login data
	@param user : {idLogin: string, passwordLogin: string}
	@return errors {...} || null if valid
*/
function validateLogin(user) {
	let errors = {};
	
	if (!user.idLogin) errors["mandatoryId"] = 1;

	if (!user.passwordLogin) errors["mandatoryPasswordLogin"] = 1;
	else if (user.passwordLogin.length < 6) errors["tooShortPasswordLogin"] = 1;

	return Object.keys(errors).length ? errors : null;
}

/* validates create user data
	@param user : {name: string, email: string, confirmEmail: string, password: string}
	@return errors {...} || null if valid
*/
function validateCreate(user) {
	let errors = {};
	if (!user.name) errors['mandatoryName'] = true;
	
	if (!user.email) errors['mandatoryEmail'] = true;
	else if (!validateEmail(user.email)) errors['invalidEmail'] = true;

	if (user.confirmEmail != user.email) errors['invalidConfirmation'] = true;

	if (!user.password) errors['mandatoryPassword'] = true;
	else if (user.password.length < 6) errors["tooShortPassword"] = 1;

	return Object.keys(errors).length ? errors : null;
}


/* Validates email addres 
	@param email: string
	@return true | false
*/
function validateEmail(email) {
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}


/* test-code */
//Exposing private methods only for testing
Service.prototype.updateUser = updateUser; 
Service.prototype.notificateError = notificateError;
Service.prototype.validateCreate = validateCreate;
Service.prototype.validateLogin = validateLogin;
Service.prototype.validateEmail = validateEmail;
/* end-test-code */
