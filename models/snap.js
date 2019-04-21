const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const snapSchema = new Schema ({
  url: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  postDate: { type: Date, default: Date.now },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Snap = mongoose.model("Snap", snapSchema);

module.exports = Snap;
