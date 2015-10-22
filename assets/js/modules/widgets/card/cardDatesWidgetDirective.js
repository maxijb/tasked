export default function() {

  let baseTmpl = 'static/templates/modules/widgets/card/dates-widget.html';

  return {
      restrict: 'E',
      replace: true,

      controller: ['$scope', '$state', function($scope, $state) {


      }], 
      scope: {
        dates: '=',
        update: '&'
      },
      templateUrl: baseTmpl,

    }
}