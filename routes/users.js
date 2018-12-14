var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/:token', function(req, res, next) {
  var deviceToken = req.params.token;

  db.any(`SELECT user_id, user_email, user_created FROM users WHERE user_token='`+deviceToken+`'`)
  .then( user => {
    if (user.length > 0)
      res.json(user[0]);
    else
      res.json([]);
  })
  .catch( err => {
      next(createError(404));
  });
});
module.exports = router;
