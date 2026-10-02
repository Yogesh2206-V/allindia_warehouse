import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Warehouse', 'Cold Storage', 'Industrial', '3PL / 4PL / 5PL', 'Land'],
    default: 'Warehouse'
  },
  subCategory: { type: String, default: 'Warehouse with Storage' },
  location: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  areaSqFt: { type: Number, required: true },
  areaSqM: { type: Number },
  ratePerSqFt: { type: String },
  totalPrice: { type: String },
  status: { 
    type: String, 
    enum: ['For Rent or Lease', 'For Sale', 'Built-to-Suit (BTS)', 'Immediate Available'],
    default: 'For Rent or Lease'
  },
  grade: { type: String, default: 'Grade A' },
  readyStatus: { type: String, default: 'Ready to Move' },
  clearHeight: { type: String },
  floorLoad: { type: String },
  dockCount: { type: Number, default: 4 },
  powerSanctioned: { type: String },
  fireSafety: { type: String },
  image: { type: String, required: true },
  images: [{ type: String }],
  features: [{ type: String }],
  idealFor: { type: String },
  featured: { type: Boolean, default: false },
  agent: {
    name: { type: String, default: 'Rajesh M' },
    role: { type: String, default: 'Manager - Industrial & Warehousing' },
    phone: { type: String, default: '+91 98840 12341' },
    email: { type: String, default: 'leads@allindiawarehouse.in' }
  }
}, {
  timestamps: true
});

// Indexes for high performance search queries
propertySchema.index({ city: 1, category: 1, status: 1 });
propertySchema.index({ title: 'text', location: 'text', features: 'text' });

export default mongoose.models.Property || mongoose.model('Property', propertySchema);
