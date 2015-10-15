export default function() {

  return {
      restrict: 'AE',
      replace: true,

      controller: ['$scope', function($scope) {
        
        $scope.results = [];
        $scope.active = null;

        $scope.handleFocus = function() {
          $scope.listVisible = true;
        }
        $scope.handleBlur = function($event) {
          //must wait until the click has been processed if click on the list
          setTimeout(() => {
            $scope.listVisible = false;
          }, 0);
        }
        $scope.handleKeyUp = function($event) {
          switch($event.keyCode) {
            case 40:
              offsetActive(1);
              break;
            case 38: 
              offsetActive(-1);
              break;
            case 13:
              try {
                $scope.selectItem($scope.results[$scope.active])
                break;
              } catch(e) { break; }
            default:
              $scope.findResults();
          }
        }

        /* Check in the source for results */
        $scope.findResults = function() {
           if ($scope.search) {
               if ($scope.source.type == 'promise') {
                  
                  $scope.loading = true;
                  $scope.source.method($scope.search, $scope.limit)
                  .then((response) => {
                    $scope.loading = false;
                    $scope.results = response;
                    $scope.active = 0;
                  })
                } else if ($scope.source.type == 'function') {
                    $scope.results = $scope.source.method($scope.search, $scope.limit);
                    $scope.active = 0;
               }
           } else {
            $scope.results = [];
           }
        }

        /* Select item with ENTER or mouse */
        $scope.selectItem = function(item) {
          //TODO: Check waht happens with optional parameters for $scope.target and $scope.callback
          if (typeof $scope.target == "object") {
            
            if (Array.isArray($scope.target)) {
              $scope.target.push(item);
            } else {
              $scope.target.selected = item;
            }
          
          }

          if ($scope.callback && typeof $scope.callback == "function") {
            $scope.callback({item: item})
          
          } 

          $scope.results = [];
          $scope.active = null;
          $scope.search = "";
        }


        /* Navigate throug selected options with arrow keys */
        function offsetActive(delta) {
          if ($scope.active == null) {
            $scope.active = delta > 0 ? 0 : $scope.results.length - 1;
          } else {
            
            let temp = $scope.active + delta;
            if (temp < 0) temp = $scope.results.length - 1;
            else if (temp >= $scope.results.length) temp = 0;

            $scope.active = temp;
          }
        }



      }], 
      scope: {
          options: '=',
          callback: '&',
          source: '=',
          placeholder: '@',
          limit: '@',
          defaultIcon: '@',
          target: '='
      },
      templateUrl: 'static/templates/modules/fancy-inputs/autocomplete.html'

    }
}