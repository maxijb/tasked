// var rr = require('./controllerES6');

export default angular.module('cards', ['login', 'constants'])

.service('cardsService', [
	'$rootScope', 
	'$http', 
	'loginService',
	'cardUrls',
	require('./cardsService')
])

.directive('cardApp', require('./cardAppDirective'));

