export default function() {

  return {
      restrict: 'AC',
      scope: {
        callbacks: '='
      },
      link: function(scope, element, attrs) {

          let timeout           = null,
              startDrag         = false,
              $doc              = $(document),
              $placeholder      = $('<div data-dragng="placeholder" class="dragng-placeholder" style="background:red; height: 50px;"></div>'),
              placeholderOnBody = false,
              $body             = $('body'),
              $copy;

          element.on('mousedown', '[data-dragng=item]', function(e) {
             let $orig = $(e.target).closest('[data-dragng=item]'),
                  start = {
                    position: $orig.index(),
                    listId: $orig.closest('[data-dragng=target]').attr('data-id')
                  };



             //clone the element
             $copy = $orig.clone().css({position:'fixed', top: e.pageY + 15, left: e.pageX + 15});
             //add the copy to the body
             $doc.find('body').append($copy);
             
             //set events to kill the drag
             $doc.one('mouseup', function() {
               
                //placeholder is active
                if (placeholderOnBody) {

                    //place the element after the placheolder and remove it
                    $placeholder.after($orig).remove();
                    //mark as not actie
                    placeholderOnBody = false;
                    
                    //call function to drop
                    scope.callbacks.drop({
                      start: start,
                      element: $orig,
                      end: {
                        position: $orig.index(),
                        listId: $orig.closest('[data-dragng=target]').attr('data-id')
                      }
                    });

                }
                
                //fnisshes drag
                endDrag();
             })
             .one('mouseleave', endDrag)
             //mousemove 
             .on('mousemove.dragng', (e) => {

                //move the copy with the mouse              
                $copy.css({top: e.clientY + 15, left: e.clientX + 15});
                
                //find the closest element drag related
                let $ref = $(e.target).closest('[data-dragng]'),
                    type = $ref.attr('data-dragng');

                //if exists
                if (type) {

                    //exit if placeholder
                    if (type == "placeholder") return;

                    //define if on top or on the bottom
                    let midPoint  = $ref.offset().top + $ref.height() / 2,
                        isNext = e.pageY > midPoint ? 1 : 0;

                    //placehorlder will be visible
                    placeholderOnBody = true;

                    //place depending of the elemetn type
                    if (type == 'item') {
                      $ref[isNext ? 'after' : 'before']($placeholder);
                    } else if(type == 'target') {
                      $ref[isNext ? 'append' : 'prepend']($placeholder);
                    } else if(type == 'parent') {
                      $ref.find('[data-dragng=target]')[isNext ? 'append' : 'prepend']($placeholder);
                    }

                } else if(placeholderOnBody) {
                  //if there is no drag realted parent and the placeholder is visible
                  placeholderOnBody = false;
                  $placeholder.remove();
                
                }

             });


             function endDrag() {
                $doc.off('mousemove.dragng');
                $copy.remove();
             }


          });
          


      }
    }
}