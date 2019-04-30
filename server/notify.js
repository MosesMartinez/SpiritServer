const express = require('express');
const app = express();
const axios = require('axios');

const db = require('../db');

app.post('/:machine', (req, res, next) => {
    const machine = req.params.machine;

    const query = `
        SELECT token_push_token
        FROM tokens
        INNER JOIN machines ON token_user_id=machine_user_id;
    `;

    db.any(query)
        .then(tokens => {
            let toArray = []

            tokens.forEach(token => {
                toArray.push(token.token_push_token);
            });

            axios.post('https://exp.host/--/api/v2/push/send', {
                headers: {
                    'host': 'exp.host',
                    'accept': 'application/json',
                    'accept-encoding': 'gzip, deflate',
                    'content-type': 'application/json',
                },
                toArray
            })
                .then(resp => {
                    console.log(resp);
                })
                .catch(err => {
                    console.log(err);
                })
        })
});

app.listen(5005);
