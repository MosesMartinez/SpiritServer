var express = require('express');
var router = express.Router();
var cocktails = require('../js/liquors');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let alcohols = req.query.alcohols.split(',');
    let mixers = req.query.mixers.split(',');

    let cocktailSet = new Set();

    alcohols.forEach(alc => {
        mixers.forEach(mix => {
            cocktails.forEach(coc => {
                if (coc.alcohols.includes(alc) && coc.mixers.includes(mix)) {
                    cocktailSet.add(coc);
                }
            });
        });
    });

    let cocktailArray = Array.from(cocktailSet);

    res.send(cocktailArray);
});

module.exports = router;
