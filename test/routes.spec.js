'use strict';

var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var sinon = require('sinon');
var path = require('path');

var root = process.cwd();
var app = require(root + '/src/index.js');

describe('routes', function () {

  var routes;

  beforeEach(function (done) {
    routes = require(root + '/src/routes.js');
    done();
  });

  describe('init', function () {
    it('should return all modules', function (done) {

      request(app)
        .get('/modules/')
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(2);
          done();
        });
    });

    it('should return a 404 error if the module doesnt exist', function (done) {

      request(app)
        .get('/johnsnow')
        .end(function (err, res) {
          expect(res.status).to.equal(404);

          done();
        });
    });

    it('should return a module if it exists', function (done) {

      request(app)
        .get('/alive/')
        .end(function (err, res) {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('registerModule', function () {
    it('should register module if it exists', function (done) {
      routes.unregisterModulesRoutes();

      var result = routes.registerModule(app, 'alive')

      expect(result.route).to.equal('/alive/');
      expect(result.error).to.equal(undefined);

      done();
    });

    it('should not register module if it not expose router', function (done) {
      routes.unregisterModulesRoutes();

      var result = routes.registerModule(app, 'kaput')

      expect(result.error).not.to.equal(undefined);

      done();
    });

  });

});
