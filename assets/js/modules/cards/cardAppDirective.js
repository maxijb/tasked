export default function() {
	

  return {
      restrict: 'AE',

      controller: ['$scope', 'cardsService', 'boardsService', function($scope, cardsService, boardsService) {

        angular.extend($scope, {
          //board
          boardUsers: boardsService.users,
          boardTags: boardsService.selectedBoard.tags,
          boardStates: boardsService.selectedBoard.states,
          //cards
          cardsService,
          boardsService,
          updateCard: (field, value) => {
            cardsService.modifyCard($scope.card.id, field, value, true);
          },
          //tags
          tagsPopup: {},
          statePopup: {},
          loading: true,

          cardActions: {
            
            addChecklist() {

            },

            removeChecklist(checklist) {

            },


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