var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var postdate = require('postgres-date');

var db = require('../db');

router.get('/:token/machines/:machine', function(req, res, next) {
    var deviceToken = req.params.token;
    var machineID = parseInt(req.params.machine);

    db.any(`SELECT user_id FROM users WHERE user_token='`+deviceToken+`'`)
    .then( user => db.any(`SELECT * FROM machines WHERE machine_id=`+machineID)
    .then( machine => {
        if (machine[0].machine_user_id != user[0].user_id) {
            next(createError(401));
            return;
        }

        let mach = {};
        mach.id = machine[0].machine_id;
        mach.alcohol = new Array(machine[0].machine_full.length);
        machine[0].machine_alcohol.forEach( (element,i) => {
            let alc = 
                {type: element,
                 full: machine[0].machine_full[i],
                 container: machine[0].machine_container[i],
                 empty_time: machine[0].machine_empty_time[i]};
            mach.alcohol[i] = alc;
        });
        res.json(mach);
    })
    .catch( err => {
        next(createError(404));
    }));
});

router.get('/:token', function(req, res, next) {
    var deviceToken = req.params.token.replace(/\ /g, '');

    db.any(`SELECT user_id FROM users WHERE user_token='`+deviceToken+`'`)
    .then( user => {
        if (user.length == 0) {
            next(createError(404));
            return;
        }

        db.any(`SELECT * FROM machines WHERE machine_user_id=`+user[0].user_id)
        .then( machines => {
            let mach = new Array();
            machines.forEach( (curMach,i) => {
                mach.push({id: curMach.machine_id,
                           alcohol: new Array()});

                for (let j = 0; j < machines[i].machine_alcohol.length; ++j) {
                    var seconds = machines[i].machine_empty_time[j].getTime()/1000;
                    console.log(seconds);
                    let alc = {type: machines[i].machine_alcohol[j],
                               full: machines[i].machine_full[j],
                               container: machines[i].machine_container[j],
                               empty_time: seconds};
                    mach[i].alcohol.push(alc);
                }

            });

            machines = {};
            machines.machines = mach;
            res.json(machines);

        })
        .catch( err => {

            next(createError(404));

        });
    });
});

module.exports = router;
