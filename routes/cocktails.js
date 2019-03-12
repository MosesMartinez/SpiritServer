var express = require('express');
var router = express.Router();
var cocktails = require('../js/liquors').liquors;

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
            alcohol = result.machine_alcohol;
            mixer = result.machine_alcohol;

            console.log("Alcohol: " + alcohol);
            console.log("Mixer: " + mixer);

            res.send({
                alcohol: alcohol,
                mixer: mixer,
            })
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
