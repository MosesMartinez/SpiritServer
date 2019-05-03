const proxy = require('express-http-proxy');
const express = require('express');
const app = express();

app.use(express.static('../build'))

app.use('/api/cocktails', proxy('http://localhost:5000'));
app.use('/api/wallet', proxy('http://localhost:5001'));
app.use('/api/machines', proxy('http://localhost:5002'));
app.use('/api/users', proxy('http://localhost:5003'));
app.use('/api/signup', proxy('http://localhost:5004'));
app.use('/api/notify', proxy('http://localhost:5005'));
app.use('/api/image', proxy('http://localhost:5006'));
// app.use('/', proxy('http://localhost:3000'));

app.get('/', (req, res) => {
    app.render('index.html');
})

app.listen(80);
