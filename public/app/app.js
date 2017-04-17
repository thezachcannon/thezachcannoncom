angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'app.routes', 'app.services',
 'app.userService','app.homepageCtrl', 'app.aboutCtrl', 'app.codeCtrl', 'app.blogHomeCtrl', 'app.loginCtrl', 'app.adminHomeCtrl',
  'app.indexCtrl'])
.run(['$rootScope', '$location', '$window', 'UserService', function($rootScope, $location, $window, UserService){
  $rootScope.$on('$routeChangeStart', function (scope, currView, preView){
    console.log(scope);
    console.log(currView.access.isFree);
    console.log(preView)
    if(currView.access.isFree == false && UserService.isAuthenticated != true)
    {
      $location.path('/login');
    }
  })
  $rootScope.$on('$routeChangeSuccess', function () {
      $window.ga('send', 'pageview', { page: $location.url() });
  });
}])
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
})

