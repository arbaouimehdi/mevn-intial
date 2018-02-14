const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { catchErrors } = require('../../handlers/errorHandlers');

// Controllers
const postController = require('../controllers/postController');
const categoryController = require('../controllers/categoryController');

// Models
const Category = require('../models/category');
const Post = require('../models/post');
const User = require('../models/user');

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

//
// Authentication

function isAuthenticated(req, res, next) {
  if (!req.user) {
    return res.redirect('/login');
  }

  return next();
}

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect Password' });
      }
      
      return done(null, user);
    })
  }
))
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/login', (req, res) => {
  res.send('login');
});

router.get('/users/:username', (req, res) => {
  res.json({ user: req.user });
  //res.send(req.user);
})

router.get('/dashboard',
  isAuthenticated,
  (req, res) => {
    res.render('dashboard');
  }
);

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
});

module.exports = router;