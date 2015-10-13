export default function() {
	

  return {
      restrict: 'AE',

      controller: ['$scope', 'cardsService', function($scope, cardsService) {

        angular.extend($scope, {
          loading: true,
          updateCard: (field, value) => {
            cardsService.modifyCard($scope.card.id, field, value, true);
          }
          
        })

        $scope.card.activity = {};

        //Load card activity
        cardsService.selectCard($scope.card)
        .then((content) => {
            $scope.card.history = content.history;
            $scope.card.comments = content.comments;
            $scope.loading = false;
        })
      }], 

      scope: {
          modal: '@',
          card: '=',
          list: '=',
          unselect: '&'
      },
      templateUrl: 'static/templates/apps/card/cardApp.html'
  }
}