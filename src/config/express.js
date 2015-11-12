/**
 * Express configuration
 */
'use strict';

var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var favicon = require('serve-favicon');
var helmet = require('helmet');
var path = require('path');

var config = require('./environment');

module.exports = function (app) {
  var env = app.get('env');

  app.use(compression()); //gzip response
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ // for parsing application/x-www-form-urlencoded
    extended: true
  }));
  app.use(methodOverride()); //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  app.use(cookieParser()); //enable cookie
  app.use(favicon(path.join(config.path.public, 'favicon.ico'))); //add favicon
  app.use(helmet()); //secure Express app against CSP, XSS etc..

  // Enable CORS on requests
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  /* istanbul ignore next */
  if (env === 'production') {
    app.use(morgan('combined'));
  }

  /* istanbul ignore next */
  if (env === 'development' || env === 'test') {
    app.use(morgan('dev'));
    //Development-only error handler middleware.
    // Error handler - has to be last
    app.use(errorHandler());
  }
};
