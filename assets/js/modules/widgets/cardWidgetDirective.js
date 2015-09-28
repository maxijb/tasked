export default function() {

  let baseTmpl = 'static/templates/modules/widgets/card.html';

  return {
      restrict: 'AE',
      replace: true,

      controller: function($scope) {
       
        
      }, 
      scope: {
        card: '=',
        dragngCallback: '&'
      },
      templateUrl: baseTmpl,

    }
}