const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProjectSchema = new Schema({
  title: {
    type: 'String',
    default: 'N/A',
  },
  discription: {
    type: 'String',
    default: 'N/A',
  },
  category: {
    type: 'String',
    default: 'N/A',
  },
  startDate: {
    type: 'String',
    default: 'N/A',
  },
  EndDate: {
    type: 'String',
    default: 'N/A',
  },
  status: {
    type: 'String',
    default: 'N/A',
  },
  completeStatus: {
    type: 'String',
    default: 'N/A',
  },
  assignedTo: [],
});

module.exports = mongoose.model("projects", ProjectSchema);