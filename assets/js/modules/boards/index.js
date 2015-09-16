// var rr = require('./controllerES6');

export default angular.module('boards', [])


.service('boardsService', [
	'$rootScope', 
	'$http', 
	require('./boardsService')
]);
