const db = require("../models");
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API_KEY
});

// Defining methods for the snapController
module.exports = {
  findAll: function(req, res) {
    db.Snap
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function(req, res) {
    db.Snap
      .findById(req.params.userId)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Snap
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    const {imageUrl, imageData, location, authId, huntId} = req.body;
    app.inputs.create({
      base64: imageData,
      geo: { latitude: location.lat, longitude: location.lng },
    }).then(
      function(response) {
        console.log(response);
        console.log('Upload successful');
        // this will need to be inside the clarifai .then statement
        db.Snap
          .create(req.body) // will need to be an object
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      function(err) {
        console.log('there was an error');
      }
    );
  },
  update: function(req, res) {
    db.Snap
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Snap
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
