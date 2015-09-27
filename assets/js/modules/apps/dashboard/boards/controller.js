export default class {
	
	constructor($scope, $rootScope, loginService, boardsService, defaultIcons) {
		this.$scope = $scope;
		this.$rootScope = $rootScope;

		angular.extend($scope, {
			defaultIcons,
			identities: loginService.identities || [],
			boards: boardsService.boards || [],
			newBoardPopup: {
				visible: false,
				id: null,
				control: {},
				
				//hadle create popup
				openCreatePopup: function (user, event) {
						angular.extend($scope.newBoardPopup, {
							visible: true,
							user: user,
							trigger: event.target
						});

						//Control position delegated by directive
						setTimeout(() => {
							$scope.newBoardPopup.control.position();
						}, 0);
				},
				closeCreatePopup: function() {
					$scope.newBoardPopup.visible = false;
				}
			},

			newOrganizationPopup: {
				visible: false,
				openCreatePopup: function() {
					$scope.newOrganizationPopup.visible = true;
				},
				closeCreatePopup: function() {
					$scope.newOrganizationPopup.visible = false;
				}
			}
		});
		



		//Handling boards by user
		$scope.boardsByUser = this.generateBoardsByUser();
		//and after update
		this.$rootScope.$on("BOARDS-update", (event, boards) => {
			$scope.boards = typeof boards == "object" ? boards || [] : [];
			$scope.boardsByUser = this.generateBoardsByUser();
		});

		//when organization is created
		this.$rootScope.$on("USER-update-organizations", () => {
			$scope.identities = loginService.identities;
			$scope.boardsByUser = this.generateBoardsByUser();
		});
		


	}

	//maps boards by user
	generateBoardsByUser() {
		return this.$scope.identities.map((identity) => {
			let obj = { identity: identity, boards: []};
			this.$scope.boards.map((board) => {
				for (let i in board.users) 
					if (board.users[i].id == identity.id)
						obj.boards.push(board);
			});
			return obj;
		});
	}

}


