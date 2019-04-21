const db = require("../models");

// Defining methods for the snapController
module.exports = {
  login: function(req, res) {
    console.log(req.body);
    db.User
      .findOne(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }

};
