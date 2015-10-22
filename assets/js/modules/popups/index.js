
export default angular.module('popups', [])

.directive('basicPopup', getBaseButtonDirective.bind(null, 'basic-popup.html'));



function getBaseButtonDirective(tmpl) {
  let baseTmpl = 'static/templates/modules/popups/';

  return {
      restrict: 'AE',
      replace: true,
      transclude: true,

      controller: function($scope) {
        // console.log($scope);
        


        // setTimeout(function() {
        //   console.log($scope)
        // }, 1000);


      }, 
      link: function(scope, element, attrs) {


        if (scope.control) {
          scope.control.position = function() {

            if (!scope.trigger || !scope.position) return;

            let triggerC = scope.trigger.getBoundingClientRect();
            let elementC = element[0].getBoundingClientRect();

            element[0].style.position = "absolute";
            element[0].style.left = (window.pageXOffset + triggerC.left) + 'px';
            element[0].style.top = (window.pageYOffset + triggerC.bottom) + 'px';

          }
        }

        if (scope.closeOuterClick == "true") {
          document.addEventListener('click', handleDocumentClick);

        }

        function handleDocumentClick(e) {
          

        }

      },


      scope: {
          modal: '@',
          trigger: '=',
          position: '@',
          closeButton: '@',
          closeButtonAction: '&',
          closeOuterClick: '@',
          kind: '@',
          control: '='
      },
      templateUrl: baseTmpl + tmpl
    }
}