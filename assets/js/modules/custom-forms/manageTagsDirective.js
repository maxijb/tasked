export default function() {

  let baseTmpl = 'static/templates/modules/custom-forms/manage-tags-form.html';

  return {
      restrict: 'AE',

      controller: function($scope, $attrs, loginService) {
       

        
        angular.extend($scope, {
           edit: !$attrs.hasOwnProperty('selectable'),
           editable: $attrs.hasOwnProperty('editable'),
           startEditing(event) {
            event.stopPropagation();
             $scope.edit = true;
           },
           endEditing(event) {
            event.stopPropagation();
             $scope.edit = false;
           },

            hasChanged(tag, index) {
              console.log(tag, index);
              $scope.update({tag, index});
            },

            evalSelect(tag, index) {
               if (!$scope.edit) {
                 $scope.select({tag, index});
               }
            }
        });
        console.log('se',$scope.selectedTags);


      }, 
      scope: {
        tags: '=',
        cancel: '&',
        update: '&',
        select: '&',
        selectedTags: '='
      },
      templateUrl: baseTmpl,

    }
}