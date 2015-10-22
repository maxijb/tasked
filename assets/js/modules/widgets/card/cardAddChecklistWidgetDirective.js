export default function() {

  let baseTmpl = 'static/templates/modules/widgets/card/add-checklist-widget.html';

  return {
      restrict: 'E',
      replace: true,

      controller: ['$scope', '$state', function($scope, $state) {


      }], 
      scope: {
        card: '=',
        update: '&'
      },
      templateUrl: baseTmpl,

    }
}