const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category');

const postSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  description: String,
  category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;