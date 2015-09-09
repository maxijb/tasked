export default class OrganizationService {

	constructor($rootScope, $http, $q) {
		/*-------------- Dependencies ------------ */
		let self = this;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.$q = $q;
		console.log('corre');

		this.$rootScope.$on("USER-update", (user) => {
			this.user = user || null;
			this.getMyOrganizations();
		});
		
	}
	

	get identities() { return this.user ? [this.user].concat(this.organizations) : []; }

	getMyOrganizations() {
		// let deferred = $q.defer();
		if (!this.user) {
			this.organizations = [];
		} else {
			this.$http.get("/organizations/getMine", (response) => {
				return this.organizations = response.data ? response.data.organizations || [] : [];
				console.log(this.organizations);
			})
		}
	}

	// /* Creates new user
	//    @param user {name: string, email: string, confirmEmail: string, password: string}
	//    @void
	//    @calls update event
	//  */
	// createUser(user) {
	// 	//validation
	// 	let errors = validateCreate(user);
	// 	if (errors) return notificateError.call(this, errors);

	// 	this.$http.post("/user/signup", user)
	// 	.then((response) => {
	// 		if (response && response.data) {
	// 			if (!response.data.errors ) updateUser.call(this, response.data);
	// 			else notificateError.call(this, response.data.errors)
				
	// 		} else {
	// 			notificateError.call(this, {'databaseError': true})
	// 		} 

	// 	});
	// }


}
	

/* --------------- Private methods ---------------- */
/* --------------- Events ---------------- */

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


/* test-code */
//Exposing private methods only for testing
Service.prototype.updateUser = updateUser; 
Service.prototype.validateCreate = validateCreate;
/* end-test-code */
