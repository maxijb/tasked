// var rr = require('./controllerES6');

export default angular.module('login', ['ui.router', require('../organizations').name, 'constants'])

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
	'loginUrls',
	require('./loginService')
])

.directive("userIcon", require('./userIconDirective')) 
.directive('loginComponent', function() {
  return {
  	  restrict: 'EAC',
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

.filter('formatUserName', function() {
	return function(name) {
		if (!name || name.length <= 10) return name;

		let parts = name.split(' ');
		return parts[0] + " " + parts[1].substr(0,1).toUpperCase();
	}
})

