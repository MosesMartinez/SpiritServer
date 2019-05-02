const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');

const db = require('../db');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

ping = (machine, container) => {
    const query = `
    SELECT token_push_token, machine_alcohol
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
                    "sound": 'default',
                    "title": `${token.machine_alcohol[container]} Low!`,
                    "body": `Machine #${machine} - Container ${container + 1}`
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


app.post('/empty', (req, res) => {
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
            ;`;
            db.any(query)
                .then(() => {

                    // Ping phones
                    ping(machine, container)
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
})

app.post('/full', (req, res) => {
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
                SET machine_empty[${container + 1}]=false
                WHERE machine_id=${mach[0].machine_id}
            ;`;
            db.any(query)
                .then(() => {

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

})

app.listen(5005);
