
angular.module('dashboardApp')

.controller("dashboardBoardController", [
		'$scope',
		'loginService', 
		require('./controller')
]);
