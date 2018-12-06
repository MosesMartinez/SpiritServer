var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/:token', function(req, res, next) {
    var deviceToken = req.params.token;
});

module.exports = router;
