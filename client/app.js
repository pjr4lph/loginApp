const DB = {username: 'Ralph', password: 'pw'};

const controller = {};

controller.auth = function(req, res) {
  if (req.body.username === DB.username && req.body.password === DB.password) {
    res.render('../pages/accepted.ejs');
  } else {
    res.render('../pages/denied.ejs');
  }
}

module.exports = controller;
