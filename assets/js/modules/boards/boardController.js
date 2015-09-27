// export default class {

//   constructor($scope, $rootScope, loginService) {

export default ($rootScope, $scope, $state, $stateParams, loginService, boardsService) => {
	if (!loginService.userId) {
		$state.go('index');
	} 
}