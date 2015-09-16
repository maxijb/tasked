
export default angular.module('customForms', ['login', 'boards'])

.directive('createBoardForm', getBaseButtonDirective.bind(null, 'create-board-form.html'));



function getBaseButtonDirective(tmpl) {
  let baseTmpl = 'static/templates/modules/custom-forms/';

  return {
      restrict: 'AE',
      replace: true,
      transclude: true,

      controller: function($scope, loginService, boardsService) {
       
        angular.extend($scope, {
            identities: loginService.identities,
            name: "",
            userType: null,
            privacyOptions: [
              {
                value: "private",
                title: "private",
                subtitle: "onlyYouAndInvitedCanSeeThis"
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
              
              let privacySelected = $scope.privacyOptions.filter((x) => x.b == 2),
                  data = {
                    user: $scope.user,
                    privacy: privacySelected.value,
                    name: $scope.name
                  };

              boardsService.createBoard(data)
                  .then((response) => {
                    console.log(response);
                     $loading = false;
                  })
            }
        });
        
        //update privacy setting according to user type on load       
        $scope.changeUserSelect();

      }, 
      controllerAs: "formCtrl",
      scope: {
        user: '=',
      },
      templateUrl: baseTmpl + tmpl,

    }
}