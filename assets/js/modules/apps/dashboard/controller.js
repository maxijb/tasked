// export default class {

//   constructor($scope, $rootScope, loginService) {

export default ($rootScope, $scope, $state, loginService) => {
	if (!loginService.userId) {
		$state.go('index');
	}
}