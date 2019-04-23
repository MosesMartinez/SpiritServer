let app = require('express')();
let db = require('../db');
let aesjs = require('aes-js');
let hex64 = require('hex64');

app.post('/:nfc', function (req, res, next) {
    let nfcData = req.params.nfc;
    let key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    console.log('Encrypted: ' + nfcData);

    // Convert Base64 to Hex
    //let encryptedHex = hex64.decode(nfcData);

    // Decrypt encrypted NFC data
    let encryptedBytes = aesjs.utils.hex.toBytes(nfcData);
    console.log("Became bytes");
    console.log("Bytes:\b" + encryptedBytes);

    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    let aesCtr = new aesjs.ModeOfOperation.ctr(key);
    console.log("new aesCtr made");
    let decryptedBytes = aesCtr.decrypt(encryptedBytes);
    console.log("Decrypted bytes");

    // Convert our bytes back into text
    let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log("Decrypted text; " + decryptedText);

    let decryptedJSON = JSON.parse(decryptedText);
    let id = decryptedJSON.id;
    let email = decryptedJSON.email;

    db.any(`SELECT user_money FROM users WHERE user_id=` + id + ` AND user_email='` + email + `';`)
        .then(money => {
            console.log(money);
            res.json({
                id: id,
                money: money[0].user_money
            })
        });


});

app.listen(5001);