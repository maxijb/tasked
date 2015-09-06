require('./boards');

export default ($stateProvider, $urlRouterProvider, $locationProvider) => { 
     
    $stateProvider
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
  }