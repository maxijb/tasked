export default function() {

  let baseTmpl = 'static/templates/modules/widgets/card/manage-users-widget.html';

  return {
      restrict: 'E',
      replace: true,

      controller: ['$scope', '$state', function($scope, $state) {
          angular.extend($scope, {
            popup: {
              visible: false
            },

            showPopup() {
               $scope.popup.visible = true;
            },
            hidePopup() {
               $scope.popup.visible = false;
            },




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