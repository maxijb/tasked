export default class {
	
	constructor($scope, loginService) {
		this.$scope = $scope;

		angular.extend($scope, {
			identities: loginService.identities,
			newBoardPopup: {
				visible: false,
				id: null
			}
		});

		$scope.openCreatePopup = function (user, event) {
				$scope.newBoardPopup = {
					visible: true,
					user: user
				};
		}



		$scope.closeCreatePopup = function() {
			$scope.newBoardPopup.visible = false;
		}

		




	}

}


