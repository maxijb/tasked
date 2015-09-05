export default angular.module('buttons', [])
.directive('actionButton', function() {
  return {
  	  restrict: 'AE',
      replace: true,
      scope: {
      		text: '@',
          action: '&',
          kind: '@'
      },
      templateUrl: 'static/templates/modules/buttons/action-button.html',
    }
})
.directive('submitButton', getBaseButtonDirective.bind(null, 'static/templates/modules/buttons/submit-button.html'));


function getBaseButtonDirective(tmpl) {
  return {
      restrict: 'AE',
      replace: true,
      scope: {
          text: '@',
          action: '&',
          kind: '@'
      },
      templateUrl: tmpl
    }
}