
export default angular.module('fancyInputs', [])

.directive('fancyRadioButton', getBaseButtonDirective.bind(null, 'fancy-radio-button.html'));



function getBaseButtonDirective(tmpl) {
  let baseTmpl = 'static/templates/modules/fancy-inputs/';

  return {
      restrict: 'AE',
      replace: true,
      transclude: true,

      controller: function($scope) {
        
        this.selectStatus = function(status) {
            console.log(status);
        }

      }, 
      controllerAs: "frbctrl",
      scope: {
          options: '=',
          selected: "="
      },
      templateUrl: baseTmpl + tmpl,

    }
}