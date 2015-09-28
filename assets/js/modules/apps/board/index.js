// var rr = require('./controllerES6');

export default angular.module('boardApp', ['login', 'boards', require("../../widgets").name, require("../../dragng").name])

.controller("boardController", [
		'$rootScope', 
		'$scope', 
		'$state', 
		'$stateParams',
		'loginService', 
		'boardsService',
		require("./boardController")
]);

