export default function() {

  let baseTmpl = 'static/templates/modules/widgets/card/time-ellapsed-widget.html';

  return {
      restrict: 'E',
      replace: true,

      controller: ['$scope', '$state', function($scope, $state) {


      }], 
      scope: {
        ellapsed: '=',
        update: '&'
      },
      templateUrl: baseTmpl,

    }
}