var Blog = require('./blogModel');
var Promise = require('bluebird');
module.exports = {
  create: function (blogObj) {
    
    return new Promise(function (resolve, reject) {
      var blog = new Blog({
        title: blogObj.title,
        content: blogObj.content,
        tags: blogObj.tags
      })
      blog.save(function (err) {
        if (err) {
          reject(err);
        }
        else {
          console.log('Blog save successfully');
          resolve({ message: 'success' });
        };
      })
    })
  },
  getAll: function () {
    return new Promise(function (resolve, reject) {
      Blog.find({}, function (err, blogs) {
        if (err) {
          reject(err);
        }
        else {
          resolve(blogs);
        }
      })
    })
  },
  getBlog: function (id) {
    return new Promise(function (resolve, reject) {
      Blog.findOne({ _id: id}, function (err, blog) {
        if (err) {
          reject(err);
        }
        else {
          resolve(blog);
        }
      });
    })
  },
  delete: function (_id){
    return new Promise(function (resolve, reject){
      Blog.remove({_id: _id}, function (err){
        if(err){
          resolve({message: 'error'})
        }
        else{
          resolve({message: 'successfully delete blog ' + body })
        }
      })
    })
  },
  updateBlog: function (body){
    console.log(body)
    return new Promise(function(resolve, reject){
      body.updated_at = new Date();
      Blog.findOneAndUpdate({_id: _id}, body, function (err, blog){
        if(err){
          resolve({message: 'error'})
        }
        else {
          resolve({message: 'successfully updated blog'});
        }
      })
    })
  }
}