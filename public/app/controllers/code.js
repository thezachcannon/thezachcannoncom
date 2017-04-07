angular.module('app.codeCtrl', [])
  .controller('codeCtrl', ['$scope', 'services', function($scope, services) {
    init();

    function init() {
      $scope.loading = true;
    }
    services.getGitHubInfo().then(function(data) {
      $scope.generalInfo = data.data;
      services.getRepos().then(function(data) {
        $scope.repos = data.data;
        $scope.loading = false;
      })
    })
  }]);
