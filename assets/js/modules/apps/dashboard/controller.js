// export default class {

//   constructor($scope, $rootScope, loginService) {

module.exports = function($rootScope, $scope, $state, loginService) {
	
	if (!loginService.userId) {
		$state.go('index');
	}
}