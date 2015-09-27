// var rr = require('./controllerES6');

export default angular.module('boards', ['login', 'constants'])

.service('boardsService', [
	'$rootScope', 
	'$http', 
	'loginService',
	'boardUrls',
	require('./boardsService')
]);
