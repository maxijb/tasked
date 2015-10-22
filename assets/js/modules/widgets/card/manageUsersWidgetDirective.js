export default function($timeout) {

  let baseTmpl = 'static/templates/modules/widgets/card/manage-users-widget.html';

  return {
      restrict: 'E',
      replace: true,

      controller: ['$scope', '$state', function($scope, $state) {
          angular.extend($scope, {
            popup: {
              visible: false
            }
          })

      }], 
      scope: {
        users: '=',
        boardUsers: '=',
        addAction: '&',
        removeAction: '&'
      },
      templateUrl: baseTmpl,

    }
}