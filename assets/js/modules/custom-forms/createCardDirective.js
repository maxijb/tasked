export default function() {

  let baseTmpl = 'static/templates/modules/custom-forms/create-card-form.html';

  return {
      restrict: 'AE',
      replace: true,
      scope: {
        list: '='
      },
      controller: function($scope, loginService, boardsService) {
       
        let defaultScope = {
            loading: false,
            open: false,
            "card": { name: "", description: "" }
        };


        angular.extend($scope, angular.copy(defaultScope), 
            {
              
              submitForm: function() {
                //name require
                if (!$scope.card.name) return $scope.cancel();

                $scope.loading = true;
                let params = {
                  card: $scope.card,
                  list: $scope.list
                };

                boardsService.createCard(params)
                .then((data) => {
                   $scope.cancel();
                });

              },

              cancel: function() {
                angular.extend($scope, angular.copy(defaultScope));
              },

              create: function() {
                $scope.open = true;
              }
        });
      }, 
      
      templateUrl: baseTmpl

    }
}