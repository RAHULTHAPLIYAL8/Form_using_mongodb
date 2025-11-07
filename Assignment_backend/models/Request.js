const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  message: { type: String },
  status: { type: String, enum: ['pending','accepted','declined'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
