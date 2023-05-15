const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agencySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  clients: [{
    type: Schema.Types.ObjectId,
    ref: 'Client'
  }]
},{
  collection:"Agency",
  timestamps:true
});

module.exports = mongoose.model('Agency', agencySchema);
