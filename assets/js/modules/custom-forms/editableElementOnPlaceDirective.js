export default function() {
  return {
      restrict: 'AC',

      link: function(scope, element, attrs) {
          if (attrs.submitonenter) {
            element.on('keydown', (e) => {
               if (e.keyCode == 13) {
                  e.preventDefault();
                  scope.update({value: element[0].value})
               }
            })
          } 


          if (attrs.submitonblur) {
            element.on('blur', (e) => {
                  scope.update({value: element[0].value})
            })
          }


      },
      scope: {
        field: '=',
        update: '&'
      }

    }
}