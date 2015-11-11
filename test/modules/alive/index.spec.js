var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var root = process.cwd();
var config = require(root + '/src/config/environment');
var app = require(root + '/src/index.js');
var controller = require(root + '/src/modules/alive/aliveController.js');
var Model = require(root + '/src/modules/alive/aliveModel.js');

describe('aliveController', function() {

	var alive = {
		name: "Test"
	};

	afterEach(function(done) {
		Model.remove({}, function() {
			done();
		});
	});


	describe('create', function() {

		it('should create one', function(done) {

			request(app)
				.post('/alive/')
				.send(alive)
				.end(function(err, res) {
					expect(res.status).to.equal(201);
					expect(res.body.name).to.equal(alive.name);

					done();
				});
		});
	});

	describe('update', function() {
		var oldModel;
		beforeEach(function(done) {
			oldModel = new Model(alive);
			oldModel.save(done);
		});

		it('should update one', function(done) {

			var newOne = {
				name: "New"
			};

			request(app)
				.put('/alive/' + oldModel._id)
				.send(newOne)
				.end(function(err, res) {
					expect(res.status).to.equal(200);
					expect(res.body.name).to.equal(newOne.name);
					done();
				});
		});
	});

	describe('deleteOne', function() {
		var model;
		beforeEach(function(done) {
			model = new Model(alive);
			model.save(done);
		});

		it('should delete one', function(done) {
			request(app)
				.del('/alive/' + model._id)
				.end(function(err, res) {
					expect(res.status).to.equal(204);

					done();
				});
		});
	});

	describe('getAll', function() {
		beforeEach(function(done) {
			var alive2 = {
				name: "alive 2"
			};
			Model.create([alive, alive2], function(err) {
				if (err) throw err;
				done();
			});
		});

		it('should return all', function(done) {
			request(app)
				.get('/alive/')
				.end(function(err, res) {
					expect(res.status).to.equal(200);
					expect(res.body.length).to.equal(2);
					done();
				});
		});
	});

});
