
export default angular.module('buttons', [])

.directive('actionButtonWithEvent', getBaseButtonDirective.bind(null, 'action-button-with-event.html'))
.directive('actionButton', getBaseButtonDirective.bind(null, 'action-button.html'))

.directive('submitButton', getBaseButtonDirective.bind(null, 'submit-button.html'))

.directive('sidebarMenuButton', getBaseButtonDirective.bind(null, 'sidebar-menu-button.html'));



function getBaseButtonDirective(tmpl) {
  let baseTmpl = 'static/templates/modules/buttons/';

  return {
      restrict: 'AE',
      replace: true,
      scope: {
          text: '@',
          action: '&',
          kind: '@'
      },
      templateUrl: baseTmpl + tmpl
    }
}