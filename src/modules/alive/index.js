'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./aliveController');

router.use(function (req, res, next) {
  res.type('application/json');
  next();
});

router.param('id', controller.loadById);

router.get('/', controller.getAll);
router.post('/', controller.create);
router.route('/:id')
  .get(controller.getOne)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.deleteOne);

module.exports.router = router;
module.exports.id = 'alive';
module.exports.desc = 'alive module works !';
