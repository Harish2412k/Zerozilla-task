const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  clientId:{
    type:Number,
    required:true
  },
  agencyId: {
    type: Schema.Types.ObjectId,
    ref: 'Agency',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  totalBill: {
    type: Number,
    required: true
  }
},{
  collection:"client",
  timestamps:true
});

module.exports = mongoose.model('Client', clientSchema);