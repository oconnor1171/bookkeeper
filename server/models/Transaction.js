const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  category: String,
  business: String,
  amount: Number,
  merchant: String,
  date: Date,
  connectedBusiness: String,
  bankAccount: String,
  comments: String,
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
