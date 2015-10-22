
export default angular.module('widgets', ['ui.router', 'constants'])

.directive('listWidget', require('./listWidgetDirective'))
.directive('cardWidget', require('./cardWidgetDirective'))
.directive('commentWidget', require('./commentWidgetDirective'))
.directive('boardHeaderWidget', require('./boardHeaderWidgetDirective'))
.directive('cardDatesWidget', require('./card/cardDatesWidgetDirective'))
.directive('cardTimeEllapsedWidget', require('./card/cardTimeEllapsedWidgetDirective'))
.directive('cardAddChecklistWidget', require('./card/cardAddChecklistWidgetDirective'))
.directive('cardAddAttachmentWidget', require('./card/cardAddAttachmentWidgetDirective'))
.directive('cardManageRelationsWidget', require('./card/cardManageRelationsWidgetDirective'))
.directive('manageUsersWidget', require('./card/manageUsersWidgetDirective'))
