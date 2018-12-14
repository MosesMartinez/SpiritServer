var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/:token', function(req, res, next) {
  var deviceToken = req.params.token;

  db.any(`SELECT user_id, user_email, user_created FROM users WHERE user_token='`+deviceToken+`'`)
  .then( user => {
    if (user.length > 0) {
      var userJSON = {};
      userJSON.users = user[0];
      userJSON.users.user_created = userJSON.users.user_created.getTime()/1000
      res.json(userJSON);
    }
    else
      res.json([]);
  })
  .catch( err => {
    console.log(err);
    next(createError(404));
  });
});
module.exports = router;
