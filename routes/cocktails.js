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

            let cocktailObj = []

            // [
            //     {
            //         alcohol: null,
            //         cocktails: [
            //             {
            //                 name: null,
            //                 price: null,
            //                 image: null,
            //             },
            //         ]
            //     }
            // ]

            alcohols.forEach(alc => {
                cocktailObj.push(
                    {
                        alcohol: alc,
                        cocktails: [],
                    }
                );
            });

            cocktailObj.forEach((cocObj, alcNum) => {
                mixers.forEach((mix, mixNum) => {
                    cocktails.forEach(coc => {
                        if (coc.alcohols.includes(cocObj.alcohol) && coc.mixers.includes(mix)) {
                            let curCocktail =
                            {
                                name: coc.name,
                                price: 5.00,
                                image: coc.image,
                                alcohol: {
                                    name: alc,
                                    container: alcNum,
                                },
                                mixer: {
                                    name: mix,
                                    container: mixNum,
                                },
                            };
                            cocObj.cocktails.push(curCocktail);
                        }
                    });
                });
            });

            console.log(cocktailObj);

            res.send(cocktailObj);

        })
        .catch(err => {
            console.log(err);
        });

});

module.exports = router;
