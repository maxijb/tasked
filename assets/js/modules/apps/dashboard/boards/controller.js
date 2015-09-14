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

		console.log($scope.identities);
		$scope.openCreatePopup = function (id, type, event) {

				console.log(id);
				console.log(type);
				console.log(event);
				console.log(arguments);
				$scope.newBoard.type = type;
				$scope.newBoard.user = {id: id};
				console.log($scope.newBoard);
				$scope.newBoard.popupVisible = true;

		}

		$scope.closeCreatePopup = function() {
			$scope.newBoard.popupVisible = false;
		}



	}

}