export default function() {

  let baseTmpl = 'static/templates/modules/custom-forms/add-board-user-autocomplete.html';

  return {
      restrict: 'AE',
      replace: true,

      controller: ['$scope', 'loginService', 'boardsService', 'defaultIcons', function($scope, loginService, boardsService, defaultIcons) {
        

        angular.extend($scope, {
            defaultIcons,
            boardUsers: boardsService.users,
            dataSource: {
              type: 'function',
              method: (search, limit) => {
                 let regex = new RegExp(search, "i");
                 let showUsers = []

                 Object.keys($scope.boardUsers).map((userId) => {
                    if ($scope.boardUsers[userId].name.match(regex)) showUsers.push($scope.boardUsers[userId]);
                 });
                
                return showUsers.slice(0, limit);
              }
            },
            currentUser: loginService.userId,
            addUser: function(user) {
              console.log("addUser", user);
              $scope.callback({user});
              // organizationService.createBoard(data)
              //     .then((data) => {
              //        $scope.loading = false;
              //        angular.extend($scope, defaultScope);
              //        $scope.cancel();
              //     });
            }
        });
        

      }], 
      scope: {
        users: '=',
        callback: '&'
      },
      templateUrl: baseTmpl,

    }
}