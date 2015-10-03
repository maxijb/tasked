export default function() {

  let baseTmpl = 'static/templates/modules/widgets/card.html';

  return {
      restrict: 'AE',
      replace: true,

      controller: ['$scope', '$state', function($scope, $state) {


      }], 
      scope: {
        card: '=',
        list: '=',
        clickCard: '&'
      },
      templateUrl: baseTmpl,

    }
}