const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const snapSchema = new Schema ({
  url: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  tags: [{ type: String, required: true }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  hunt: {
    type: Schema.Types.ObjectId,
    ref: "Hunt"
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Snap = mongoose.model("Snap", snapSchema);

module.exports = Snap;
