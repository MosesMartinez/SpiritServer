const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hash = require('password-hash');

const db = require('../db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', function (req, res, next) {
  const email = req.body.email;
  const password = hash.generate(req.body.password);
  console.log('email: ' + email);
  console.log('password: ' + password);

  const query = `
    SELECT user_token
    FROM users
    WHERE user_email='${email}'
      AND user_password='${password}'
    `;

  db.any(query)
    .then(token => {
      console.log(token);
      res.send(token[0])
    })
    .catch(err => {
      console.log(err);
      next(createError(404));
    });
});

app.listen(5003);
