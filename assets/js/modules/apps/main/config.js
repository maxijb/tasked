export default ($stateProvider, 
                $urlRouterProvider, 
                $locationProvider, 
                $urlMatcherFactoryProvider) => { 
    
    // history pushState
    $locationProvider.html5Mode(true).hashPrefix('!');
    // allows trailing slashes
    $urlMatcherFactoryProvider.strictMode(false)
    // if every route fails, go to index
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('index', {
        url:'/',
        templateUrl: 'static/templates/apps/index.html'
        // controller: 'LoginCtrl',
        // controllerAs: 'login'
      })
      .state('dashboard', {
        abstract: true,
        url:'/dashboard',
        templateUrl: 'static/templates/apps/dashboard.html',
        controller: 'dashboardController',
        controllerAs: 'ctrl',
        resolve: {
          'dashboardBundleDependency': ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/linker/js/actions/dashboard.js');
          }]
        }
      })
      .state('dashboard.boards', {
        url:'',
        views: {
          "dashboard-view": {
            templateUrl: 'static/templates/apps/dashboard/boards.html',
            controller: 'dashboardBoardController',
            controllerAs: 'boardsCtrl'
          }
        }
    })
    .state('dashboard.profile', {
      url:'/profile',
      views: {
        "dashboard-view": {
          templateUrl: 'static/templates/apps/dashboard/profile.html',
        }
      }
      
    })
    .state('dashboard.organizations', {
      url:'/organizations',
      views: {
        "dashboard-view": {
          templateUrl: 'static/templates/apps/dashboard/organizations.html',
        }
      }
      
    })
    .state('dashboard.notifications', {
      url:'/notifications',
      views: {
        "dashboard-view": {
          templateUrl: 'static/templates/apps/dashboard/notifications.html',
        }
      }
      
    })
    .state('dashboard.activity', {
      url:'/activity',
      views: {
        "dashboard-view": {
          templateUrl: 'static/templates/apps/dashboard/activity.html',
        }
      }
      
    })
    .state('board', {
      url: '/board/{id}/{name}',
      templateUrl: 'static/templates/apps/board/board.html',
        controller: 'boardController',
        controllerAs: 'ctrl'
    })
  }