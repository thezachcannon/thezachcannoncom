angular.module('app.blogHomeCtrl', [])
  .controller('blogHomeCtrl', ['$scope', '$sce', 'services', function ($scope, $sce, services) {
    $scope.loading = true;
    $scope.toTrustedHTML = function( html ){
    return $sce.trustAsHtml( html );
    }
    services.getBlogs().then(function(data) {
      $scope.blogs = data.data;
      $scope.loading = false;
    }, function (error) {
      $scope.loading = false;
    })  
  }])