const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hash = require('password-hash');

const db = require('../db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', function (req, res, next) {
  const email = req.body.email;
  const password = hash.generate(req.body.password.trim());

  const query = `
    SELECT user_token, user_password
    FROM users
    WHERE user_email='${email}'
    ;`;

  db.any(query)
    .then(result => {
      const isPassword = hash.verify(result[0].user_password, password);

      if (isPassword) {
        console.log(result);
        res.send(result[0].user_token);
      }
      else
        next(createError(404));
    })
    .catch(err => {
      console.log(err);
      next(createError(404));
    });
});

app.listen(5003);
