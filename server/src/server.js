const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const app = express();

/**
 * Connect the Databse
 */
mongoose.connect('mongodb://localhost:27017/helloworld2');
const db = mongoose.connection;
db.on('error', () => {
  console.log('Databse Connection - Failed');
});
db.on('open', () => {
  console.log('Database Connection - Success');
});

/**
* Setups
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

/**
 * Routes
 */
const routes = require('./routes/index');
app.use('/', routes);

/**
 * Server Connection
 */
app.listen(port, () => {
  console.log(`Listenning on port: ${port}`);
})