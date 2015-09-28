export default function() {

  return {
      restrict: 'AC',
      link: function(scope, element, attrs) {
          console.log(scope);
          let timeout           = null,
              startDrag         = false,
              $doc              = $(document),
              $placeholder      = $('<div data-dragng="placeholder" class="dragng-placeholder" style="background:red; height: 50px;"></div>'),
              placeholderOnBody = false,
              $body             = $('body'),
              $copy;

              window.element = element;

           setTimeout(function() {
            console.log( $(element).find('[data-dragng=item]'));
            element.on('[data-dragng=item]', 'mousedown', function(e) {
              console.log('1119999');
            });
          }, 3000);

          element.on('[data-dragng=item]', 'mousedown', function(e) {
              console.log('9999');
             //clone the element
             $copy = $(e.target).clone().css({position:'fixed', top: e.pageY + 15, left: e.pageX + 15});
             //add the copy to the body
             $doc.find('body').append($copy);
             //set events to kill the drag
             $doc.one('mouseup', function() {
                if (placeholderOnBody) {
                  $placeholder.after(e.target).remove();
                  placeholderOnBody = false;
                }
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

                    if (type == "placeholder") return;

                    let midPoint  = $ref.offset().top + $ref.height() / 2,
                        isNext = e.pageY > midPoint ? 1 : 0;

                    placeholderOnBody = true;

                    if (type == 'item') {
                      $ref[isNext ? 'after' : 'before']($placeholder);
                    } else if(type == 'target') {
                      $ref[isNext ? 'append' : 'prepend']($placeholder);
                    } else if(type == 'parent') {
                      $ref.find('[data-dragng=target]')[isNext ? 'append' : 'prepend']($placeholder);
                    }

                } else if(placeholderOnBody) {
                  //ig there is no drag realted parent and the placeholder is visible
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