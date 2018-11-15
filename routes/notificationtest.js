var express = require('express');
var router = express.Router();
var apn = require('apn');


router.get('/:token', function(req, res, next) {
    var deviceToken = req.params.token;
    var options = {
        token: {
            key: "keys/AuthKey_494J327684.p8",
            keyId: "494J327684",
            teamId: "2X829ERV72"
        },
        production: false
    };
    
    var apnProvider = new apn.Provider(options);

    // let deviceToken = "95333529ED1F2B665C9A42A227057089D575A5643E1D6D71F4038E576D25144D"

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

