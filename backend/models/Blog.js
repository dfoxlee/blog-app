const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
   blogId: String,
   userEmail: String,
   username: String,
   blog: String,
   postDate: String,
   likes: Number
});

module.exports = mongoose.model('Blog', blogSchema);