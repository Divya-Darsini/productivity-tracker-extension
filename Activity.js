const mongoose = require('mongoose');
const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: String,
  domain: String,
  title: String,
  startTime: Date,
  endTime: Date,
  durationSeconds: Number,
  createdAt: {type:Date, default:Date.now}
});
module.exports = mongoose.model('Activity', ActivitySchema);
