// export default class {

//   constructor($scope, $rootScope, loginService) {

export default function($rootScope, $scope, $state, $stateParams, loginService, boardsService) {

	this.$scope = $scope;
	this.boardsService = boardsService;

	if (!loginService.userId || !$stateParams.id) {
		$state.go('index');
	} 

	angular.extend($scope, {

		//data from the selected board
		board: {
			id: $stateParams.id,
			name: $stateParams.name,
			
		},

		//stores lists order and details
		lists: { order: [], details: {}},
		callbacksCard: {
			drag: function(start) {
				$scope.$apply(() => {
					$scope.lists.details[start.targetId].cards[start.position].dragged = true;
				});
			},

			endDrag: function(start) {
				$scope.$apply(() => {
					$scope.lists.details[start.targetId].cards[start.position].dragged = false;
				});
			},

			drop: function(drop) {
				console.log(drop);
				boardsService.moveCard(drop);
			}
		},

		callbacksList: {
			drag: function(start) {
				console.log(start);
				let id = $scope.lists.order[start.position];
				$scope.$apply(() => {
					$scope.lists.details[id].dragged = true;
				});
			},

			endDrag: function(start) {
				console.log(start);
				let id = $scope.lists.order[start.position];
				$scope.$apply(() => {
					$scope.lists.details[id].dragged = false;
				});
			},

			drop: function(drop) {
				console.log(drop);
				boardsService.moveList(drop);
			}	
		}
	});

	console.log($scope);

	//select board on service
	boardsService.selectBoard(angular.copy($scope.board));
	//handle list update
	$rootScope.$on("LISTS-update", updateLists.bind(this));

}

function updateLists(event, lists) {
	this.$scope.lists = lists || this.boardsService.lists;
	console.log("claro", this.$scope.lists);
	setTimeout(() => {
	this.$scope.$apply();

	}, 0)
}

