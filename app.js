// 
//   file name: App
//   Student name: Arshdeep Singh
//   Student number: 301200480
//   Date : 24-06-2022  
//   Web App name: Portfolio
//
// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let authRouter = require('./routes/auth');
const mongoose = require("mongoose");
const sessions = require("express-session");
const config = require("./db/dbconfig");
let app = express();
app.use(
  sessions({
      secret: "5(lY7Rs-}$",
      saveUninitialized: true,
      cookie: { maxAge: 100000000 },
      resave: false,
  })
);
app.use(function(req, res, next) {res.locals.auth = req.session.auth; next();});
mongoose.connect(config.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=> {
  console.log("Connected to MongoDB");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // express -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
function securepages(req, res, next) {
  if (req.session.auth) {
      next();
  } else {
      res.redirect("/login");
  }
}

app.all("/auth/*", securepages, function(req, res, next) {
  next();
});
app.use('/auth', authRouter);
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
  res.render('error', { title: 'Error'});
});

module.exports = app;
