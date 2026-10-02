import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import Property from './models/Property.js';
import { WAREHOUSE_LISTINGS } from '../src/data/warehouseData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/allindia_warehouse';
    console.log(`Connecting to MongoDB for seeding at: ${mongoUri.replace(/:[^:@]+@/, ':****@')}`);
    
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('✓ Connected to MongoDB');

    // Clear existing
    await Property.deleteMany({});
    console.log('Cleared existing properties in MongoDB');

    // Insert listings
    const formattedListings = WAREHOUSE_LISTINGS.map(item => ({
      ...item
    }));

    const result = await Property.insertMany(formattedListings);
    console.log(`✓ Successfully seeded ${result.length} Grade-A warehouse properties into MongoDB!`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();
