var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', function (req, res, next) {
    const user = req.query.user;
    const machine = req.query.machine;
    let alcohols = req.query.alcohols.split(',');
    let mixers = req.query.mixers.split(',');

    console.log(alcohols);
    console.log(mixers);


    const queryStr =
        `UPDATE machines SET machine_id = ` + machine
        + `, machine_user_id = ` + user
        + `, machine_alcohol = ARRAY['`
        + alcohols[0] + `','`
        + alcohols[1] + `','`
        + alcohols[2] + `','`
        + alcohols[3]
        + `'], machine_mixer = ARRAY['`
        + mixers[0] + `','`
        + mixers[1] + `','`
        + mixers[2] + `','`
        + mixers[3]
        + `'] WHERE machine_id = `
        + machine + `; `
        + `SELECT * FROM machines WHERE machine_id = ` + machine + `;`;

    console.log(queryStr);

    db.any(queryStr)
        .then(machine => {
            res.json(machine[0]);
        })
        .catch(err => {
            const queryStr2 =
                `INSERT INTO machines (machine_id, machine_user_id, machine_alcohol, machine_mixer, machine_empty, machine_empty_time) `
                + `VALUES (` + machine + `, `
                + `` + user + `, `
                + `ARRAY['`
                + alcohols[0] + `','`
                + alcohols[1] + `','`
                + alcohols[2] + `','`
                + alcohols[3] + `'], `
                + `ARRAY['`
                + mixers[0] + `','`
                + mixers[1] + `','`
                + mixers[2] + `','`
                + mixers[3] + `'], `
                + `ARRAY[false, false, false, false], `
                + `ARRAY[now(), now(), now(), now()]); `
                + `SELECT * FROM machines WHERE machine_id = ` + machine + `;`;

            db.any(queryStr2)
                .then(mach => {
                    res.json(mach[0]);
                })
                .catch(err => {
                    res.send("Nope: \n" + err);
                })
        });
});
module.exports = router;