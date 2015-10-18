
export default angular.module('customForms', ['login', require('../boards').name, 'constants'])

.directive('createBoardForm', require('./createBoardDirective'))
.directive('createOrganizationForm', require('./createOrganizationDirective'))
.directive('addUserAutocomplete', require('./addUserAutocompleteDirective'))
.directive('addBoardUserAutocomplete', require('./addBoardUserAutocompleteDirective'))
.directive('createListForm', require('./createListDirective'))
.directive('createCardForm', require('./createCardDirective'))
.directive('editableElement', require('./editableElementDirective'))
.directive('editableElementOnPlace', require('./editableElementOnPlaceDirective'))
.directive('createCommentForm', require('./createCommentDirective'))



 