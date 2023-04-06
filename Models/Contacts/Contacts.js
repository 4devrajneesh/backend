const mongoose = require("mongoose");
const { Schema } = mongoose;
const ContactSchema = new Schema({
  name: {
    type: 'String',
    default: 'N/A',
  },
  image: {
    type: 'String',
    default: 'N/A',
  },
  email: {
    type: 'String',
    default: 'N/A',
  },
  phone: {
    type: 'String',
    default: 'N/A',
  },
  address: {
    type: 'String',
    default: 'N/A',
  },
  position: {
    type: 'String',
    default: 'N/A',
  },
  company: {
    type: 'String',
    default: 'N/A',
  },
});

module.exports = mongoose.model("Contacts", ContactSchema);