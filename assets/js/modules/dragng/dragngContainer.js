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
              dragId            = attrs.dragngId,
              dragIdCondition   = !!dragId ? `[data-dragng-id=${dragId}]`: "",
              horizontal        = attrs.hasOwnProperty('horizontal'),
              start,
              $copy;
          
          //set default object to avoid errors on empty callbacks
          if (!scope.callbacks) scope.callbacks = {};
          
          /////////////////////////////////////////////////
          // TODO how to fix this
          if (horizontal) $placeholder.css("float", "left");
          ///////////////////////////////////////////////////
          ////////////////////////////////////////////////



          element.on('mousedown', '[data-dragng=item]', function(e) {
             let $orig = $(e.target).closest('[data-dragng=item]');

             //if we have an id for the d&d, but the item doenst have then we should ignore this event
             //this may happen when we have nested elements which are both sortable
             if (dragIdCondition && !$orig.is(dragIdCondition)) {
                console.log("cancelo" + dragId);
                return;
             } 
              

              e.stopPropagation();
              $('body').addClass('noselect');

              start = {
                position: $orig.index(),
                targetId: $orig.closest('[data-dragng=target]'+dragIdCondition).attr('data-id')
              };

              typeof scope.callbacks.drag === "function" && scope.callbacks.drag(start);

             //clone the element
             $copy = $orig.clone()
                      .css({position:'fixed', top: e.pageY + 15, left: e.pageX + 15})
                      .width($orig.width())
                      .height($orig.height());
                      
             
             //give placeholder the same size of orginial element
             $placeholder.height($orig.outerHeight());
             if (horizontal) {
                $placeholder.width($orig.outerWidth());
             }


             //add the copy to the body
             console.log("agrego" + dragId);
             $doc.find('body').append($copy);
             
             //set events to kill the drag
             $doc.one('mouseup.dragng', function() {
               
                //placeholder is active
                if (placeholderOnBody) {

                    let send = { 
                      start: start,
                      end: {
                        position: $placeholder.index(),
                        targetId: $placeholder.closest('[data-dragng=target]'+dragIdCondition).attr('data-id')
                      }
                    };

                    if (send.start.targetId == send.end.targetId && send.start.position < send.end.position) {
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
                let $ref = $(e.target).closest('[data-dragng]'+dragIdCondition),
                    type = $ref.attr('data-dragng');

                //if exists
                if (type) {

                    //exit if placeholder
                    if (type == "placeholder") return;

                    //placehorlder will be visible
                    placeholderOnBody = true;

                    

                    //place depending of the elemetn type
                    if (type == 'item') {
                      
                      //if an item place on top/bottom
                      let midPoint  = $ref.offset()[horizontal ? "left" : "top"] + $ref[horizontal ? "width" : "height"]() / 2;
                      let mousePosition = horizontal ? e.pageX : e.pageY;
                      $ref[mousePosition > midPoint ? 'after' : 'before']($placeholder);

                    } else {
                      
                      //items in this parent
                      let $items  = $ref.find("[data-dragng=item]"+dragIdCondition),
                          //index previous which we should place the placeholder
                          index,
                          coordToCheck = horizontal ? "left": "top",
                          mousePosition = horizontal ? e.pageX : e.pageY;

                      //check which element is before our placeholder 
                      for (let i = 0; i <= $items.length; i++) {
                        index = i;
                        //if the position of this item is greater than out muse event
                        //then this is the index we need
                        if ($items[i] && $($items[i]).offset()[coordToCheck] > mousePosition) {
                          break;
                        }
                      }

                      //if last, append to the list. 
                      // This will trigger also if the list is empty: index == items.length == 0
                      if (index == $items.length) {
                        let $list = type == "parent" ? $ref.find("[data-dragng=target]"+dragIdCondition).first() : $ref;
                        $list.append($placeholder);  
                      } else {
                        //else put it before the selected one
                        $($items[index]).before($placeholder);
                      }
                    }

                //if there is no drag realted parent and the placeholder is visible
                } else if(placeholderOnBody) {
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