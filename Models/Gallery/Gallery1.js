const mongoose = require("mongoose");
const { Schema } = mongoose;
const Gallery1Schema = new Schema({
  title: "String",
  category: "string",
  description: "String",
  height: "String",
  width: "String",
});

module.exports = mongoose.model("Gallery1", Gallery1Schema);