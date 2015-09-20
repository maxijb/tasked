
export default angular.module('customForms', ['login', require('../boards').name, 'constants'])

.directive('createBoardForm', require('./createBoardDirective'))
.directive('createOrganizationForm', require('./createOrganizationDirective'))
.directive('addUserAutocomplete', require('./addUserAutocompleteDirective'))



 