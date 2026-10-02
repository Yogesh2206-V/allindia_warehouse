import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/allindia_warehouse';
    console.log(`Connecting to MongoDB at: ${mongoUri.replace(/:[^:@]+@/, ':****@')}`);
    
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log(`✓ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`! MongoDB Connection Notice: ${error.message}`);
    console.warn(`Tip: If MongoDB is not running locally, install MongoDB or provide a MongoDB Atlas connection string in .env (MONGODB_URI)`);
    return false;
  }
};
