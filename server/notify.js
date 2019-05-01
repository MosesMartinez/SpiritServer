const express = require('express');
const app = express();
const axios = require('axios');

const db = require('../db');

app.post('/:machine', (req, res, next) => {
    const machine = req.params.machine;

    const query = `SELECT tokens_push_token
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
                    res.send(resp.data);
                })
                .catch(err => {
                    res.sendStatus(404);
                    console.log(err.data);
                })
        })
});

app.listen(5005);
