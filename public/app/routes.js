angular.module('app.routes', [])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $routeProvider.when('/', {
      templateUrl: '/partials/homepage.ejs',
      controller: 'homepageCtrl'
    })
    .when('/info/', {
      templateUrl: '/partials/info.ejs',
      controller: 'infoCtrl'
    })
    .when('/error/', {
      templateUrl: '/partials/error.ejs'
    })
    .otherwise({ redirectTo: '/error/' });

  });
