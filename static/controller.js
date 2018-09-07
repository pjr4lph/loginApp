const User = require('./model.js');
const client = require('../redis.js');
const redis = require('redis');

const controller = {};

controller.checkCache = function(req, res, next) {
  client.get(req.body.username, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } if (result === req.body.password) {
      console.log('in check cache');
      res.sendStatus(200);
    } else {
      next();
    }
  });
}

controller.auth = function(req, res) {
  User.find({ username: req.body.username }, (err, docs) => {
    if (err) res.send(err);
    if (docs[0] === undefined) {
      res.sendStatus(404);
    } else if (docs[0].password === req.body.password) {
      // 1000 seconds ~ 17 minutes
      client.setex(req.body.username, 1000, req.body.password, redis.print);
      res.sendStatus(200);
    }
  });
}


module.exports = controller;
