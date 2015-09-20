export default function() {

  let baseTmpl = 'static/templates/modules/custom-forms/create-board-form.html';

  return {
      restrict: 'AE',
      replace: true,

      controller: function($scope, loginService, boardsService) {
       
        let defaultScope = {
            name: "",
            privacyOptions: [
              {
                value: "private",
                title: "private",
                subtitle: "onlyYouAndInvitedCanSeeThis",
                selected: true
              },
              {
                value: "organization",
                title: "organization",
                subtitle: "onlyYouAndInvitedCanSeeThis"
              },
              {
                value: "public",
                title: "public",
                subtitle: "onlyYouAndInvitedCanSeeThis"
              }
            ],
            users: []
        }


        angular.extend($scope, defaultScope, {
            identities: loginService.identities,
            changeUserSelect: function() {
              //if its an user or organization, update the privacy options
              let toDisable = $scope.user.type == 'user' ? $scope.privacyOptions[1] : $scope.privacyOptions[0],
                  fallbackSelect = $scope.user.type == 'user' ? $scope.privacyOptions[0] : $scope.privacyOptions[1];

              toDisable.disabled = true;
              if (toDisable.selected) {
                  toDisable.selected = false;
                  fallbackSelect.selected = true;
              } 
            },


            submitForm: function() {
              $scope.loading = true;
              
              let privacySelected = $scope.privacyOptions.filter((x) => x.selected == true),
                  data = {
                    users: [{id: $scope.user.id, type: 'admin'}],
                    privacy: privacySelected.length ? privacySelected[0].value : privacyOptions[0].value,
                    name: $scope.name
                  };

              boardsService.createBoard(data)
                  .then((data) => {
                     $scope.loading = false;
                     angular.extend($scope, defaultScope);
                     $scope.cancel();
                  });
            }
        });
        
        //update privacy setting according to user type on load       
        $scope.changeUserSelect();

      }, 
      controllerAs: "formCtrl",
      scope: {
        user: '=',
        cancel: '&'
      },
      templateUrl: baseTmpl,

    }
}