const mongoose = require('mongoose');

const OrderDetails = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  receiptId: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  userID: {
    type: String,
  },
  signature: {
    type: String,
  },
  amount: {
    type: Number,
  },
  currency: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model('orderDetails', OrderDetails);
