const mongoose = require("mongoose");
const { Schema } = mongoose;
const SupportSchema = new Schema({
  name:  {
    type: 'String',
    default: 'N/A',
  },
  image:  {
    type: 'String',
    default: 'N/A',
  },
  Priority:  {
    type: 'String',
    default: 'N/A',
  },
  createdate:  {
    type: 'String',
    default:  Date.now,
  },
  Status:  {
    type: 'String',
    default: 'N/A',
  },
  Subject:  {
    type: 'String',
    default: 'N/A',
  },
});

module.exports = mongoose.model("Support", SupportSchema);