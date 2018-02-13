const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Controllers

// Models
const Category = require('../models/category');
const Post = require('../models/post');

//
// Get all Categories
router.get('/categories', (req, res) => {
  Category.find({}, (err, caregories) => {
    if (err) {
      console.log('Error');
    }
    res.send(caregories);
  })
});

//
// Get Category by ID
router.get('/category/:id', (req, res) => {
  Category.find({ _id: req.params.id } ,(err, category) => {
    if (err) {
      console.error(err);
    }
    res.send(category);
  })
});

// 
// Get all Posts
router.get('/posts', (req, res) => {
  Post.find().populate('category').exec(function(err, posts) {
    if (err) {
      console.log('Error');
    }
    res.send(posts);
  });
})

//
// Get Post by ID
router.get('/post/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) console.error(err);
    res.send(post);
  })
});

//
// Create a new post
router.post('/posts', (req, res) => {
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

})

//
// Update a Post
router.put('/post/:id', (req, res) => {
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
});

//
// Delete a Post
router.delete('/post/:id', (req, res) => {
  Post.remove({_id: req.params.id}, (err, post) => {
    if (err) console.error(err);
    res.send({
      sucess: true,
      message: "Post deleted successfully"
    })
  })
})


module.exports = router;