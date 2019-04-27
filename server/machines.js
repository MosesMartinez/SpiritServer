let app = require('express')();
// let bodyParser = require('body-parser');
let db = require('../db');

app.get('/:token', (req, res) => {
    const token = req.params.token;

    const query = `
    SELECT machine_id, machine_empty, machine_empty_time, machine_alcohol, machine_mixer, user_token
    FROM machines
    INNER JOIN users ON machine_user_id=user_id
    WHERE user_token='${token}'
    ORDER BY machine_id ASC;
    `;

    db.any(query)
        .then(result => {
            console.log("Got data");
            res.send(result);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
});

app.listen(5002);