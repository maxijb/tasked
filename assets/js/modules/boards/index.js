// var rr = require('./controllerES6');

export default angular.module('boards', ['login'])

.controller("boardController", [
		'$rootScope', 
		'$scope', 
		'$state', 
		'$stateParams',
		'loginService', 
		'boardsService',
		require("./boardController")
])

.service('boardsService', [
	'$rootScope', 
	'$http', 
	'loginService',
	require('./boardsService')
]);
