var express = require('express');
var router = express.Router();
var hash = require('password-hash');
var createError = require('http-errors');

var db = require('../db');

router.post('/', function(req, res, next) {
    var email = req.body.email.trim();

    db.any(`SELECT * FROM users WHERE user_email='`+email+`'`)
    .then( user => {
        if (user.length > 0 && hash.verify(req.body.password, user[0].user_password))
            res.json(user[0].user_token);
        else {
            next(createError(401));
        }
    })
});

module.exports = router;
