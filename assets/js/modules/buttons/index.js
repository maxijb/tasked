angular.module('buttons', [])
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
.directive('submitButton', function() {
  return {
      restrict: 'AE',
      replace: true,
      scope: {
          text: '@',
          action: '&',
          kind: '@'
      },
      templateUrl: 'static/templates/modules/buttons/submit-button.html',
    }
});;


