'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Alive = new Schema({
  name: String
});

module.exports = mongoose.model('Alive', Alive);
