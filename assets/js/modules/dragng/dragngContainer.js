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
              start,
              $copy;

          element.on('mousedown', '[data-dragng=item]', function(e) {
             let $orig = $(e.target).closest('[data-dragng=item]');

                  start = {
                    position: $orig.index(),
                    listId: $orig.closest('[data-dragng=target]').attr('data-id')
                  };

                  typeof scope.callbacks.drag === "function" && scope.callbacks.drag(start);

             //clone the element
             $copy = $orig.clone()
                      .css({position:'fixed', top: e.pageY + 15, left: e.pageX + 15})
                      .width($orig.width())
                      .height($orig.height());
                      
             $placeholder.height($orig.outerHeight());
             //add the copy to the body
             $doc.find('body').append($copy);
             
             //set events to kill the drag
             $doc.one('mouseup.dragng', function() {
               
                //placeholder is active
                if (placeholderOnBody) {

                    let send = { 
                      start: start,
                      end: {
                        position: $placeholder.index(),
                        listId: $placeholder.closest('[data-dragng=target]').attr('data-id')
                      }
                    };

                    if (send.start.listId == send.end.listId && send.start.position < send.end.position) {
                      send.end.position--;
                    }

                    //remove the placheolder 
                    $placeholder.remove();
                    //mark as not actie
                    placeholderOnBody = false;

                    //fnisshes drag
                    endDrag();
                    
                    //call function to drag
                    typeof scope.callbacks.drop === "function" && scope.callbacks.drop(send);

                } else {
                  //fnisshes drag
                  endDrag();
                  
                }
                
             })
             .one('mouseleave.dragng', endDrag)
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
              //call function to drag
              typeof scope.callbacks.endDrag === "function" && scope.callbacks.endDrag(start);
                $doc.off('mousemove.dragng');
                $doc.off('mouseleave.dragng');
                $doc.off('mouseup.dragng');
                $copy.remove();
             }


          });
          


      }
    }
}