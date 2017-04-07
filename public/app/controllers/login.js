angular.module('app.loginCtrl', [])
  .controller('loginCtrl', ['$scope', '$location', 'UserService', 'services', function ($scope, $location, UserService, services) {

    $scope.login = function () {
      services.login({ username: $scope.username, password: $scope.password }).then(function (message) {
        UserService.isAuthenticated = true;
        UserService.auth_token = message.data.token;
        $location.path('/admin')
      }, function (error) {
        $scope.error= error.data;      
      })
    }

  }]);
