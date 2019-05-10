const db = require("../models");

// Defining methods for the snapController
module.exports = {
  findAll: function(req, res) {
    db.Hunt
      .find(req.query)
      .sort({ date: -1 })
      .populate('user', 'username')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllWithin: function(req, res) {
    const loc = [req.query.lng, req.query.lat]
    db.Hunt
      .find({
        location: {
          $geoWithin: {
            $center: [ loc, 1.5/69.04117454 ]
            // $center: [ [-81.3116759, 28.5436103], 1/69.04117454 ]
          }
        }
      })
      .limit(10)
      .sort({ date: -1 })
      .populate('user', 'username')
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
      .populate('user', 'username')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body);
    db.Hunt
      .create(req.body)
      .then(dbHunt => {
        console.log(dbHunt);
        db.User.findByIdAndUpdate(req.body.userId, {$push: { createdHunts: dbHunt._id }}, { new: true })
        .then(dbUser => {
          res.json(dbHunt)
        })
      })
      // .then(dbHunt => res.json(dbHunt))
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
