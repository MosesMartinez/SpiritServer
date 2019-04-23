let app = require('express')();
let bodyParser = require('body-parser');
let cocktails = require('../js/liquors').liquors;
let db = require('../db');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res, next) {
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

    cocktailArray.forEach((cocktail, index) => {
        cocktail.index = index;
    });

    console.log(cocktailArray);

    res.send(cocktailArray);
});

// app.get('/:machine/', function (req, res, next) {
//     let machine = req.params.machine;

//     // Make sure no SQL injection
//     if (!Number.isInteger(parseInt(machine))) {
//         res.send("Not a valid input");
//         return;
//     }

//     db.any(`SELECT machine_alcohol, machine_mixer FROM machines WHERE machine_id = ` + machine + `;`)
//         .then(result => {
//             alcohols = result[0].machine_alcohol;
//             mixers = result[0].machine_mixer;

//             console.log("Alcohol: " + alcohols);
//             console.log("Mixer: " + mixers);

//             let cocktailObj = []

//             // [
//             //     {
//             //         alcohol: null,
//             //         cocktails: [
//             //             {
//             //                 name: null,
//             //                 price: null,
//             //                 image: null,
//             //             },
//             //         ]
//             //     }
//             // ]

//             alcohols.forEach(alc => {
//                 cocktailObj.push(
//                     {
//                         alcohol: alc,
//                         cocktails: [],
//                     }
//                 );
//             });

//             cocktailObj.forEach((cocObj, alcNum) => {
//                 mixers.forEach((mix, mixNum) => {
//                     cocktails.forEach(coc => {
//                         if (coc.alcohols.includes(cocObj.alcohol) && coc.mixers.includes(mix)) {
//                             const curCocktail =
//                             {
//                                 name: coc.name,
//                                 price: 5.00,
//                                 image: coc.image,
//                                 alcohol: {
//                                     name: cocObj.alcohol,
//                                     container: alcNum,
//                                 },
//                                 mixer: {
//                                     name: mix,
//                                     container: mixNum,
//                                 },
//                             };

//                             if (!cocObj.cocktails.includes(curCocktail))
//                                 cocObj.cocktails.push(curCocktail);
//                         }
//                     });
//                 });

//                 // Sort by name
//                 cocObj.cocktails.sort((a, b) => {
//                     return a.name.localeCompare(b.name);
//                 });

//                 // Remove duplicates
//                 for (let i = 0; cocObj.cocktails[i] != null; ++i) {
//                     if (cocObj.cocktails[i + 1] != null &&
//                         cocObj.cocktails[i].name == cocObj.cocktails[i + 1].name) {
//                         cocObj.cocktails.splice(i + 1, 1);
//                         --i;
//                     }
//                 }
//             });

//             console.log(cocktailObj);

//             res.send(cocktailObj);

//         })
//         .catch(err => {
//             console.log(err);
//         });

// });

app.get('/:machine', (req, res) => {
    let machine = req.params.machine;

    db.any(`SELECT machine_cocktails
            FROM machines
            WHERE machine_id=${machine};`)
        .then((cocktail) => {
            cocktail = cocktail[0].machine_cocktails;
            cocktail = JSON.parse(cocktail);
            res.send(cocktail)
        })
        .catch(err => {
            console.log(err);
            res.send('Could not get cocktails');
        });
})

app.post('/:machine', (req, res) => {
    let machine = req.params.machine;
    let cocktails = req.body.cocktails;

    db.any(`UPDATE machines
	        SET machine_cocktails='${cocktails}'
	        WHERE machine_id=${machine};`)
        .then(() => {
            res.send('Successfully added cocktails')
        })
        .catch(err => {
            console.log(err);
            res.send('Could not add cocktails');
        });

})

app.listen(5000);
