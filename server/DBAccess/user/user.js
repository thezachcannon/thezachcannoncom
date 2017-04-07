var User = require('./userModel');
var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
module.exports = {
  create: function (userObj) {
    return new Promise(function (resolve, reject) {
      var user = new User({
        username: userObj.username,
        password: userObj.password
      })
      user.save(function (err) {
        if (err) {
          reject(err);
        }
        else {
          console.log('User save successfully');
          resolve({ message: 'success' });
        };
      })
    })
  },
  getAll: function () {
    return new Promise(function (resolve, reject) {
      User.find({}, function (err, users) {
        if (err) {
          reject(err);
        }
        else {
          for(var x =0; x < users.length; x++)
          {
            users[x].password = undefined;
          }
          console.log(users);
          resolve(users);
        }
      })
    })
  },
  getUser: function (username) {
    return new Promise(function (resolve, reject) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          reject(err);
        }
        else {
          user.password = undefined
          resolve(user);
        }
      });
    })
  },
  Auth: function (passedUser, app) {
    var passedUser = passedUser;
    return new Promise(function (resolve, reject) {
      User.findOne({username: passedUser.username}, function(err, user){
        if (!user) {
          reject({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
          // check if password matches
          if (user.password != passedUser.password) {
            reject({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
            // if user is found and password is right
            // create a tokens
            var token = jwt.sign(user, app.get('superSecret'), {
              expiresIn: "24h" // expires in 24 hours
            });

            // return the information including token as JSON
            resolve({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }
        }
      })
    })
  },
  delete: function (body){
    return new Promise(function (resolve, reject){
      User.remove({_id: body}, function (err){
        if(err){
          resolve({message: 'error'})
        }
        else{
          resolve({message: 'successfully delete user ' + body })
        }
      })
    })
  },
  updateUser: function (body){
    console.log(body)
    return new Promise(function(resolve, reject){
      body.updated_at = new Date();
      User.findOneAndUpdate({username: body.username}, body, function (err, user){
        if(err){
          resolve({message: 'error'})
        }
        else {
          resolve({message: 'successfully updated user'});
        }
      })
    })
  }
}