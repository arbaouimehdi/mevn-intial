const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const port = process.env.PORT || 3000;
const app = express();

/**
 * Connect the Database
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
//app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET || 'awesomecookiesecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/helloworld2',
  }),
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//app.use(morgan('combined'));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */
const routes = require('./frontend/routes/index');
const admin_routes = require('./admin/routes/admin_routes');
app.use('/', routes);
app.use('/admin', admin_routes);

/**
 * Server Connection
 */
app.listen(port, () => {
  console.log(`Listenning on port: ${port}`);
})