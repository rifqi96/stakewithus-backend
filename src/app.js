var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var ValidationExceptions = require('./Exceptions/ValidationException');
var ResourceNotFoundException = require('./Exceptions/ResourceNotFoundException');
var PageNotFoundException = require('./Exceptions/PageNotFoundException');

var indexRouter = require('./routes/index');

// API Routers
var validatorsRouter = require('./routes/api/v1/validators');

var app = express();

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/validators', validatorsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(new PageNotFoundException()));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.status = err.status || 500;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Handle validation exception
  if (err instanceof ValidationExceptions)
    res.locals.error = err.error;

  // Handle resource and page not found exceptions
  else if (err instanceof ResourceNotFoundException || err instanceof PageNotFoundException)
    delete res.locals.error;

  // return the error
  res.status(res.locals.status);
  res.send(res.locals);
});

module.exports = app;
