export default function() {

  let baseTmpl = 'static/templates/modules/widgets/card.html';

  return {
      restrict: 'E',
      replace: true,

      controller: ['$scope', '$state', 'boardsService', function($scope, $state, boardsService) {
         $scope.boardUsers = boardsService.users;
         $scope.boardTags = boardsService.selectedBoard.tags;
      }], 
      scope: {
        card: '=',
        list: '=',
        clickCard: '&'
      },
      templateUrl: baseTmpl,

    }
}