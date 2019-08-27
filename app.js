const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var archeryRouter = require('./routes/sport');
var addScoreRouter = require('./routes/add_score');
var editScoreRouter = require('./routes/edit_score');
var score = require('./models/score');
const expressValidator = require('express-validator');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/scoring-app', {useNewUrlParser: true});
let db = mongoose.connection;

// Check the database connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.log(err);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

app.use('/', indexRouter);
app.use('/user/:user/:id', usersRouter);
app.use('/sport/:sport', archeryRouter);
app.use('/sport/add_score/:sport', addScoreRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
