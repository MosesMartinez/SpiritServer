var express = require('express');
var router = express.Router();

var db = require('../db');

router.put('/', function(req, res, next) {
  db.any()
});

module.exports = router;
