export default function() {

  let baseTmpl = 'static/templates/modules/custom-forms/create-comment-form.html';

  return {
      restrict: 'AE',
      scope: {
        card: '='
      },
      controller: function($scope, loginService, cardsService) {
       
        let defaultScope = {
            comment: { text: "" }
        };


        angular.extend($scope, 
            defaultScope, 
            {
            user: loginService.userObject,
            create: function() {
              $scope.loading = true;
              cardsService.createComment($scope.card, $scope.comment);
              $scope.comment = { text: "" };    
            }
        });
      }, 
      
      templateUrl: baseTmpl

    }
}