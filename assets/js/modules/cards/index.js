// var rr = require('./controllerES6');

export default angular.module('cards', ['login', 'constants'])

.service('cardsService', [
	'$rootScope', 
	'$http', 
	'loginService',
	'cardUrls',
	require('./cardsService')
])

.directive('cardApp', function() {
	return {
      restrict: 'AE',

      controller: function($scope) {
      }, 

      scope: {
          modal: '@',
          card: '=',
          list: '=',
          unselectCard: '&'
      },
      templateUrl: 'static/templates/apps/card/cardApp.html'
  }
})

