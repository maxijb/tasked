export default function() {
	

  return {
      restrict: 'AE',

      controller: ['$scope', 'cardsService', 'boardsService', function($scope, cardsService, boardsService) {

        angular.extend($scope, {
          boardUsers: boardsService.users,
          loading: true,
          updateCard: (field, value) => {
            cardsService.modifyCard($scope.card.id, field, value, true);
          },

          addUserToCard(user) {
            console.log('madedio', arguments, user);
            cardsService.addUserToCard($scope.card, user);
          },

          removeUserFromCard(userId) {
            cardsService.removeUserFromCard($scope.card, userId);
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