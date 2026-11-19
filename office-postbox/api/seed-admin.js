import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);
const email = process.argv[2];
if (!email) {
  console.log('Usage: node api/seed-admin.js you@company.com');
  process.exit(1);
}
const result = await User.updateOne({ email }, { $set: { role: 'admin' } });
console.log(result.modifiedCount ? `✅ ${email} is now admin` : '❌ User not found');
await mongoose.disconnect();