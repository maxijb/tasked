module.exports = function ($stateProvider, $urlRouterProvider, $locationProvider) { 
     $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('index', {
        url:'/',
        templateUrl: 'static/templates/apps/index.html',
        // controller: 'LoginCtrl',
        // controllerAs: 'login'
      })
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'static/templates/apps/dashboard.html',
        controller: 'dashboardController',
        controllerAs: 'ctrl',
        resolve: {
          'dashboardBundle': ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/linker/js/actions/dashboard.js');
          }]
        }
      })
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