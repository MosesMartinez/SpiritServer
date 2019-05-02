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
  console.log(req.body.pushToken);

  const query = `
    SELECT user_token, user_password, user_id
    FROM users
    WHERE user_email='${email}'
    ;`;

  db.any(query)
    .then(result => {
      const isPassword = hash.verify(password, result[0].user_password);

      if (isPassword) {

        // Insert push token if exists
        if (req.body.pushToken) {
          const query2 = `
          INSERT INTO tokens (token_user_id, token_push_token)
          SELECT ${result[0].user_id}, '${req.body.pushToken}'
          WHERE
            NOT EXISTS (
              SELECT token_push_token
              FROM tokens
              WHERE token_push_token='${req.body.pushToken}'
            )
          ;
          `;
          db.query(query2)
            .then(() => {
              console.log('Push token inserted')
            })
            .catch(err => {
              console.log(err);
            })
        }
        //////////

        res.json({
          token: result[0].user_token,
        });
      }
      else
        res.sendStatus(404);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(err);
    });
});

app.post('/logout', (req, res) => {
  const token = req.body.token;

  let query = `
    SELECT user_id
    FROM users
    WHERE user_token='${token}'
  ;`

  db.any(query)
    .then(ids => {
      query = `
        DELETE FROM tokens
        WHERE token_user_id=${ids[0].user_id}
        RETURNING token_push_token
      ;`
      db.any(query)
        .then(pushTokens => {
          console.log(`Removed ${pushTokens[0].token_push_token}`);
          res.sendStatus(200);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(404);
        })
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(404);
    })
})

app.listen(5003);
