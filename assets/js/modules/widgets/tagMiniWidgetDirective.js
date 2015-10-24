export default function() {

  let baseTmpl = 'static/templates/modules/widgets/tag-mini.html';

  return {
      restrict: 'EA',

      scope: {
        tag: '=',
      },
      templateUrl: baseTmpl,

    }
}