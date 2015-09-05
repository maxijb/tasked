export default class {

  constructor($scope, $rootScope, $state, loginService) {

    /* ---------------- Dependencies -------------- */
    this.$scope = $scope; 
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.loginService = loginService;


    /* -------------- Initialize ------------------ */
    $scope.user = loginService.user;
    $scope.popup = {visible: false};
    $scope.form = {};
    $scope.formLogin = {};
    $scope.errors = {};
    

    /* -------------- Events ------------------ */
    $rootScope.$on("USER-update", this.updateUser.bind(this));
    $rootScope.$on("USER-error", this.updateUser.bind(this));

  } 
   
    /* -------------- Dom events Handlers ------------------ */
    /* Toggles poppup status */
    togglePopup() {
      this.$scope.popup.visible = !this.$scope.popup.visible;
    }
    /* Resets poppup status to default (empty and not visible) */
    resetPopup() {
      this.$scope.popup = { loading: false, visible: false };
      this.$scope.form = {};
      this.$scope.formLogin = {};
    }
    /* Call service to create a new user */
    createForm() {
      this.$scope.popup.loading = true;
      this.loginService.createUser(this.$scope.form);
    }
    /* Call service to log in by user/pass */
    loginForm() {
      this.$scope.popup.loading = true;
      this.loginService.authenticateUser(this.$scope.formLogin);
    }
    /* Quickly check if this name is taken adn update UI */
    checkUserName() {
      if (this.$scope.form.name) {
        this.loginService.checkUserName(this.$scope.form.name, (status) => {
          this.$scope.errors.usedName = status;
        });
      }
      else this.$scope.errors.usedName = false;
    }

    /* Calls FB login */
    loginFacebook() {
      this.loginService.loginFacebook();
    }

    /* Logs out of the sesssion, whatever your user type is */
    logout() {
      this.loginService.logout();
    }

    /* ------------------- Data event Listeners -------------- */ 


    /* 
       Update UI after the user has changed 
       Redirects if necesarry to index/dashboard
       @param event: event sent by emit or broadcast listeners
       @param user: {} user object
       @param errors: error on form validation
       @void
       */ 
    updateUser(event, user, errors) { 
      this.$scope.popup.loading = false;
      this.$scope.errors = errors || {};
      if (!errors) {
        this.$scope.user = user; 
        this.resetPopup();
      }

      //Redirects to the proper section
      if (!user) {
        this.$state.go('index');
      } else if (this.$state.current.name == 'index') {
        this.$state.go('dashboard.boards')
      }
    }


}

