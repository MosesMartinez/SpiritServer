var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/:nfc', function (req, res, next) {
    var nfcData = req.params.nfc;

    db.any(`SELECT user_money FROM users WHERE user_id=` + nfcData + `;`)
        .then(money => {
            console.log(money);
            res.json({
                id: nfcData,
                money: money[0].user_money
            })
        });


});

module.exports = router;