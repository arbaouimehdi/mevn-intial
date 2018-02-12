const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../models/post');

//
// Get All Posts
router.get('/posts', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
    }
    res.send(posts);
  }).sort({ id: -1 })
});

//
// Get Post by _id
router.get('/post/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) {
      console.log(err);
    }
    res.send(post);
  })
});

//
// Add a New Post
router.post('/post/new', (req, res) => {

  let id = new mongoose.Types.ObjectId();
  let title = req.body.title;
  let description = req.body.description;

  let new_post = new Post({
    _id: id,
    title: title,
    description: description,
    category: '5a801d23e2231e1a0ecaf211',
  });

  new_post.save((err) => {
    if (err) {
      console.log(err);
    }
    res.send({
      success: true,
      message: 'Post Saved Successfully'
    })
  })

})

//
// Update a Post by _id
router.put('/post/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    
    if (err) {
      console.log(err);
    }

    post.title = req.body.title;
    post.description = req.body.description;
    
    post.save((err) => {
      if (err) {
        console.log(err);
      }
      res.send({
        success: true,
        message: `Post (${post._id}) Updated Successfully`
      })
    })


  })
});

//
// Delete a Post
router.delete('/post/:id', (req, res) => {
  Post.remove({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(err);
    }
    res.send({
      success: true
    })
  })
});

module.exports = router;