angular.module('app.aboutCtrl', [])
  .controller('aboutCtrl', ['$scope', '$sce', 'services', function ($scope, $sce, services) {
    services.getAbout().then(function(data){ $scope.post = '' + data.data
    $scope.post = $sce.trustAsHtml($scope.post)
  }, function (error){ console.log(error) })
  }]);
