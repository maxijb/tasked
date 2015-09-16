export default class Service {

	constructor($rootScope, $http) {
		/*-------------- Dependencies ------------ */
		let self = this;
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.boards = [];
		
	}


	get boards() { 
		
	}	

	
	/* Check if user name is already taken
	@ param name : string
	@ param cb : callback receiving the status
	@ void
	@ calls event to update UI
	*/
	createBoard(data) {
		
		return this.$http.post("board/create", data)
		.then((response) => {
			
		})
	}


	


}  // - END CLASS -

	

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
