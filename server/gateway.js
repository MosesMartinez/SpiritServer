const proxy = require('express-http-proxy');
const app = require('express')();


app.use('/api/cocktails', proxy('http://localhost:5000'));
app.use('/api/wallet', proxy('http://localhost:5001'));
app.use('/api/machines', proxy('http://localhost:5002'));
app.use('/api/users', proxy('http://localhost:5003'));
app.use('/api/signup', proxy('http://localhost:5004'));
app.use('/api/notify', proxy('http://localhost:5005'));
app.use('/', proxy('http://localhost:3000'));

app.listen(80);
