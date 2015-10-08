export default function() {
	

  return {
      restrict: 'AE',

      controller: ['$scope', 'cardsService', function($scope, cardsService) {
        $scope.loading = true;

        cardsService.loadCardActivity($scope.card.id)
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