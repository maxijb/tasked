
export default angular.module('fancyInputs', [])

.directive('fancyRadioButton', getBaseButtonDirective.bind(null, 'fancy-radio-button.html'));



function getBaseButtonDirective(tmpl) {
  let baseTmpl = 'static/templates/modules/fancy-inputs/';

  return {
      restrict: 'AE',
      replace: true,
      transclude: true,

      controller: function($scope) {
        
        this.selectStatus = function(item) {
          $scope.options.map((x) => x.selected = false);
          item.selected = true;
            console.log(item);
            console.log($scope.options);
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