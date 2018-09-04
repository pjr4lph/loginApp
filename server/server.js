const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const controller = require('../static/controller.js');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const dbURI = 'mongodb://ralph:pjr4lph@ds151558.mlab.com:51558/ralphs';

mongoose.connect(dbURI, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connected to Database');
});

app.use((req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, '../build')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // res.render('../pages/index.ejs');
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/webpack-bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname , '../build/webpack-bundle.js'));
});

app.post('/submit', (req, res, next) => {
  console.log('the body in request is: ', req.body);
  next();
}, controller.checkCache, controller.auth);

const options = {
  key: fs.readFileSync(path.join(__dirname, 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'server.cert'))
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`https up and listening on port ${PORT}`);
});

// notes on why current cert doesnt (exactly) work ~ it is self certified and not registered/authorized
// and therefor not considered valid by browsers (is there and accessible tho)

// notes on why https/http2 wont work ~ Even if you have the DNS resolution in your
// local hosts file, this won’t work, as the domain will be verified from outside.
// So if you’re doing this locally, it will most likely not work at all, unless
// you opened up a port from your local machine to the outside and have it running
// behind a domain name which resolves to your machine, which is a highly unlikely scenario
// basically - need an actual domain name to use cerbot/webroot to get free certifications

// ngrok.io
