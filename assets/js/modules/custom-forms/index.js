
export default angular.module('customForms', ['login'])

.directive('createBoardForm', getBaseButtonDirective.bind(null, 'create-board-form.html'));



function getBaseButtonDirective(tmpl) {
  let baseTmpl = 'static/templates/modules/custom-forms/';

  return {
      restrict: 'AE',
      replace: true,
      transclude: true,

      controller: function($scope, loginService) {
       
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
            privacy: "private",
            changeNewBoardSelect: function() {
              $scope.privacyOptions[1].disabled = $scope.props.user.type == 'user';
            }
        });
        
        console.log('id', $scope.user);
        setTimeout(function() {
          console.log('id', $scope.user);
        }, 1);

      }, 
      controllerAs: "formCtrl",
      scope: {
        user: '=',
      },
      templateUrl: baseTmpl + tmpl,

    }
}