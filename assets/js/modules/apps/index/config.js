module.exports = function ($stateProvider, $urlRouterProvider) { 
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('Index', {
        url:'/',
        templateUrl: 'static/templates/index.html',
        // controller: 'LoginCtrl',
        // controllerAs: 'login'
      })
    //   .state('boards', {
    //     url:'/boards',
    //     templateUrl: 'app/boards/boards-mdv.tmpl.html',
    //     controller: 'BoardsCtrl',
    //     controllerAs: 'ctrl',
    //     resolve: {
    //       'currentUser': ['Auth', function (Auth) {
    //         return Auth.$requireAuth();
    //       }]
    //     }
    //   })
    //   .state('notes', {
    //     url:'/boards/:boardId/notes',
    //     templateUrl: 'app/notes/notes-mdv.tmpl.html',
    //     controller: 'NotesCtrl',
    //     controllerAs: 'ctrl',
    //     resolve: {
    //       'currentUser': ['Auth', function (Auth) {
    //         return Auth.$requireAuth();
    //       }]
    //     }
    //   })
    // ;
  }