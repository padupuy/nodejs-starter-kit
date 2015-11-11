'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.status(500).json({youshallnot: 'pass'});
});

//BAD EXPORT
module.exports = router;

//MUST BE
// module.exports.router = router;
// module.exports.id = 'kaput';
// module.exports.desc = 'kaput module will never work';
