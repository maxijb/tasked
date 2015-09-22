export default function() {

  let baseTmpl = 'static/templates/modules/custom-forms/create-organization-form.html';

  return {
      restrict: 'AE',
      replace: true,

      controller: function($scope, loginService) {
       
        let defaultScope = {
            name: "",
            users: []
        }


        angular.extend($scope, defaultScope, {
            user: loginService.userObject,
            submitForm: function() {
              $scope.loading = true;
              console.log($scope.users);
              loginService.createOrganization($scope.name, $scope.users.map((x) => x.id ))
              .then((data) => {
                $scope.loading = false;
                angular.extend($scope, defaultScope);
                $scope.cancel();
              });
            }
        });
        
        if (!$scope.users || !$scope.users.length) {
          $scope.users = [$scope.user];
        }



      }, 
      scope: {
        user: '=',
        cancel: '&'
      },
      templateUrl: baseTmpl,

    }
}