
export default angular.module('fancyInputs', [])

.directive('fancyRadioButton', require('./fancyRadioButton'))
.directive('autocomplete', require('./autocompleteDirective'))
.filter('specialContent', require('./specialContent'));



