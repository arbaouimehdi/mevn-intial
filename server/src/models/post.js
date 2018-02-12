const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category');

const postSchema = Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;