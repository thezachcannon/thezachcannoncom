var GitHubApi = require("github");
var Promise = require('bluebird');
var Config = require('./../../config.js')
var Auth_Token = Config.gitHubAuth;

var github = new GitHubApi({
  // optional
  debug: true,
  protocol: "https",
  host: "api.github.com", // should be api.github.com for GitHub
  pathPrefix: "", // for some GHEs; none for GitHub
  headers: {
    "user-agent": "TestApp" // GitHub is happy with a unique user agent
  },
  Promise: require('bluebird'),
  followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
  timeout: 5000
});


module.exports = {
  getProfileInfo: function() {
    github.authenticate({
      type: "oauth",
      token: Auth_Token
    })
    return new Promise(function(resolve, reject) {
      github.users.getForUser({
        username: 'thezachcannon'
      }, function(err, res) {
        if(err){
          reject(err);
        }
        else {
          resolve(res);
        }
      });
    })
  },
  getRepos: function () {
    github.authenticate({
      type: "oauth",
      token: Auth_Token
    })
    return new Promise(function(resolve, reject) {
      github.repos.getForUser({
        username: 'thezachcannon'
      }, function (err, res){
        if(err){
          reject(err);
        }
        else
        {
          resolve(res);
        }
      })
    })
    }
}
