const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('../db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', function (req, res, next) {
  const deviceToken = req.params.token;

  const query = `SELECT user_token
                 FROM users
                 WHERE =`;

  db.any(query)
    .then(user => {
      if (user.length > 0) {
        var userJSON = {};
        userJSON.users = user[0];
        userJSON.users.user_created = userJSON.users.user_created.getTime() / 1000
        res.json(userJSON);
      }
      else
        res.json([]);
    })
    .catch(err => {
      console.log(err);
      next(createError(404));
    });
});

applicationCache.listen(5003);
