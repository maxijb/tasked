export default function() {

  let baseTmpl = 'static/templates/modules/custom-forms/add-user-autocomplete.html';

  return {
      restrict: 'AE',
      replace: true,

      controller: ['$scope', 'loginService', 'userAutocompleteFactory', 'defaultUserIcon', function($scope, loginService, userAutocompleteFactory, defaultUserIcon) {
        

        angular.extend($scope, {
            defaultUserIcon,
            dataSource: {
              type: 'promise',
              method: userAutocompleteFactory
            },
            currentUser: loginService.userId,
            submitForm: function() {
              $scope.loading = true;
              
              // organizationService.createBoard(data)
              //     .then((data) => {
              //        $scope.loading = false;
              //        angular.extend($scope, defaultScope);
              //        $scope.cancel();
              //     });
            }
        });
        

      }], 
      scope: {
        users: '=',
      },
      templateUrl: baseTmpl,

    }
}