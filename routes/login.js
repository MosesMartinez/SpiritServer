var express = require('express');
var router = express.Router();
var createError = require('http-errors');

var db = require('../db');

router.post('/', function(req, res, next) {
    res.json('mytokenisjuan');
});

module.exports = router;
