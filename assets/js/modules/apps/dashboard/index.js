
export default angular.module('dashboardApp', ['login', 'ui.router', 'constants'])

.controller("dashboardController", [
		'$rootScope', 
		'$scope', 
		'$state', 
		'loginService', 
		require("./controller")
])

// .config([
// 		'$stateProvider', 
// 		'$urlRouterProvider', 
// 		'$locationProvider', 
// 		require("./config")
// ])

.run([
		"$rootScope", 
		"$location", 
		'$state', 
		'$stateParams', 
		require("./run")
]);


require('./boards');
