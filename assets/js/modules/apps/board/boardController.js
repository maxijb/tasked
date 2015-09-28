// export default class {

//   constructor($scope, $rootScope, loginService) {

export default function($rootScope, $scope, $state, $stateParams, loginService, boardsService) {

	this.$scope = $scope;
	this.boardsService = boardsService;

	if (!loginService.userId || !$stateParams.id) {
		$state.go('index');
	} 

	angular.extend($scope, {
		board: {
			id: $stateParams.id,
			name: $stateParams.name
		},
		lists: { order: [], details: {}}
	});

	//select board on service
	boardsService.selectBoard(angular.copy($scope.board));
	$rootScope.$on("LISTS-update", updateLists.bind(this));
	updateLists.call(this);

}

function updateLists(event, lists) {
	this.$scope.lists = lists || this.boardsService.lists;
}

