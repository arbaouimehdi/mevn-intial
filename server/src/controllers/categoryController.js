const mongoose = require('mongoose');
const Category = require('../models/category');

//
// Get All Categories
exports.getAllCategories = (req, res) => {
  Category.find({}, (err, caregories) => {
    if (err) {
      console.log('Error');
    }
    res.send(caregories);
  });
};

//
// Get Category by ID
exports.getCategoryById = (req, res) => {
  Category.find({ _id: req.params.id } ,(err, category) => {
    if (err) {
      console.error(err);
    }
    res.send(category);
  })
};