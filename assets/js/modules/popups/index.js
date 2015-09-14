
export default angular.module('popups', [])

.directive('basicPopup', getBaseButtonDirective.bind(null, 'basic-popup.html'));



function getBaseButtonDirective(tmpl) {
  let baseTmpl = 'static/templates/modules/popups/';

  return {
      restrict: 'AE',
      replace: true,
      transclude: true,

      controller: function($scope) {
        console.log($scope);
      }, 
      scope: {
          modal: '@',
          closeButton: '@',
          closeButtonAction: '&',
          kind: '@',
          params: '='
      },
      templateUrl: baseTmpl + tmpl
    }
}