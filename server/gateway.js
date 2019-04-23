const proxy = require('express-http-proxy');
const app = require('express')();

app.use('/api/cocktails', proxy('http://localhost:5000'));
app.use('/api/wallet', proxy('http://localhost:5001'));
app.use('/', proxy('http://localhost:3000'));

app.listen(80);
