const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    farmName: String,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Farm", farmSchema);
