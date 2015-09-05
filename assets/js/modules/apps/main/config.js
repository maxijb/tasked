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
  }