// var rr = require('./controllerES6');

export default angular.module('boardApp', ['login', 'boards'])

.controller("boardController", [
		'$rootScope', 
		'$scope', 
		'$state', 
		'$stateParams',
		'loginService', 
		'boardsService',
		require("./boardController")
]);

