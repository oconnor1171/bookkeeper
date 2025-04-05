const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions', detail: err.message });
  }
});

// PUT (update) a transaction by ID
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Update failed', detail: err.message });
  }
});

module.exports = router;

