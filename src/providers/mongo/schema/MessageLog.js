const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  matchId: Number,
  message: String,
  type: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('MessageLog', schema);
