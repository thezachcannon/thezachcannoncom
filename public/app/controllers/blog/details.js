angular.module('app.blogDetailsCtrl', [])
  .controller('blogDetailsCtrl', ['$scope', '$sce', '$routeParams', 'services',  function ($scope, $sce, $routeParams, services) {
    var blog_id = $routeParams.id;
    $scope.loading = true;
    $scope.toTrustedHTML = function( html ){
    return $sce.trustAsHtml( html );
    }
    services.getBlog(blog_id).then(function(data) {
      $scope.blog = data.data;
      $scope.loading = false;
    }, function (error) {
      $scope.loading = false;
    })  
  }])