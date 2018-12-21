var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/machine/:machine/alcohol/:alcohol', function(req, res, next) {
  var machine = req.params.machine;
  var alcohol = req.params.alcohol;

  var alcoholObject = {};

  db.any(`SELECT * FROM machines WHERE machine_id=`+machine)
  .then( machine => {
    machine[0].machine_container.forEach( (container,i) => {
        if (container == alcohol) {
            alcoholObject.container = container;
            alcoholObject.type = machine[0].machine_alcohol[i];
            alcoholObject.full = machine[0].machine_full[i];
            alcoholObject.empty_time = machine[0].machine_empty_time[i].getTime()/1000;
        }
    });
    res.json(alcoholObject);
  })
  .catch( err => {
    console.log(err);
    next(createError(404));
  });
});
module.exports = router;
