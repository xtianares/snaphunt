const db = require("../models");
const Clarifai = require('clarifai');
require('dotenv').config();

const ClarifaiApp = new Clarifai.App({
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
    const {imageData, location, authId, huntId, keyword} = req.body;
    // console.log(req.body);
    ClarifaiApp.inputs.create({
      base64: imageData.replace('data:image/jpeg;base64,', ''), // needed to remove modify the base64 code
      geo: { latitude: location.lat, longitude: location.lng },
    }).then(
      function(response) {
        console.log('Upload successful');
        // console.log(response['0']);
        // console.log(response['0'].imageUrl);
        const imageUrl = response['0'].imageUrl;
        // const imageUrl = "https://peopledotcom.files.wordpress.com/2018/02/two-tone-cat.jpg"; // for testing...
        // console.log(imageUrl);
        ClarifaiApp.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
          .then(generalModel => {
            return generalModel.predict(imageUrl, { maxConcepts: 5 });
          })
          .then(response => {
            let concepts = response['outputs'][0]['data']['concepts'],
                tags = [],
                snapData = {
                  url: imageUrl,
                  location: location,
                  userId: authId,
                  huntId: huntId
                };
            // console.log(concepts);
            concepts.forEach(function (item) {
              tags.push(item.name)
            });
            // console.log(tags);
            // console.log(keyword);
            // if the image returns a tag that macthes the keyword then save the image
            if (tags.indexOf(keyword) >= 0) {
              snapData.tags = tags;
              // this will need to be inside the clarifai .then statement
              db.Snap
                .create(snapData) // will need to be an object
                .then(function(dbSnap) {
                  return db.User.findByIdAndUpdate(authId, {$push: { snaps: dbSnap._id }}, { new: true });
                })
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));
            }
            else {
              res.json({"msg": "The snap doesn't match the keyword."})
            }
          });
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
