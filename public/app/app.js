angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap', 'app.routes', 'app.services', 'app.userService','app.homepageCtrl', 'app.aboutCtrl', 'app.codeCtrl', 'app.loginCtrl', 'app.adminHomeCtrl', 'app.blogHomeCtrl', 'app.indexCtrl'])
.run(['$rootScope', '$location', 'UserService', function($rootScope, $location,  UserService){
  $rootScope.$on('$routeChangeStart', function (scope, currView, preView){
    console.log(scope);
    console.log(currView.access.isFree);
    console.log(preView)
    if(currView.access.isFree == false && UserService.isAuthenticated != true)
    {
      $location.path('/login');
    }
  })
}])
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
})

