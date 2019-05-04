const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const huntSchema = new Schema ({
  huntName: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  keywords: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  snaps: [{
    type: Schema.Types.ObjectId,
    ref: "Snap"
  }]
});

const Hunt = mongoose.model("Hunt", huntSchema);

module.exports = Hunt;
