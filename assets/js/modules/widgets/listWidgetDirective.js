export default function() {

  let baseTmpl = 'static/templates/modules/widgets/list.html';

  return {
      restrict: 'AE',
      replace: true,

      controller: function($scope) {
       
        
      }, 
      scope: {
        list: '=',
        clickCard: '&'
      },
      templateUrl: baseTmpl,

    }
}