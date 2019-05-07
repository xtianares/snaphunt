const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  snaps: [{
    type: Schema.Types.ObjectId,
    ref: "Snap"
  }],
  createdHunts: [{
<<<<<<< HEAD
    type: Schema.Types.ObjectId,
    ref: "Hunt"
  }],
  completedHunts: [{
    type: Schema.Types.ObjectId,
    ref: "Hunt",
    unique: true
  }],
  inProgressHunts: [{
    type: Schema.Types.ObjectId,
    ref: "Hunt",
  }] 
=======
    type: Schema.Types.ObjectId,
    ref: "Hunt"
  }],
  completedHunts: [{
    type: Schema.Types.ObjectId,
    ref: "Hunt"
  }],
  inProgressHunts: [{
    _id: { type: String, unique: true },
    keywords: { type: Object, required: true }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
>>>>>>> 6949da5cd29b8e5a747bf4e374ad7e96f09b9eff
});

const User = mongoose.model("User", userSchema);

module.exports = User;
