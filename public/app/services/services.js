angular.module('app.services', [])
  .factory('services', ['$http', function ($http) {
    return {
      getGitHubInfo: function () {
        return $http.get('http://www.thezachcannon.com/api/getgithubinfo')
      },
      getRepos: function () {
        return $http.get('http://www.thezachcannon.com/api/getrepos')
      },
      getBlogs: function (){
        return $http.get('http://www.thezachcannon.com/api/blogs')
      },
      login: function (body) {
        return $http.post('http://www.thezachcannon.com/api/authenticate', body)
      },
      getUsers: function () {
        return $http.get('http://www.thezachcannon.com/api/users');
      },
      deleteUser: function (user) {
        return $http.delete('http://www.thezachcannon.com/api/user/' + user._id)
      },
      addUser: function (user) {
        return $http.post('http://www.thezachcannon.com/api/user/', {
          username: user.username,
          password: user.password
        });
      },
      updateUser: function (user) {
        return $http.put('http://www.thezachcannon.com/api/user', user);
      },
      getAbout: function () {
        return $http.get('https://api.github.com/repos/www.thezachcannon/www.thezachcannon/contents/about.html', {
          "headers": {
            "accept": "application/vnd.github.VERSION.raw"
          }
        })
      }
    }
  }])
  .factory('AuthInterceptor', function ($window, $q, UserService) {
    return {
      request: function (config) {
        config.params = config.param || {};
        if (UserService.auth_token) {
          config.params.token = UserService.auth_token;
        }
        return config || $q.when(config);
      }
    }
  })