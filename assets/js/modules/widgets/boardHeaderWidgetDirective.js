export default function() {

  let baseTmpl = 'static/templates/modules/widgets/board-header.html';

  return {
      restrict: 'E',
      replace: true,

      controller: ['$scope', '$state', function($scope, $state) {
          angular.extend($scope, {
            usersPopup: {
              visible: false
            }
          })

      }], 
      scope: {
        board: '=',
        users: '='
      },
      templateUrl: baseTmpl,

    }
}