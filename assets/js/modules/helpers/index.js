angular.module('helpers', [])
.filter('i18n', function() {
	return function(input, transpolations) {
		
		return window.__.apply(null, [input].concat(transpolations||[]));
	}
})