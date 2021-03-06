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
            edit: (event) => {
              //abort if click over an anchor... dont want to override links behaviour or open tabs and edit at the same time
              if ((event.target.tagName === "A" || !!$scope.editableRequiredTrigger) && !event.target.className.match("editable-trigger")) return;

              $scope.editing = true;
              $scope.temp.field = angular.copy($scope.field);
            },
            accept: () => {
              $scope.field = $scope.temp.field;
              $scope.update({value: $scope.temp.field});
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
        update: '&',
        editableRequiredTrigger: '@'
      },
      templateUrl: baseTmpl,

    }
}