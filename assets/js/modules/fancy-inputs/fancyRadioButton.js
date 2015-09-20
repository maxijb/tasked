export default function() {

  return {
      restrict: 'AE',
      replace: true,

      controller: ['$scope', function($scope) {
        
        this.selectStatus = function(item) {
          $scope.options.map((x) => x.selected = false);
          item.selected = true;
        }

      }], 
      scope: {
          options: '='
      },
      templateUrl: 'static/templates/modules/fancy-inputs/fancy-radio-button.html'

    }
}