var express = require('express');
var router = express.Router();
var createError = require('http-errors');

var db = require('../db');

router.post('/', function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    db.any(`SELECT * FROM users WHERE user_email='`+email+`' AND user_password='`+password+`'`)
    .then( user => {
        if (user.length > 0)
            res.json(user[0].user_token);
        else {
            next(createError(401));
        }
    })
});

module.exports = router;
