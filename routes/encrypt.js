var express = require('express');
var router = express.Router();
var db = require('../db');
var aesjs = require('aes-js');

router.post('/:nfc', function (req, res, next) {
    var nfcID = req.params.nfc;

    // AES128 Encryption
    // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
    var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];



    db.any(`SELECT user_email FROM users WHERE user_id=` + nfcID + `;`)
        .then(email => {
            console.log(email);

            jsonData = {
                id: nfcID,
                email: email[0].user_email
            }

            jsonString = JSON.stringify(jsonData);

            console.log("JSON String: " + jsonString);

            // Convert text to bytes
            var jsonBytes = aesjs.utils.utf8.toBytes(jsonString);

            // The counter is optional, and if omitted will begin at 1
            var aesCtr = new aesjs.ModeOfOperation.ctr(key);
            var encryptedBytes = aesCtr.encrypt(jsonBytes);

            // To print or store the binary data, you may convert it to hex
            var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            console.log(encryptedHex);

            res.send(encryptedHex);
        });


});

module.exports = router;