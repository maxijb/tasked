// var rr = require('./controllerES6');

export default angular.module('boards', ['login', 'constants', 'helpers'])

.service('boardsService', [
	'$rootScope', 
	'$http', 
	'loginService',
	'boardUrls',
	'disambiguateTagsLabels',
	require('./boardsService')
]);
