
export default angular.module('customForms', ['login', require('../boards').name, 'constants'])

.directive('createBoardForm', require('./createBoardDirective'))
.directive('createOrganizationForm', require('./createOrganizationDirective'))
.directive('addUserAutocomplete', require('./addUserAutocompleteDirective'))
.directive('createListForm', require('./createListDirective'))
.directive('createCardForm', require('./createCardDirective'))
.directive('editableElement', require('./editableElementDirective'))
.directive('createCommentForm', require('./createCommentDirective'))



 