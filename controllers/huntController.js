const db = require("../models");

// Defining methods for the snapController
module.exports = {
  findAll: function(req, res) {
    db.Hunt
      .find(req.query)
      .sort({ date: -1 })
      .populate('userId')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function(req, res) {
    db.Hunt
      .find({'userId': req.params.userId})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Hunt
      .findById(req.params.id)
      .populate('userId')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Hunt
      .create(req.body)
      .then(function(dbHunt) {
        console.log(dbHunt);
        return db.User.findByIdAndUpdate(req.body.userId, {$push: { createdHunts: dbHunt._id }}, { new: true });
      })
      .then(dbModel => res.json(dbModel))
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
