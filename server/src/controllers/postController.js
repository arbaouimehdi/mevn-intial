const mongoose = require('mongoose');
const Post = require('../models/post');

//
// get all Posts
exports.getAllPosts = (req, res) => {
  Post.find().populate('category').exec(function(err, posts) {
    res.send(posts)
  });
};

//
// Get Post by ID
exports.getPostById = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) console.error(err);
    res.send(post);
  })
}

//
// Add new Post
exports.addNewPost = (req, res) => {
  let id = mongoose.Types.ObjectId();
  let title = req.body.title;
  let description = req.body.description;
  let category = req.body.category;

  let new_post = Post({
    _id: id,
    title: title,
    description: description,
    category: category
  });

  new_post.save((err) => {
    if (err) console.error(err);
    res.send({
      success: true,
      message: 'Post created successfully'
    })
  })
};

//
// Update Post
exports.updatePost = (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    
    if (err) console.error(err);

    post.title = req.body.title;
    post.description = req.body.description;
    post.category = req.body.category;

    post.save((err) => {
      if (err) console.error(err);
      res.send({
        success: true,
        message: "Post updated successfuly"
      })
    })

  })
};

//
// Delete Post
exports.deletePost = (req, res) => {
  Post.remove({_id: req.params.id}, (err, post) => {
    if (err) console.error(err);
    res.send({
      sucess: true,
      message: "Post deleted successfully"
    })
  });
};
