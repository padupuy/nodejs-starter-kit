'use strict';

var path = require('path');
var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  path: {
    root: path.join(path.resolve(__dirname), '..', '..', '..'),
    public: path.join(path.resolve(__dirname), '..', '..', '..', 'public'),
    modules: path.join(path.resolve(__dirname), '..', '..', '..', 'src', 'modules')
  },

  // Server port
  port: process.env.PORT || 3001,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'token-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
