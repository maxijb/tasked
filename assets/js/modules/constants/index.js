export default angular.module('constants', [])
.constant('defaultUserIcon', '/static/images/default-user-icon.png')
.constant('loginUrls', {
	logout: '/user/logout',
	login: '/user/login',
	signup: '/user/signup',
	checkUserName: 'user/checkName',
	signup3rdParty: '/user/signup3rdParty',
	createOrganization: '/organization/create',
	loadOrganizations: '/organization/getMine'



})