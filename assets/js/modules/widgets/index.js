
export default angular.module('widgets', ['ui.router', 'constants'])

.directive('listWidget', require('./listWidgetDirective'))
.directive('cardWidget', require('./cardWidgetDirective'))
.directive('commentWidget', require('./commentWidgetDirective'))
