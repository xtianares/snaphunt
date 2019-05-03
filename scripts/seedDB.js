const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/snaphunt"
);

const userSeed = [
  {
    username: "xtian",
    firstName: "Christian",
    email: "xtian@test.com",
    lastName: "Castanares",
    password: "111111",
  },
  {
    username: "jstrub",
    firstName: "Jason",
    email: "jason@test.com",
    lastName: "Strub",
    password: "111111",
  }
];

const snapSeed = [
  {
    url: "https://picsum.photos/600/400",
    location: {
      lat: -25.363,
      lng: 131.044
    }
  },
  {
    url: "https://picsum.photos/600/400",
    location: {
      lat: -25.363,
      lng: 131.044
    }
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
