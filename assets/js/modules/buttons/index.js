
export default angular.module('buttons', [])

.directive('actionButton', getBaseButtonDirective.bind(null, 'action-button.html'))

.directive('submitButton', getBaseButtonDirective.bind(null, 'submit-button.html'));



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