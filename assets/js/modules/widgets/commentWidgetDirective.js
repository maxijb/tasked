export default function() {

  let baseTmpl = 'static/templates/modules/widgets/comment.html';

  return {
      restrict: 'AE',

      controller: ['$scope', 'boardsService', 'cardsService', function($scope, boardsService, cardsService) {
       
          angular.extend($scope, {
            users: boardsService.users,
            delete: function(comment) {
              cardsService.deleteComment($scope.card, $scope.comment);
            },
            updateComment: function(comment, value) {
              cardsService.updateComment($scope.card, comment, value);
            }
          })
        
      }], 
      scope: {
        card: '=',
        comment: '=',
      },
      templateUrl: baseTmpl,

    }
}