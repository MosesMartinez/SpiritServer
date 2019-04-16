let express = require('express');
let router = express.Router();
let db = require('../db');
let aesjs = require('aes-js');
let hex64 = require('hex64');
let key = require('../keys/encryptKey').key;

router.post('/:nfc', function (req, res, next) {
    let nfcID = req.params.nfc;
    console.log(key);

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
            let jsonBytes = aesjs.utils.utf8.toBytes(jsonString);

            // The counter is optional, and if omitted will begin at 1
            let aesCtr = new aesjs.ModeOfOperation.ctr(key);
            let encryptedBytes = aesCtr.encrypt(jsonBytes);
            console.log('JSON bytes: ' + jsonBytes);

            // To print or store the binary data, you may convert it to hex
            let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            console.log('Hex: ' + encryptedHex);
            let encryptedBase64 = hex64.encode(encryptedHex);
            console.log('Base64: ' + encryptedBase64);

            let newEncryptedHex = hex64.decode(encryptedBase64);
            console.log('New Hex: ' + newEncryptedHex);

            let encryptedBytes = aesjs.utils.hex.toBytes(newEncryptedHex);

            // The counter mode of operation maintains internal state, so to
            // decrypt a new instance must be instantiated.
            let aesCtr = new aesjs.ModeOfOperation.ctr(key);
            let decryptedBytes = aesCtr.decrypt(encryptedBytes);

            // Convert our bytes back into text
            let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
            console.log(decryptedText);

            //let decryptedJSON = JSON.parse(decryptedText);
            console.log('Decrypted is: ' + decryptedText);

            res.send(encryptedBase64);
        });


});

module.exports = router;