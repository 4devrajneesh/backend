const mongoose = require("mongoose");
const { Schema } = mongoose;
const BlogsSchema = new Schema({
  title: "String",
  category: "string",
  description: "String",
  height: "String",
  width: "String",
});

module.exports = mongoose.model("blogs", BlogsSchema);