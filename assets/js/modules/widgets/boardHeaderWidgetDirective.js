export default function() {

  let baseTmpl = 'static/templates/modules/widgets/board-header.html';

  return {
      restrict: 'E',
      replace: true,

      controller: ['$scope', '$state', 'boardsService', function($scope, $state, boardsService) {
          angular.extend($scope, {
            boardsService,
            usersPopup: { visible: false },
            tagsPopup: { visible: false }
          })

      }], 
      scope: {
        board: '=',
        users: '='
      },
      templateUrl: baseTmpl,

    }
}