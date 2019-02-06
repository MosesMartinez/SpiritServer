var express = require('express');
var router = express.Router();
var hash = require('password-hash');
var tokenizer = require('object-hash');
var createError = require('http-errors');

var db = require('../db');

router.get('/', function(req, res) {
    console.log(req);

    res.render('signup');
});

router.post('/', function(req, res) {
    var email = req.body.email.trim();
    var password = hash.generate(req.body.password);
    var token = tokenizer(Date.now());

    let query = `
        INSERT INTO public.users(
            user_token,
            user_password,
            user_email
            )
        VALUES (
            '`+token+`',
            '`+password+`',
            '`+email+`'
            )
        RETURNING user_id
        `;

    db.any(query)
    .then( id => {
        console.log("Created User with ID: "+id[0].user_id);
        res.json(id);
    })

})

module.exports = router;