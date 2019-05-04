const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  // city: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  snaps: [{
    type: Schema.Types.ObjectId,
    ref: "Snap"
  }],
  hunts: [{
    type: Schema.Types.ObjectId,
    ref: "Hunt"
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
