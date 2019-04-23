const app = require('express')();
const db = require('../db');
// const aesjs = require('aes-js');
// const hex64 = require('hex64');
const hash = require('object-hash');

// Create new wallet
app.post('/', (req, res) => {
    const token = hash(Date.now());

    db.any(`INSERT INTO wallets(
        token, money)
        VALUES ('${token}', ${0.00}) RETURNING token;
        `)
        .then(token => {
            console.log(token[0]);
            res.send(token[0]);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

// Update balance
app.post('/:token/:newBalance', (req, res) => {
    const token = req.params.token;
    const newBalance = req.params.newBalance;

    db.any(`UPDATE wallets
	        SET money=${newBalance}
            WHERE token='${token}'
            RETURNING money;`)
        .then(money => {
            console.log(money[0]);
            res.send(money[0]);
        })
        .catch(err => {
            console.log(err);
            res.send("User not found");
        })
});

// Get money value
app.get('/:token', function (req, res, next) {
    const token = req.params.token;

    db.any(`SELECT money FROM wallets WHERE token='${token}';`)
        .then(money => {
            console.log(money[0]);
            res.send(money[0]);
        })
        .catch(err => {
            console.log(err);
            res.send("User not found");
        })

});

app.listen(5001);