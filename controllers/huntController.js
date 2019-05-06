const db = require("../models");

// Defining methods for the snapController
module.exports = {
  findAll: function(req, res) {
    db.Hunt
      .find(req.query)
      .sort({ date: -1 })
      .populate('user')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function(req, res) {
    db.Hunt
      .find({'user': req.params.userId})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Hunt
      .findById(req.params.id)
      .populate('user')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Hunt
      .create(req.body)
      .then(dbHunt => {
        console.log(dbHunt);
        return db.User.findByIdAndUpdate(req.body.userId, {$push: { createdHunts: dbHunt._id }}, { new: true });
      })
      .then(dbHunt => res.json(dbHunt))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Hunt
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Hunt
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
