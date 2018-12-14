var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/:token', function(req, res, next) {
  var deviceToken = req.params.token;

  db.any(`SELECT user_id, user_email, user_created FROM users WHERE user_token='`+deviceToken+`'`)
  .then( user => {
      res.json(user[]);
  })
  .catch( err => {
      next(createError(404));
  });
});
module.exports = router;
