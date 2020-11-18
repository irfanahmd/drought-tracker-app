const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const farmSchema = new Schema({
  name: String,
  email: String,
  googleId: String,
});
