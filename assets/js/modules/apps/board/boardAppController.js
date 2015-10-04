// export default class {

//   constructor($scope, $rootScope, loginService) {

export default function($rootScope, $scope, $state, $stateParams, loginService, boardsService, cardsService) {

	this.$scope = $scope;
	this.boardsService = boardsService;
	this.$stateParams = $stateParams;

	if (!loginService.userId || !$stateParams.id) {
		$state.go('index');
	} 

	angular.extend($scope, {

		//card and list selected are null at start
		selected: null,
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
				let id = $scope.lists.order[start.position];
				$scope.$apply(() => {
					$scope.lists.details[id].dragged = false;
				});
			},

			drop: function(drop) {
				boardsService.moveList(drop);
			}	
		},

		selectCard: function(card, list) {
			$scope.selected = {card, list};
			cardsService.selectCard(card, list);
			$state.go("board.card", {cardId: card.id, cardName: card.name})
		}


	});

	//select board on service
	boardsService.selectBoard(angular.copy($scope.board));
	//handle list update
	$rootScope.$on("LISTS-update", updateLists.bind(this));

}

function updateLists(event, lists) {
	console.log('params', this.$stateParams);
	this.$scope.lists = lists || this.boardsService.lists;
	// setTimeout(() => {
	// this.$scope.$apply();

	// }, 0)
}

