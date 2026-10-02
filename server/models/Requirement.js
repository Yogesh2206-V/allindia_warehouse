import mongoose from 'mongoose';

const requirementSchema = new mongoose.Schema({
  mode: { 
    type: String, 
    enum: ['need', 'post'], 
    default: 'need' // 'need' = seeking warehouse, 'post' = owner/developer posting property
  },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  company: { type: String, trim: true },
  propertyType: { type: String, default: 'Warehouse' },
  city: { type: String, required: true },
  corridor: { type: String },
  areaSqFt: { type: String },
  budgetOrExpectedRent: { type: String },
  timeline: { type: String },
  additionalDetails: { type: String },
  status: {
    type: String,
    enum: ['Pending Review', 'Verified', 'Active', 'Archived'],
    default: 'Pending Review'
  }
}, {
  timestamps: true
});

export default mongoose.models.Requirement || mongoose.model('Requirement', requirementSchema);
