'use strict';



angular.module('indexApp', ['ui.router', 'login', 'helpers', 'buttons'])
  .constant('ENDPOINT_URI', 'https://noterious.firebaseio.com/')
  .service("greeting", function() {
  	console.log('va el service');
  	return {
  		func: function(a) { alert(a); }
  	}
  })
  .provider("greeting2", function() {
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
  .config(['$stateProvider', '$urlRouterProvider', require("./config")])
  .controller("AppController", ['$scope', require("./controller")])
  .run(["$rootScope", "$location", "greeting", "greeting2", require("./run")])
;
