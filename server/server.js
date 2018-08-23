const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const controller = require('../client/app.js');

app.use((req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('../index.ejs', {
    access: ''
  });
});

app.post('/submit', controller.auth);

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});
