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
        templateUrl: 'static/templates/apps/indexApp.html'
        // controller: 'LoginCtrl',
        // controllerAs: 'login'
      })
      .state('dashboard', {
        abstract: true,
        url:'/dashboard',
        templateUrl: 'static/templates/apps/dashboardApp.html',
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
            templateUrl: 'static/templates/apps/dashboard/boardsApp.html',
            controller: 'dashboardBoardController',
            controllerAs: 'boardsCtrl'
          }
        }
    })
    .state('dashboard.profile', {
      url:'/profile',
      views: {
        "dashboard-view": {
          templateUrl: 'static/templates/apps/dashboard/profileApp.html',
        }
      }
      
    })
    .state('dashboard.organizations', {
      url:'/organizations',
      views: {
        "dashboard-view": {
          templateUrl: 'static/templates/apps/dashboard/organizationsApp.html',
        }
      }
      
    })
    .state('dashboard.notifications', {
      url:'/notifications',
      views: {
        "dashboard-view": {
          templateUrl: 'static/templates/apps/dashboard/notificationsApp.html',
        }
      }
      
    })
    .state('dashboard.activity', {
      url:'/activity',
      views: {
        "dashboard-view": {
          templateUrl: 'static/templates/apps/dashboard/activityApp.html',
        }
      }
      
    })
    .state('board', {
      url: '/board/{id}/{name}',
      templateUrl: 'static/templates/apps/board/boardApp.html',
        controller: 'boardController',
        resolve: {
          'dashboardBundleDependency': ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/linker/js/actions/dashboard.js');
          }]
        }
    })
     .state('board.card', {
      url: '/card/{cardId}/{cardName}',
      templateUrl: 'static/templates/apps/board/boardApp.html',
        controller: 'boardController',
        resolve: {
          'card': function($stateParams) {
            console.log('resolve', $stateParams);
          },
          'dashboardBundleDependency': ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('/static/linker/js/actions/dashboard.js');
          }]
        }
    })
  }