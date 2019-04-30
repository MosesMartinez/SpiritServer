const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hash = require('password-hash');

const db = require('../db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', function (req, res, next) {
  const email = req.body.email.trim();
  const password = req.body.password.trim()

  const query = `
    SELECT user_token, user_password
    FROM users
    WHERE user_email='${email}'
    ;`;

  db.any(query)
    .then(result => {
      const isPassword = hash.verify(password, result[0].user_password);

      if (isPassword) {
        res.send(result[0].user_token);
      }
      else
        res.sendStatus(404);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(err);
    });
});

app.listen(5003);
