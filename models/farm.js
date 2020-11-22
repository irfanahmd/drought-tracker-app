const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    farmName: String,
    lat: Number,
    lon: Number,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Farm", farmSchema);
