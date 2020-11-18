const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    googleId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
