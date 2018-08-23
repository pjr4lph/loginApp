const DB = {username: 'Ralph', password: 'pw'};

const controller = {};

controller.auth = function(req, res) {
  if (req.body.username === DB.username && req.body.password === DB.password) {
    res.render('../index.ejs', {
      access: 'GRANTED'
    });
  } else {
    res.render('../index.ejs', {
      access: 'DENIED'
    });
  }
}

module.exports = controller;
