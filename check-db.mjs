import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Define a temporary schema just to query
  const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    email: String,
    name: String,
    twilioNumber: String
  }, { strict: false }));
  
  const users = await User.find({});
  console.log(`\n=== MONGODB ATLAS VALIDATION ===`);
  console.log(`Total Users Found: ${users.length}`);
  users.forEach(u => console.log(`- ${u.name} (${u.email}) [Twilio: ${u.twilioNumber}]`));
  console.log(`================================`);
  
  process.exit(0);
}
check();
