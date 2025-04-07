// POST /api/transactions
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// POST: Add new transaction
router.post('/', async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const saved = await newTransaction.save();
    res.status(201).json(saved);  // Required to return saved document with _id
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save transaction' });
  }
});

module.exports = router;
