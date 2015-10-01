export default function() {

  let baseTmpl = 'static/templates/modules/widgets/card.html';

  return {
      restrict: 'AE',
      replace: true,

      controller: function($scope) {
          $scope.si = function(si) {
            alert(si);
            alert('no');
          }
        
      }, 
      scope: {
        card: '=',
      },
      templateUrl: baseTmpl,

    }
}