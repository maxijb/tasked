export default ['isChild', function(isChild) {
  let baseTmpl = 'static/templates/modules/popups/basic-popup.html';



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

        scope.arrow = scope.$eval(attrs.arrow);
        console.log(scope.arrow);

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
          setTimeout(() => {
            document.addEventListener('click', handleDocumentClick);
          }, 0)
        }

        function handleDocumentClick(e) {
           if (!isChild(e.target, element[0])) {
              scope.closeButtonOwnAction();
           };
        }

        scope.closeButtonOwnAction = () => {
              document.removeEventListener('click', handleDocumentClick);
              scope.closeButtonAction();
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
      templateUrl: baseTmpl
    }
}]