var Promise = require('bluebird');
module.exports = {
  findOne: function (username) {
    return new Promise(function (resolve, reject) {
      if (username == 'zcannon') {
        resolve({username: username, password: 'Nax9Tay2', auth: '11241992zbc'})
      }
      else {
        reject({error: 'User cannot be found'});
      }
    })
  }
}