// export default class {

//   constructor($scope, $rootScope, loginService) {

export default function($scope, loginService, boardsService, cardsService) {

	this.$scope = $scope;
	this.boardsService = boardsService;

	console.log('si', $scope);

}
