// var rr = require('./controllerES6');

export default angular.module('boards', ['login'])


.service('boardsService', [
	'$rootScope', 
	'$http', 
	'loginService',
	require('./boardsService')
]);
