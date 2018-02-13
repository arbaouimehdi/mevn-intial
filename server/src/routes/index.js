const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

// Controllers
const postController = require('../controllers/postController');
const categoryController = require('../controllers/categoryController');

// Models
const Category = require('../models/category');
const Post = require('../models/post');

//
// Categories
router.get('/categories', (req, res) => {
  catchErrors(categoryController.getAllCategories(req, res));
});
router.get('/category/:id', (req, res) => {
  catchErrors(categoryController.getCategoryById(req, res));
});

// 
// Posts
router.get('/posts', (req, res) => { 
  catchErrors(postController.getAllPosts(req, res));
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