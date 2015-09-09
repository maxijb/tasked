
export default angular.module('organizations', ['login'])

// .controller('loginController', [
// 	'$scope', 
// 	'$rootScope', 
// 	'$state', 
// 	'loginService', 
// 	require('./controllerES6')
// ])

.service('organizationsService', [
	'$rootScope', 
	'$http', 
	require('./service')
])

// .directive('loginComponent', function() {
//   return {
//   	  restrict: 'EA',
//       scope: true,
//       templateUrl: 'static/templates/modules/login/login.html',
//       controller: 'loginController',
//       controllerAs: 'ctrl'
//     }
// })
