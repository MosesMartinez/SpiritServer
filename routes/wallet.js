var express = require('express');
var router = express.Router();
var db = require('../db');
var aesjs = require('aes-js');
var hex64 = require('hex64');

router.post('/:nfc', function (req, res, next) {
    var nfcData = req.params.nfc;
    var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    console.log('Encrypted: ' + nfcData);

    // Convert Base64 to Hex
    var encryptedHex = hex64.decode(nfcData);

    // Decrypt encrypted NFC data
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(key);
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);

    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log(decryptedText);

    var decryptedJSON = JSON.parse(decryptedText);
    var id = decryptedJSON.id;
    var email = decryptedJSON.email;

    db.any(`SELECT user_money FROM users WHERE user_id=` + id + ` AND user_email=;` + email + `;`)
        .then(money => {
            console.log(money);
            res.json({
                id: id,
                money: money[0].user_money
            })
        });


});

module.exports = router;