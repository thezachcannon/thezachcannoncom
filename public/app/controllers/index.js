angular.module('app.indexCtrl', [])
.controller('indexCtrl', ['$scope', 'UserService', function($scope, UserService) {
$scope.userService = UserService;
}]);
