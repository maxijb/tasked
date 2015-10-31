export default function() {

  let baseTmpl = 'static/templates/modules/widgets/card/card-state-widget.html';

  return {
      restrict: 'E',

      controller: ['$scope', function($scope) {
          angular.extend($scope, {
            popup: {},
            state: $scope.state || {id: "pending"},
            selectState(state) {
              $scope.state = state;
              $scope.popup.hidePopup();
              $scope.updateAction({state: state});
            },
          })

      }], 
      scope: {
        //selected
        state: '=',
        //board states
        states: '=',
        //when selected
        updateAction: '&'
      },
      templateUrl: baseTmpl,

    }
}