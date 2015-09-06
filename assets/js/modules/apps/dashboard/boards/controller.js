export default function($scope, loginService) {
			$scope.firstName = loginService.userFirstName;
			$scope.icon = loginService.userIcon;
		}