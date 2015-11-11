/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Alive = require('./aliveModel');

exports.register = function(ws) {
	Alive.on('alive:save', function(data) {
		ws.emit('alive:save', data);
	});
	Alive.on('alive:remove', function(data) {
		ws.emit('alive:remove', data);
	});
};
