angular.module('app.adminHomeCtrl', [])
  .controller('adminHomeCtrl', ['$scope', 'services', function ($scope, services) {
    init();
    function init() {
      $scope.isBusy = true;
      services.getUsers().then(function (data) {
        $scope.users = data.data
        $scope.isBusy = false;
      })
    }
    $scope.deleteUser = function (user) {
      $scope.isBusy = true;
      services.deleteUser({ _id: user._id, username: user.username }).then(function (data) {
        $scope.isBusy = false;
        init();
      })
    }
    $scope.updateUser = function (user){
      $scope.isBusy = true;
      services.updateUser({username: user.username, admin: user.admin}).then(function(data){
        $scope.isBusy = false;
        init();
      })
    }
    $scope.addUser = function (){
      $scope.isBusy = true;
      services.addUser({username: $scope.username, password: $scope.password}).then(function(data){
      $scope.username = "";
      $scope.password = "";
      $scope.isBusy = false;
      init();
    }, function (error){
      $scope.isBusy = false;
    })}
    $scope.addingUser = function(){
      $scope.showRegistration = true;
    }
  }])
