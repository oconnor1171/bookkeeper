// ✅ FIRST: Load env vars
require('dotenv').config({ path: __dirname + '/.env' });

// THEN: import everything else
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');

// Server setup
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/transactions', require('./routes/transactionRoutes'));

// ✅ Use the loaded env variable here
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(4000, () => console.log('Server running on port 4000'));
});
