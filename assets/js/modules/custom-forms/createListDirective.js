export default function() {

  let baseTmpl = 'static/templates/modules/custom-forms/create-list-form.html';

  return {
      restrict: 'AE',
      replace: true,
      scope: {
        board: '='
      },
      controller: function($scope, loginService, boardsService) {
       
        let defaultScope = {
            "list": { name: "" }
        };


        angular.extend($scope, 
            defaultScope, 
            {
            submitForm: function() {
              $scope.loading = true;
              let params = {
                name: $scope.list.name
              }

              boardsService.createList(params)
                  .then((data) => {
                     $scope.loading = false;
                     angular.extend($scope, defaultScope);
                     $scope.cancel();
                  });
            },
            cancel: function() {
              $scope.open = false;
            },
            create: function() {
              $scope.open = true;
            }
        });
      }, 
      
      templateUrl: baseTmpl

    }
}