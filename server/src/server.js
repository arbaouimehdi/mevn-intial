const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();

/**
 * Setup
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

/**
 * Database Connection
 */
mongoose.connect('mongodb://localhost:27017/helloworld2');
const db = mongoose.connection;
db.on('error', () => {
  console.log('Database Connection - Failed');
});
db.on('open', () => {
  console.log('Database Connection - Success');
});

/**
 * Routes
 */
const routes = require('./routes/index')
app.use('/', routes);

/**
 * Server
 */
app.listen(port, () => {
  console.log(`Listenning on port: ${port}`);
});