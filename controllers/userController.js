const db = require("../models");

// Defining methods for the snapController
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      // .sort({ date: -1 })
      .populate("snaps")
      .populate("createdHunts")
      .populate("completedHunts")
      // .populate("inProgressHunts")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .populate("snaps")
      .populate("createdHunts")
      .populate("completedHunts")
      // .populate("inProgressHunts")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      // .catch(err => res.status(422).json(err));
      .catch(err => res.json(err).status(422));
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addHunt: function(req, res) {
    console.log(req.body)
    db.User
      .findOneAndUpdate({ _id: req.params.id }, {$addToSet: {inProgressHunts: req.body}}, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateHunt: function(req, res) {
    console.log(req.body.huntId)
    db.User
      .findOneAndUpdate({ _id: req.params.id, "inProgressHunts._id": req.body._id }, {$set: {"inProgressHunts.$.keywords": req.body.keywords}}, { new: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
