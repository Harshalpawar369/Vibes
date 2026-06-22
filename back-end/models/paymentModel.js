const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
orderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
    required: true
},
paymentId: {
    type: String,
    required: true
},
signature: {
    type: String,
    required: true,
},
totalPrice:{
    amount: {
    type: Number,
    required: true
  },
    currency: {
    type: String,
    default: "INR"
  }
},
status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
},



},
{ timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;   