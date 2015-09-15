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
				userType: null,
				popupVisible: false,
				privacyOptions: [
					{
						value: "private",
						title: "private",
						subtitle: "onlyYouAndInvitedCanSeeThis"
					},
					{
						value: "organization",
						title: "organization",
						subtitle: "onlyYouAndInvitedCanSeeThis"
					},
					{
						value: "public",
						title: "public",
						subtitle: "onlyYouAndInvitedCanSeeThis"
					}
				],
				privacy: "private"
			}
		});

		console.log($scope.identities);
		$scope.openCreatePopup = function (id, type, event) {
				//update identites in case they've changed
				$scope.identities = loginService.identities;	
				filterPrivacyOptionsByUserType(type);
				$scope.newBoard.user = {id: id};
				console.log($scope.newBoard);
				$scope.newBoard.popupVisible = true;



		}



		$scope.closeCreatePopup = function() {
			$scope.newBoard.popupVisible = false;
		}

		$scope.changeNewBoardSelect = function() {
			filterPrivacyOptionsByUserType($scope.newBoard.user.type);
		}


		function filterPrivacyOptionsByUserType() {

		}


	}

}


