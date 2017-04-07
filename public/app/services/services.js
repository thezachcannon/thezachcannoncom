angular.module('app.services', [])
  .factory('services', ['$http', function ($http) {
    return {
      getGitHubInfo: function () {
        return $http.get('http://localhost:3000/api/getgithubinfo')
      },
      getRepos: function () {
        return $http.get('http://localhost:3000/api/getrepos')
      },
      login: function (body) {
        return $http.post('http://localhost:3000/api/authenticate', body)
      },
      getUsers: function(){
        return $http.get('http://localhost:3000/api/users');
      },
      deleteUser: function(user){
        return $http.delete('http://localhost:3000/api/user/' + user._id)
      },
      addUser: function (user){
        return $http.post('http://localhost:3000/api/user/', {username: user.username, password: user.password});
      },
      updateUser: function (user){
        return $http.put('http://localhost:3000/api/user', user);
      }
    }
  }])
  .factory('AuthInterceptor', function ($window, $q, UserService) {
    return {
      request: function (config) {
        console.log('Interception')
        console.log(UserService.auth_token);
        config.params = config.param || {};
        if (UserService.auth_token) {
          config.params.token = UserService.auth_token;
        }
        console.log(config);
        return config || $q.when(config);
      }
    }
  })

