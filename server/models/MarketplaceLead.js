import mongoose from 'mongoose';

const marketplaceLeadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  property_id: { type: String, required: true },
  property_title: { type: String },
  property_city: { type: String },
  message: { type: String, default: 'Direct Owner Unlock Request' },
  ip: { type: String },
  sent_to_email: { type: String, default: 'care@allindiawarehouse.in' }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.models.MarketplaceLead || mongoose.model('MarketplaceLead', marketplaceLeadSchema);
