export default function() {

  let baseTmpl = 'static/templates/modules/custom-forms/editable-element-form.html';

  return {
      restrict: 'AE',
      transclude: true,

      controller: function($scope, loginService) {
          angular.extend($scope, {
            editing: false,
            temp: {
              field: ""
            },
            edit: () => {
              $scope.editing = true;
              $scope.temp.field = angular.copy($scope.field);
            },
            accept: () => {
              $scope.field = $scope.temp.field;
              $scope.cancel();
            },
            cancel: () => {
              $scope.editing = false;
            }

          })
        
      }, 
      scope: {
        field: '=',
        kind: '@',
        update: '&'
      },
      templateUrl: baseTmpl,

    }
}