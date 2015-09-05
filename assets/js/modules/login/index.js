// var rr = require('./controllerES6');
import {default as controller} from './controllerES6'; 
import {default as service} from './service'; 


export default angular.module('login', ['ui.router'])
.controller('loginController', ['$scope', '$rootScope', '$state', 'loginService', controller])
.service('loginService', ['$rootScope', '$http', service])
.directive('loginComponent', function() {
  return {
  	  restrict: 'EA',
      scope: true,
      templateUrl: 'static/templates/modules/login/login.html',
      controller: 'loginController',
      controllerAs: 'ctrl'
    }
})
