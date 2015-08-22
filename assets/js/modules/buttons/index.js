angular.module('buttons', [])
.directive('actionButton', function() {
  return {
  	  restrict: 'AE',
      replace: true,
      scope: {
      		text: '@',
          action: '&',
          type: '@'
      },
      templateUrl: 'static/templates/modules/buttons/action-button.html',
    }
});


