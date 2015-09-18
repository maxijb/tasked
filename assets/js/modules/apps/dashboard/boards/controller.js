export default class {
	
	constructor($scope, $rootScope, loginService, boardsService) {
		this.$scope = $scope;
		this.$rootScope = $rootScope;

		angular.extend($scope, {
			identities: loginService.identities,
			boards: boardsService.boards,
			newBoardPopup: {
				visible: false,
				id: null
			},


		});
		

		//hadle create popup
		$scope.openCreatePopup = function (user, event) {
				$scope.newBoardPopup = {
					visible: true,
					user: user
				};
		}
		$scope.closeCreatePopup = function() {
			$scope.newBoardPopup.visible = false;
		}


		//Handling boards by user
		$scope.boardsByUser = this.generateBoardsByUser();
		//and after update
		this.$rootScope.$on("BOARDS-update", (event, boards) => {
			$scope.boards = boards;
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


