/**
 * Main application file
 */

'use strict';

// Set default node environment to development
/* istanbul ignore next */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);

/* bootstrap Application */
var routes = require('./routes');
routes.init(app);

//Let's get started
server.listen(config.port, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

/* istanbul ignore next */
process.on('uncaughtException', function (error) {
  console.error(error.stack);
});

// MONGODB
var mongoose = require('mongoose');
mongoose.connect(config.mongo.uri, config.mongo.options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to mongo');
});

// SOCKET IO
var io = require('socket.io')(server);
io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});
config.ws = io;

module.exports = app;
