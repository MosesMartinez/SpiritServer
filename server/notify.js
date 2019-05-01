const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

const db = require('../db');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

ping = (machine) => {
    const query = `
    SELECT token_push_token
    FROM tokens
    LEFT JOIN machines
    ON machine_user_id= token_user_id
    WHERE machine_id=${machine}
    ;`;

    db.any(query)
        .then(tokens => {
            let toArray = []

            console.log(tokens);

            tokens.forEach(token => {
                toArray.push({
                    "to": token.token_push_token,
                    "sound": "default",
                    "body": "Hello world!"
                });
            });

            console.log(toArray);

            axios({
                method: 'post',
                url: 'https://exp.host/--/api/v2/push/send',
                headers: {
                    'host': 'exp.host',
                    'accept': 'application/json',
                    'accept-encoding': 'gzip, deflate',
                    'content-type': 'application/json'
                },
                data: toArray
            })
                .then(resp => {
                    return resp.data;
                })
                .catch(err => {
                    return err.data;
                })
        })
}

// Ping phones
app.post('/:machine', (req, res, next) => {
    const machine = req.params.machine;

    res.send(ping(machine));
});

app.post('/', (req, res) => {
    const machine = req.body.machine;
    const token = req.body.token;
    const container = parseInt(req.body.container);

    let query = `
        SELECT machine_id
        FROM machines
        LEFT JOIN users
        ON user_id=machine_user_id
        WHERE user_token='${token}'
            AND machine_id=${machine}
    ;`;

    // Check if token matches machine id
    // by checking length of returned array
    db.any(query)
        .then(mach => {
            if (mach.length == 0) {
                res.sendStatus(404);
                return
            }

            // Update machine empty status and time
            // For correct container
            query = `
                UPDATE machines
                SET machine_empty[${container + 1}]=true, machine_empty_time[${container + 1}]=NOW()
                WHERE machine_id=${mach[0].machine_id}
                RETURNING machine_id
            ;`;
            db.any(query)
                .then(m => {

                    // Ping phones
                    ping(machine)
                    res.send("Updated " + machine);

                })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(404);
                })

        })
        .catch(err => {
            console.log(err);
            res.sendStatus(401);
        })

    // Update db
    // Join user token and machine
    // Make sure token is associated with machine

    // Call ping
})

app.listen(5005);
