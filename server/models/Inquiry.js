import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['property_inquiry', 'site_visit', 'turnkey_service_quote', 'cost_estimator_lead', 'chatbot_lead'],
    default: 'property_inquiry'
  },
  propertyId: { type: String },
  propertyTitle: { type: String },
  serviceTitle: { type: String },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  company: { type: String, trim: true },
  city: { type: String, trim: true },
  requiredSize: { type: String },
  preferredDate: { type: String },
  notes: { type: String },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Visit Scheduled', 'Proposal Sent', 'Closed'],
    default: 'New'
  }
}, {
  timestamps: true
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
