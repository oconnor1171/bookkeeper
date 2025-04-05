require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');

const seedData = [
  {
    clientId: 'client_001',
    category: 'Marketing',
    business: 'O\'Connor Consulting',
    amount: 1250.50,
    merchant: 'Google Ads',
    date: new Date('2024-12-01'),
    connectedBusiness: 'ABC Ventures',
    bankAccount: 'Chase Business',
    comments: 'End of year campaign',
  },
  {
    clientId: 'client_001',
    category: 'Software',
    business: 'O\'Connor Consulting',
    amount: 299.99,
    merchant: 'QuickBooks',
    date: new Date('2025-01-10'),
    connectedBusiness: 'XYZ Holdings',
    bankAccount: 'Amex Platinum',
    comments: 'Annual subscription',
  },
  {
    clientId: 'client_001',
    category: 'Travel',
    business: 'O\'Connor Consulting',
    amount: 487.20,
    merchant: 'Delta Airlines',
    date: new Date('2025-02-15'),
    connectedBusiness: 'N/A',
    bankAccount: 'Business Checking',
    comments: 'Client conference',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Transaction.deleteMany({ clientId: 'client_001' });
    await Transaction.insertMany(seedData);
    console.log('✅ Seeded transactions successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
