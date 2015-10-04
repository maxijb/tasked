// export default class {

//   constructor($scope, $rootScope, loginService) {

export default function( 
						$rootScope, 
						$scope, 
						$state, 
						$stateParams,
						loginService, 
						boardsService,
						cardsService
						) {

	this.$scope = $scope;
	this.boardsService = boardsService;
	this.cardsService = cardsService;

	let cardAndListRequired = false;

	try {
		$scope.card = $scope.$parent.selected.card;
		$scope.list = $scope.$parent.selected.list;
	} 
	catch(err) {
		$scope.card = {
			id: $stateParams.cardId,
			name: $stateParams.cardName
		}

		//if list in the url
		if ($stateParams.id) {
			$scope.list = {
				id: $stateParams.id,
				name: $stateParams.name
			}
		}
		cardAndListRequired = true;
	} 

	$scope.loading = true;
	
	cardsService.loadCardContent($scope.card.id, cardAndListRequired)
	.then((data) => {
		if (cardAndListRequired) {
			$scope.card = data.card;
			$scope.list = data.list;
		}
		$scope.content = data.content || {};
		$scope.loading = false;
	});

}
