import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  company: { type: String, trim: true },
  role: { 
    type: String, 
    enum: ['occupier', 'owner', 'broker', 'investor', 'admin'],
    default: 'occupier'
  },
  savedProperties: [{ type: String }],
  passwordHash: { type: String }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);
