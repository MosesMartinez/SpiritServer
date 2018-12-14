var express = require('express');
var router = express.Router();
var apn = require('apn');

var db = require('../db');


router.get('/:token', function(req, res, next) {
    var deviceToken = req.params.token;

    // db.any(`SELECT * FROM users`)
    // .then( user => {
    //     res.send(user);
    // })


    var options = {
        token: {
            key: "keys/AuthKey_494J327684.p8",
            keyId: "494J327684",
            teamId: "2X829ERV72"
        },
        production: false
    };
    
    var apnProvider = new apn.Provider(options);

    let deviceToken = "90A6B007CF19B00A63A8820B2582632240B1341B9178F53870C4184BB680E2D2"

    var note = new apn.Notification();
    
    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.body = "Vodka is low";
    note.title = "Spirit Machine"
    note.payload = {'messageFrom': 'John Appleseed'};
    note.topic = "com.spiritmachine.SpiritMachineTechnician";

    res.json(note);

    apnProvider.send(note, deviceToken).then( (result) => {
        console.log(result);
    });
});

module.exports = router;

