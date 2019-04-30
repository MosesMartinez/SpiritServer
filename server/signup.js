const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hash = require('password-hash');
const tokenizer = require('object-hash');

const db = require('../db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', function (req, res, next) {
  const email = req.body.email;
  const password = hash.generate(req.body.password.trim());
  const token = tokenizer(Date.now());

  const query = `
    INSERT INTO users
      (user_email, user_password, user_token)
    VALUES
      ('${email}', '${password}', '${token}')
    RETURNING user_token
    ;`;

  db.any(query)
    .then(token => {
      res.send(token[0])
    })
    .catch(err => {
      console.log(err);
      next(createError(404));
    });
});

app.listen(5004);
