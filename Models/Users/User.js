const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: 'String',
    default: 'N/A',
  },
  image:  {
    type: 'String',
    default: 'N/A',
  },
  email: {
    type: 'String',
    default: 'N/A',
  },
  phone:  {
    type: 'String',
    default: 'N/A',
  },
  country:  {
    type: 'String',
    default: 'N/A',
  },
  city:  {
    type: 'String',
    default: 'N/A',
  },
  website:  {
    type: 'String',
    default: 'N/A',
  },
  CompanyName:  {
    type: 'String',
    default: 'N/A',
  },
  department:  {
    type: 'String',
    default: 'N/A',
  },
  designation: {
    type: 'String',
    default: 'N/A',
  },
  hiringDate:  {
    type: 'String',
    default: 'N/A',
  },
  status:  {
    type: 'String',
    default: 'N/A',
  },
  facebook: {
    type: 'String',
    default: 'N/A',
  },
  twitter:  {
    type: 'String',
    default: 'N/A',
  },
  linkedin :  {
    type: 'String',
    default: 'N/A',
  },
  instagram:  {
    type: 'String',
    default: 'N/A',
  },
  gitHub:  {
    type: 'String',
    default: 'N/A',
  },
  totalRevenue:  {
    type: 'String',
    default: 'N/A',
  },
  orders:  {
    type: 'String',
    default: 'N/A',
  },
  products: {
    type: 'String',
    default: 'N/A',
  },
  rate: {
    type: 'String',
    default: 'N/A',
  },
  earned: {
    type: 'String',
    default: '0',
  },

});

module.exports = mongoose.model("Users", UserSchema);