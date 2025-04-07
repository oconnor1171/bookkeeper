// ✅ Load environment variables
require('dotenv').config({ path: __dirname + '/../.env' }); // assumes .env is in project root

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use('/api/transactions', require('./routes/transactionRoutes'));

// ✅ Production: Serve React client
const clientPath = path.join(__dirname, '../client/build');
app.use(express.static(clientPath));

// ✅ Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(4000, () => console.log('Server running on port 4000'));
});