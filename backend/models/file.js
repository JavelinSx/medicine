const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }
});

module.exports = mongoose.model('File', fileSchema);