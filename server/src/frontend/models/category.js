const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./post');

const categorySchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;