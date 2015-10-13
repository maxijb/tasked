export default angular.module('helpers', [])
.filter('i18n', function() {
	return function(input, transpolations) {
		
		return window.__.apply(null, [input].concat(transpolations||[]));
	}
})
.filter('safeHtml', ['$sce', function($sce) {
	 return $sce.trustAsHtml;
}])
.filter('reverse', function() {
  return function(items) {
    return items && items.length ? items.slice().reverse() : items;
  };
});