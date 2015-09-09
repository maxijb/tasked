export default class {
	
	constructor($scope, loginService) {
		this.$scope = $scope;

		angular.extend($scope, {
			identities: loginService.identities,
			popup: {},
			kind: "primary"
		});


		$scope.openCreatePopup = r;


		function r($event, data) {

				console.log($event, data);
		}



	}

}