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
    type: Schema.Types.ObjectId,
    ref: "Hunt"
  }],
  completedHunts: [{
    type: Schema.Types.ObjectId,
    ref: "Hunt"
  }],
  inProgressHunts: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Hunt' },
    huntName: { type: String, required: true },
    keywords: { type: Object, required: true }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

User.createIndexes();

module.exports = User;
