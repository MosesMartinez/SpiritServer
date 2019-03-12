require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var notificationTest = require('./routes/notificationtest');
var read = require('./routes/read');
var users = require('./routes/users');
var alcohol = require('./routes/alcohol');
var login = require('./routes/login');
var signup = require('./routes/signup');
var encrypt = require('./routes/encrypt');
var wallet = require('./routes/wallet');
var newMachine = require('./routes/newMachine');
var cocktails = require('./routes/cocktails');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/notificationtest', notificationTest);
app.use('/tokens', read);
app.use('/users', users);
app.use('/', alcohol);
app.use('/login', login);
app.use('/signup', signup);
app.use('/encrypt', encrypt);
app.use('/wallet', wallet);
app.use('/newMachine', newMachine);
app.use('/cocktails', cocktails);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.status + " " + err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.send(err.status || "500 Internal Server Error");
  res.sendStatus(err.status);
  // res.render('error');
});

module.exports = app;
