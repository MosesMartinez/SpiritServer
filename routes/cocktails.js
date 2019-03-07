var express = require('express');
var router = express.Router();
var cocktails = require('../js/liquors');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let alcohols = req.query.alcohols.split(',');
    let mixers = req.query.mixers.split(',');

    console.log(alcohols);
    console.log(mixers);

    let cocktailSet = new Set();

    alcohols.forEach(alc => {
        console.log("In first loop: " + alc);
        mixers.forEach(mix => {
            console.log("In second loop: " + mix);
            cocktails.forEach(coc => {
                console.log("In third loop: " + coc);
                console.log(coc.alcohols.includes(alc));
                console.log(coc.mixers.includes(mix));
                if (coc.alcohols.includes(alc) && coc.mixers.includes(mix)) {
                    console.log("Adding " + coc.name);
                    cocktailSet.add(coc);
                }
            });
        });
    });

    let cocktailArray = Array.from(cocktailSet);

    console.log(cocktailArray);

    res.send(cocktailArray);
});

module.exports = router;
