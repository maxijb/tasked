export default class {
	
	constructor($scope, loginService) {
		console.log(loginService.identities);
		this.$scope = $scope;

		angular.extend($scope, {
			identities: loginService.identities,
			popup: {},
			kind: "primary",
			text: "MAXIMXI",
			newBoard: {
				name: "",
				user: null,
				popupVisible: false
			}
		});

		$scope.openCreatePopup = function (id, type, event) {

				$scope.newBoard.popupVisible = true;
				$scope.newBoard.type = type;
				//we set the timeout in order to wait for the directive to finish rendering
				setTimeout(function() {
					$scope.newBoard.user = {id: id};
					//add an apply to force refresh
					$scope.$apply();
			    }, 0);

		}

		$scope.closeCreatePopup = function() {
			$scope.newBoard.popupVisible = false;
		}



	}

}