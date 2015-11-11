'use strict';

var _ = require('lodash');
var Alive = require('./aliveModel');
var config = require('../../config/environment');

require('./aliveSocket').register(config.ws);

module.exports.loadById = function (req, res, next, id) {
	var query = Alive.findById(id);

	query.exec(function(err, alive) {
		if (err) {
			return handleError(res, err);
		}
		if (!alive) {
			return res.status(404).json('nothing for this id');
		}
		req.alive = alive;
		return next();
	});
};

module.exports.getAll = function (req, res) {

	Alive.find()
		.exec(function(err, alives) {
			if (err) {
				return handleError(res, err);
			}
			return res.status(200).json(alives);
		});

	// res.status(200).json({hell: 'yeah'});
};


module.exports.getOne = function (req, res) {
	return res.json(req.alive);
};

module.exports.create = function (req, res) {
	return handleAlive(res, new Alive(), req.body, 201);
};

module.exports.update = function (req, res) {
	return handleAlive(res, req.alive, req.body, 200);
};

module.exports.deleteOne = function (req, res) {

	var oldOne = req.alive;

	oldOne.remove(function(err) {
		if (err) {
			return handleError(res, err);
		}

		Alive.emit('alive:remove', oldOne);

		return res.sendStatus(204);
	});
};

function handleAlive(res, alive, data, status) {
	if (data._id) {
		delete data._id;
	}

	var updated = _.merge(alive, data, function(a, b) {
		if (_.isArray(a)) {
			return b;
		}
	});

	updated.save(function(err, saved) {
		if (err) {
			return handleError(res, err);
		}

		Alive.emit('alive:save', saved);
		return res.status(status).json(saved);
	});
};

function handleError(res, err) {
	return res.status(500).send(err);
};
