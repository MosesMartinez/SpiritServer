var express = require('express');
var router = express.Router();
var cocktails = require('../js/liquors').liquors;
var db = require('../db');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let alcohols = req.query.alcohols.split(',');
    let mixers = req.query.mixers.split(',');

    console.log(alcohols);
    console.log(mixers);
    console.log(cocktails);

    let cocktailSet = new Set();

    alcohols.forEach(alc => {
        mixers.forEach(mix => {
            cocktails.forEach(coc => {
                console.log(coc.alcohols.includes(alc));
                console.log(coc.mixers.includes(mix));
                if (coc.alcohols.includes(alc) && coc.mixers.includes(mix)) {
                    cocktailSet.add(coc);
                }
            });
        });
    });

    let cocktailArray = Array.from(cocktailSet);

    console.log(cocktailArray);

    res.send(cocktailArray);
});

router.get('/:machine/', function (req, res, next) {
    let machine = req.params.machine;

    // Make sure no SQL injection
    if (!Number.isInteger(parseInt(machine))) {
        res.send("Not a valid input");
        return;
    }

    db.any(`SELECT machine_alcohol, machine_mixer FROM machines WHERE machine_id = ` + machine + `;`)
        .then(result => {
            alcohols = result[0].machine_alcohol;
            mixers = result[0].machine_mixer;

            console.log("Alcohol: " + alcohols);
            console.log("Mixer: " + mixers);

            let cocktailSet = new Set();

            alcohols.forEach(alc => {
                mixers.forEach(mix => {
                    cocktails.forEach(coc => {
                        console.log(coc.alcohols.includes(alc));
                        console.log(coc.mixers.includes(mix));
                        if (coc.alcohols.includes(alc) && coc.mixers.includes(mix)) {
                            cocktailSet.add(coc);
                        }
                    });
                });
            });

            let cocktailArray = Array.from(cocktailSet);

            console.log(cocktailArray);

            res.send(cocktailArray);

        })
        .catch(err => {
            console.log(err);
        });

    // let cocktailSet = new Set();

    // alcohols.forEach(alc => {
    //     console.log("In first loop: " + alc);
    //     mixers.forEach(mix => {
    //         console.log("In second loop: " + mix);
    //         cocktails.forEach(coc => {
    //             console.log("In third loop: " + coc);
    //             console.log(coc.alcohols.includes(alc));
    //             console.log(coc.mixers.includes(mix));
    //             if (coc.alcohols.includes(alc) && coc.mixers.includes(mix)) {
    //                 console.log("Adding " + coc.name);
    //                 cocktailSet.add(coc);
    //             }
    //         });
    //     });
    // });

    // let cocktailArray = Array.from(cocktailSet);

    // console.log(cocktailArray);

    // res.send(cocktailArray);
});

module.exports = router;
