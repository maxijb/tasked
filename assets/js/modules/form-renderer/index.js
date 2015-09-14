
export default angular.module('form-renderer', [])

.directive('form', getBaseButtonDirective.bind(null, 'form.html'));



function getBaseButtonDirective(tmpl) {
  let baseTmpl = 'static/templates/modules/popups/';

  return {
      restrict: 'AE',
      replace: true,
      transclude: true,
      scope: {
          modal: '@',
          closeButton: '@',
          kind: '@',
          params: '='
      },
      templateUrl: baseTmpl + tmpl
    }
}