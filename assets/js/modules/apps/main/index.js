'use strict';

require('../dashboard');

export default angular.module('mainApp', [
    'ui.router', 
    require("../../login").name, 
    require("../../helpers").name, 
    require("../../buttons").name, 
    require('oclazyload'),
    'dashboardApp'
])
  .provider("providerExample", function() {
  	var text = "hello";
  	this.setText = function(a) {
  		text = a;
  	}

  	this.$get = function() {
  		return {
  			a: function(name) {
  				alert(text + ' ' + name);
  			},
  			b: function(name) {
  				alert(name + "es la B");
  			}
  		}
  	}

  })
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$urlMatcherFactoryProvider', require("./config")])
  .controller("AppController", ['$scope', require("./controller")])
  .run(["$rootScope", "$location", '$state', '$stateParams', require("./run")])
;
