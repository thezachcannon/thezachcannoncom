angular.module('app.routes', [])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $routeProvider.when('/', {
      templateUrl: '/partials/homepage.ejs',
      controller: 'homepageCtrl',
      access: {
        isFree: true,
        tipe: 'normal'
      }
    })
     .when('/about/',{
       templateUrl: '/partials/about.ejs',
       controller: 'aboutCtrl',
        access: {
        isFree: true,
        tipe: 'normal'
      }
     })
    .when('/login',{
      templateUrl: '/partials/login.ejs',
      controller: 'loginCtrl',
      access: {
        isFree: true,
        tipe: 'normal'
      }
    })
    .when('blog',{
      templateUrl: '/partials/blog/home.ejs',
      controller: 'blogHomeCtrl',
      access: {
        isFree: true,
        tipe: normal
      }
    })
    .when('/admin', {
      templateUrl: '/partials/admin/home.ejs',
      controller: 'adminHomeCtrl',
      access: {
        isFree: false,
        tipe: 'admin'
      }
    })
    .when('/code/', {
      templateUrl: '/partials/code.ejs',
      controller: 'codeCtrl',
       access: {
        isFree: true,
        tipe: 'normal'
      }
    })
    .when('/error/', {
      templateUrl: '/partials/error.ejs',
      access: {
        isFree: true,
        tipe: 'normal'
      }
    })
    .otherwise({ redirectTo: '/error/' });
  });
