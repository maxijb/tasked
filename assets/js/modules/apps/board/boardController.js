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
			drop: function() {
				alert('sis');
			}
		},

		//stores lists order and details
		lists: { order: [], details: {}},
		callbacks: {

			drop: function(drop) {
				boardsService.moveCard(drop);
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
	console.log("claro", lists);
	this.$scope.lists = lists || this.boardsService.lists;
}

