
export default angular.module('widgets', ['constants'])

.directive('listWidget', require('./listWidgetDirective'))
.directive('cardWidget', require('./cardWidgetDirective'))
