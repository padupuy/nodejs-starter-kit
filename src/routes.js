/**
* Main application routes
*/

'use strict';

var express = require('express');
var path = require('path');
var fs = require('fs');
var config = require('./config/environment');

var me = this;
var routes = [];

module.exports.init = function(app) {

  app.get('/modules/', function(req, res) {
    res.type('application/json');
    return res.status(200).json(routes);
  });

  me.registerModulesRoutes(app, routes);

  app.use('/', express.static(config.path.public));
};

module.exports.registerModulesRoutes = function (app, routes) {
  fs.readdir(config.path.modules, function (err, files) {
    if(!err){
      files.forEach(function(file) {
        routes.push(me.registerModule(app, file));
      });
    }
  });
}

module.exports.registerModule = function (app, file) {
  var mod = require(path.join(config.path.modules, file));
  var route = '/' + file + '/';

  var error = undefined;

  try {
    app.use(route, mod.router);
  } catch(e) {
    error = e.message;
  }

  return {
    route: route,
    alive: !error,
    error: error,
    id: mod.id,
    desc: mod.desc
  };
}
module.exports.unregisterModulesRoutes = function () {
  routes = [];
}
