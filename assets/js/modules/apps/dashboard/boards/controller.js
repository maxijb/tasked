export default class {
	
	constructor($scope, loginService) {
		this.$scope = $scope;

		angular.extend($scope, {
			identities: loginService.identities,
			popup: {},
			kind: "primary"
		});


		$scope.openCreatePopup = function (id, event) {

				console.log(id);
				console.log(event);
				console.log(arguments);
		}



	}

}