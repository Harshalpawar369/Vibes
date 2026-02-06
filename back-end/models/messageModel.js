const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userMessage: {
    type: String,
    required: true,
  },
  deluluResponse: {
    type: String,
    required: true,
  },
   user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true
      },
  
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Message', MessageSchema);