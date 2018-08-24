// const DB = {username: 'Ralph', password: 'pw'};
const User = require('./model.js');
const client = require('../redis.js');
const redis = require('redis');

const controller = {};

// controller.auth = function(req, res) {
//   if (req.body.username === DB.username && req.body.password === DB.password) {
//     res.render('../pages/accepted.ejs');
//   } else {
//     res.render('../pages/denied.ejs');
//   }
// }

//  according to consolelogs redis cache is working, should check in command line to see
//  if username and password is present
controller.auth = function(req, res) {
  client.get(req.body.username, (err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } if (result === req.body.password) {
      console.log('redis cache checked');
      res.render('../pages/accepted.ejs');
    } else {
      User.find({ username: req.body.username }, (err, docs) => {
        if (err) res.send(err);
        if (docs[0] === undefined) {
          res.render('../pages/denied.ejs');
        } else if (docs[0].password === req.body.password) {
          // if true u/p saved to redis cache.. but what we want is for redis to
          // to be accessed before mongo
          client.set(req.body.username, req.body.password, redis.print);
          res.render('../pages/accepted.ejs');
        }
      });
    }
  });
}

module.exports = controller;
