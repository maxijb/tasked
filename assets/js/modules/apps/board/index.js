// var rr = require('./controllerES6');

export default angular.module('boardApp', ['login', 'boards', require("../../widgets").name, require("../../dragng").name, require("../../cards").name])

.controller("boardController", [
		'$rootScope', 
		'$scope', 
		'$state', 
		'$stateParams',
		'loginService', 
		'boardsService',
		'cardsService',
		require("./boardAppController")
])


.controller("cardController", [
		'$rootScope', 
		'$scope', 
		'$state', 
		'$stateParams',
		'loginService', 
		'boardsService',
		'cardsService',
		require("./cardAppController")
]);