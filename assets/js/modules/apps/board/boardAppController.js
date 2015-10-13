// export default class {

//   constructor($scope, $rootScope, loginService) {

export default function($rootScope, $scope, $state, $stateParams, loginService, boardsService, cardsService) {

	this.$scope = $scope;
	this.boardsService = boardsService;
	this.$stateParams = $stateParams;
	this.$state = $state;

	if (!loginService.userId || !$stateParams.id) {
		$state.go('index');
	} 

	angular.extend($scope, {

		//card and list selected are null at start
		selected: {},
		
		//data from the selected board
		board: {
			id: $stateParams.id,
			name: $stateParams.name,
			
		},

		//stores lists order and details
		lists: { order: [], details: {}},
		
		//callcback drag and drop for cards
		callbacksCard: {
			drag: function(start) {
				$scope.$apply(() => {
					$scope.cards[$scope.lists.details[start.targetId].cards[start.position]].dragged = true;
				});
			},

			endDrag: function(start) {
				$scope.$apply(() => {
					$scope.cards[$scope.lists.details[start.targetId].cards[start.position]].dragged = false;
				});
			},

			drop: function(drop) {
				boardsService.moveCard(drop);
			}
		},

		//callcback drag and drop for lists
		callbacksList: {
			drag: function(start) {
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
			$state.go("board.card", {cardId: card.id, cardName: card.name})
		},

		unselectCard: function() {
			$state.go("board");
		}

	});

	//handle list update
	$rootScope.$on("LISTS-update", updateLists.bind(this));
	
	//select board on service once the controller is loaded
	boardsService.selectBoard(angular.copy($scope.board));


	//check for location change and if board view, close the card
	$scope.$on('$locationChangeSuccess', function() {
		setTimeout(() => {
		  $state.current.name == "board" && $scope.$apply(() => $scope.selected = {} ) 
		}, 0);
	});

}



/* Update lists from service. Also when loading board */
function updateLists(event, lists, cards) {
	this.$scope.lists = lists || this.boardsService.lists;
	this.$scope.cards = cards || this.boardsService.cards;

	//find card details in lists if required
	//This happens when we load a board.card url directly in the browser address bar
	//The app will load the list of the board and once we have that loaded, we'll find out specific card
	this.$scope.selected = (this.$state.params.cardId) ? {
		card: this.$scope.cards[this.$state.params.cardId],
		list: this.$scope.lists.details[this.$state.params.id],
	} 
	: {};
}

