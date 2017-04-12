var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
  title: String,
  content: String,
  tags: String,
  updated_at: Date
})
blogSchema.pre('save', function(next){
  var currentDate = new Date();
  this.updated_at = currentDate;
  if(!this.created_at){
    this.created_at = currentDate;
  }
  next();
})

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;