export default function() {

  return {
      restrict: 'AC',
      scope: {
        callbacks: '='
      },
      link: function(scope, element, attrs) {

          let timeout           = null,
              timeoutToStart    = 200,
              dragId            = attrs.dragngId || "",
              $doc              = $(document),
              $placeholder      = $(`<div data-dragng="placeholder" class="dragng-placeholder" style="background:red; height: 50px;" data-dragng-id="${dragId}" ></div>`),
              placeholderOnBody = false,
              $body             = $('body'),
              dragIdCondition   = !!dragId ? `[data-dragng-id=${dragId}]`: "",
              horizontal        = attrs.hasOwnProperty('horizontal'),
              handler           = { width: 0, height: 0 },
              start,
              $copy,
              pointerEvents     = (function(){
                                      var element = document.createElement('x'),
                                          documentElement = document.documentElement,
                                          getComputedStyle = window.getComputedStyle,
                                          supports;
                                      if(!('pointerEvents' in element.style)){
                                          return false;
                                      }
                                      element.style.pointerEvents = 'auto';
                                      element.style.pointerEvents = 'x';
                                      documentElement.appendChild(element);
                                      supports = getComputedStyle && 
                                          getComputedStyle(element, '').pointerEvents === 'auto';
                                      documentElement.removeChild(element);
                                      return !!supports;
                                  })();
          



          //set default object to avoid errors on empty callbacks
          if (!scope.callbacks) scope.callbacks = {};
          
          /////////////////////////////////////////////////
          // TODO how to fix this
          $placeholder.css("display", horizontal ? "inline-block" : "block");
          ///////////////////////////////////////////////////
          ////////////////////////////////////////////////


          //delegate event to start drag
          element.on('mousedown', '[data-dragng=item]', function(e) {

             //get the orignial event
             let $orig = $(e.target).closest('[data-dragng=item]');
             
             //if we have an id for the d&d, but the item doenst have then we should ignore this event
             //this may happen when we have nested elements which are both sortable
             if (dragIdCondition && !$orig.is(dragIdCondition)) {
                return;
             } 

             //if we have to handle this event, dont want anyone else doing it at the same time
              //additional behaviour can be set on the callbacks
              e.stopPropagation();

            //disallow text selection
            $('body').addClass('noselect');

            //drag should start after a few milliseconds
            timeout = setTimeout(() => { startDrag(e, $orig) }, timeoutToStart);

            //can be cancelled before it starts
            $doc.one('mouseup.dragngTimeout', cancelTimeout);
            $doc.one('mouseleave.dragngTimeout', cancelTimeout);

          });




          /* Start drag action after timeout */
          function startDrag(e, $orig) {
             
             //cancel timeout and its events
             cancelTimeout(true);

              //save start item
              start = {
                position: $orig.index(),
                targetId: $orig.closest('[data-dragng=target]'+dragIdCondition).attr('data-id')
              };

             //clone the element to create the handler
             $copy = $orig.clone()
                      .addClass('drag-ng-copy')
                      .width($orig.width())
                      .height($orig.height());

              
              //cache handler size into variables
              handler.height = $copy.outerHeight();
              handler.width = $copy.outerWidth();
              positionHandler($copy, e, handler);


             
             //give placeholder the same size of orginial element
             if (horizontal) {
                $placeholder.width($orig.outerWidth());
             }
             $placeholder.height($orig.outerHeight())
                .css('margin', $orig.css('margin'))
                .insertBefore($orig);

              //call callback if availble
              typeof scope.callbacks.drag === "function" && scope.callbacks.drag(start);

             //add the copy to the body
             $doc.find('body').append($copy);
             
             //set events to kill the drag
             $doc.one('mouseup.dragng', function() {
               
                //placeholder is active
                if (placeholderOnBody) {

                    //gather data about the start and end position
                    let send = { 
                      start: start,
                      end: {
                        position: $placeholder.index(),
                        targetId: $placeholder.closest('[data-dragng=target]'+dragIdCondition).attr('data-id')
                      }
                    };

                    //if start and end in the same list and the original position
                    //is lower than the current position, end.position minus one
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
             .on('mousemove.dragng', (e) => {

                //move the copy with the mouse              
                positionHandler($copy, e, handler);
                
                //find the closest element drag related
                let $ref = $(e.target).closest('[data-dragng]'+dragIdCondition),
                    type = $ref.attr('data-dragng');

                //if exists
                if (type) {

                    //exit if placeholder
                    if (type == "placeholder") {
                      return;
                    }

                    //placehorlder will be visible
                    placeholderOnBody = true;

                    //place depending of the elemetn type
                    if (type == 'item') {
                      
                      //if an item place on top/bottom
                      let midPoint  = $ref.offset()[horizontal ? "left" : "top"] + $ref[horizontal ? "width" : "height"]() / 2;
                      let mousePosition = horizontal ? e.pageX : e.pageY;
                      //placeholder before of after the item
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

          };
          


          ///////////////////// FUNCTIONS ////////////////

          /* function called to kill the timeout previous to a drag and drop */
          function cancelTimeout(isDragging) {
            clearTimeout(timeout);
            $doc.off('mouseup.dragngTimeout')
                .off('mouseleave.dragngTimeout');
              if (!isDragging) {
                $('body').removeClass('noselect');
              }
          }


          /* Positions the handler according to wheter the pointerEvents are enabled */
          function positionHandler($copy, e, handlerData) {
             let top  = pointerEvents ? e.pageY - handlerData.height / 2 : e.pageY + 15,
                 left = pointerEvents ? e.pageX - handlerData.width / 2 : e.pageX + 15;
              return $copy.css({top, left});
          }

          /* Finishes drag session */
          function endDrag() {
                //call function to finish drag
                typeof scope.callbacks.endDrag === "function" && scope.callbacks.endDrag(start);
                $doc.off('mousemove.dragng')
                    .off('mouseleave.dragng')
                    .off('mouseup.dragng')
                    .find('body')
                    .removeClass('noselect');


                //remove copied element
                $placeholder.remove();
                $copy.remove();
          }


      }
    }
}