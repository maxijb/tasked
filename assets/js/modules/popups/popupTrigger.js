export default () => {

  return {
      restrict: 'A',

      controller: function($scope, $timeout) {
        angular.extend($scope.popup, {
           visible: $scope.popup.visible || false,
           hidePopup() { $timeout(function() {
                 $scope.popup.visible = false;
               }) 
            },
           showPopup(e) { 
              e.stopPropagation();
              $scope.popup.visible = true 
           }
        });
      
      }, 

      scope: {
          popup: '=',
      }
    }
}