export default angular.module('dashboardApp', ['login', 'ui.router'])
  .controller("dashboardController", ['$rootScope', '$scope', '$state', 'loginService', require("./controller")])
  .run(["$rootScope", "$location",  require("./run")]);