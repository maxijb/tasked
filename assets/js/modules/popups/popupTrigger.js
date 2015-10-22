export default () => {

  return {
      restrict: 'A',

      controller: function($scope, $timeout) {
        
        angular.extend($scope.popup, {
           hidePopup() { $timeout(function() {
                 $scope.popup.visible = false;
               }) 
            },
           showPopup() { $scope.popup.visible = true }
        });
      
      }, 

      scope: {
          popup: '=',
      }
    }
}