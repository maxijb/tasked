export default function() {

  return {
      restrict: 'AC',

      link: function(scope, element, attrs) {

        let initialHeight = isNaN(attrs.height) ? 0 : parseInt(attrs.height, 10) || 0;
        setTimeout(resize, 0);

        element.on('keyup', resize);

        function resize(e) {
          console.log('resize');
          element[0].style.height = "1px";
          element[0].style.height = (initialHeight + element[0].scrollHeight) + "px";
        }

      }, 

    }
}