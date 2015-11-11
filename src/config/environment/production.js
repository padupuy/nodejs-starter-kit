'use strict';

// Production specific configuration
// ==================================
module.exports = {
  port: 3001,
  // MongoDB connection options
	mongo: {
		uri: 'mongodb://localhost/databasename'
	}
};
