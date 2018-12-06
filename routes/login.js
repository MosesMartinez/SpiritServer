var express = require('express');
var router = express.Router();
var createError = require('http-errors');

var db = require('../db');

router.post('/', function(req, res, next) {
    var email = req.params.email;
    var password = req.params.password;

    res.json('mytokenisjuan'+email+password);
});

module.exports = router;
