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

        cardsService.selectCard($scope.card)
        .then((content) => {
            $scope.content = content;
            $scope.loading = false;
        })
      }], 

      scope: {
          modal: '@',
          card: '=',
          list: '=',
          unselectCard: '&'
      },
      templateUrl: 'static/templates/apps/card/cardApp.html'
  }
}