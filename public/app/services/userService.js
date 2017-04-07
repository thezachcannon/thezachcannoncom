angular.module('app.userService', [])
.factory('UserService', [function() {
  return {
    isAuthenticated: false,
    username: '',
    auth_token: ''
  };
}]);