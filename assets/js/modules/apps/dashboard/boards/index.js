angular.module('dashboardApp')

.controller("dashboardBoardController", [
		'$scope',
		'$rootScope',
		'loginService', 
		'boardsService', 
		require('./controller')
]);
