const pgp = require('pg-promise')();
const pgpURL = require('../keys/encryptKey').pgp;
const connection = pgp(pgpURL);

module.exports = connection;
