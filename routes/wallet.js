var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/:nfc', function (req, res, next) {
    var nfcData = req.params.nfc;

    res.json({
        id: 5,
        money: 512.34
    })
});

module.exports = router;