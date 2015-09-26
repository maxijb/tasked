angular.module('dashboardApp')

.controller("dashboardBoardController", [
		'$scope',
		'$rootScope',
		'loginService', 
		'boardsService', 
		'defaultIcons',
		require('./controller')
]);
