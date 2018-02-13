const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

// Controllers
const postController = require('../controllers/postController');

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
// Posts
router.get('/posts', (req, res) => { 
  catchErrors(postController.getAllPosts(res));
});
router.get('/post/:id', (req, res) => {
  catchErrors(postController.getPostById(req, res));
});
router.post('/posts', (req, res) => {
  catchErrors(postController.addNewPost(req, res));
})
router.put('/post/:id', (req, res) => {
  catchErrors(postController.updatePost(req, res));
});
router.put('/post/:id', (req, res) => {
  catchErrors(postController.updatePost(req, res));
});
router.delete('/post/:id', (req, res) => {
  catchErrors(postController.deletePost(req, res));
})

module.exports = router;