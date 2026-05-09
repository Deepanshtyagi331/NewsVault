const mongoose = require('mongoose');
let mongoServer;

const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;

    if (process.env.NODE_ENV === 'test') {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('Using In-Memory MongoDB for demo/testing');
    }

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (process.env.NODE_ENV !== 'test') {
      console.log('\n--- Troubleshooting ---');
      console.log('1. Make sure MongoDB is running locally.');
      console.log('2. Or use a MongoDB Atlas connection string in backend/.env');
      console.log('3. Or run "npm run dev:mock" to use an in-memory database (data will not persist).');
      console.log('----------------------\n');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
