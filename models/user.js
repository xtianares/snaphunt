const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  snaps: [{
    type: Schema.Types.ObjectId,
    ref: "Snap"
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
