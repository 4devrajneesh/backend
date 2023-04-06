const mongoose = require("mongoose");
const { Schema } = mongoose;
const MyprofileSchema = new Schema({
  title: "String",
  category: "string",
  description: "String",
  height: "String",
  width: "String",
});

module.exports = mongoose.model("Myprofile", MyprofileSchema);