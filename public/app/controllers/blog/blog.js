angular.module('app.blogHomeCtrl', [])
  .controller('blogHomeCtrl', ['$scope', '$sce', 'services', function ($scope, $sce, services) {
    $scope.toTrustedHTML = function( html ){
    return $sce.trustAsHtml( html );
    }
    services.getBlogs().then(function(data) {
      $scope.blogs = data.data;
    }, function (error) {
      console.log(error)
    })  
  }])