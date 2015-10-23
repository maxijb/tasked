export default function() {
	return {
  	  restrict: 'EA',
      scope: {
        user: '=',
        removeButton: '@',
        removeAction: '&',
        clickAction: '&'
      },
      templateUrl: 'static/templates/modules/login/user-icon.html',
      controller: ['$scope', function($scope) {
      	  if (!$scope.user.icon) {
      	  	 let name = $scope.user.name || $scope.user.showName,
      	  	 	 parts = name.split(' ');

      	  	  $scope.initials = parts.length > 1 ? parts[0].substr(0,1) + parts[1].substr(0,1) : parts[0].substr(0,2);
      	  	  $scope.initials = $scope.initials.toUpperCase();
      	  }
      }]
    }	
}