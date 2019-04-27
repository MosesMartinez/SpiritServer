var express = require('express');
var app = express();
var apn = require('apn');

var db = require('../db');


app.get('/:token', function (req, res, next) {
    var deviceToken = req.params.token;

    var options = {
        token: {
            key: "../keys/AuthKey_494J327684.p8",
            keyId: "494J327684",
            teamId: "2X829ERV72"
        },
        production: false
    };

    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.body = "Vodka is low";
    note.title = "Spirit Machine"
    note.payload = { machine: 5, container: 1 };
    note.topic = "com.spiritmachine.Technician";

    var apnProvider = new apn.Provider(options);

    apnProvider.send(note, deviceToken)
        .then((result) => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        });
});

app.listen(5002);

