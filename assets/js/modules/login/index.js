// var rr = require('./controllerES6');

export default angular.module('login', ['ui.router', require('../organizations').name])

.controller('loginController', [
	'$scope', 
	'$rootScope', 
	'$state', 
	'loginService', 
	require('./controllerES6')
])

.service('loginService', [
	'$rootScope', 
	'$http', 
	require('./service')
])

.directive('loginComponent', function() {
  return {
  	  restrict: 'EA',
      scope: true,
      templateUrl: 'static/templates/modules/login/login.html',
      controller: 'loginController',
      controllerAs: 'ctrl'
    }
})

.factory('userAutocompleteFactory', ['$http', function($http) {
	return function(text, limit) {
		return $http.get("/user/autocomplete", {params: {text: text}})
		.then((response) => {
			return response.data || [];
		},
		(error) => {
			return [];
		});
	}
}])

