import mongoose from 'mongoose';

const marketplacePropertySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true, trim: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['Warehouse', 'Cold Storage', 'Industrial Shed', 'Land', 'Commercial Office'],
    default: 'Warehouse'
  },
  purpose: { 
    type: String, 
    required: true, 
    enum: ['rent', 'sale', 'lease'],
    default: 'rent'
  },
  city: { type: String, required: true },
  locality: { type: String, required: true },
  state: { type: String, required: true },
  area_sqft: { type: Number, required: true },
  price_or_rent_psf: { type: Number, required: true },
  deposit: { type: String, default: '6 Months' },
  status: { type: String, default: 'Ready to Move' },
  availability: { type: String, default: 'Immediate' },
  clear_height: { type: String },
  docks: { type: Number, default: 0 },
  power_backup: { type: String },
  flooring: { type: String },
  fire_safety: { type: String },
  features: [{ type: String }],
  images: [{ type: String }],
  description: { type: String },
  owner_name: { type: String, required: true },
  owner_phone: { type: String, required: true },
  verified: { type: Boolean, default: true },
  approved: { type: Boolean, default: true }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

marketplacePropertySchema.index({ city: 1, type: 1, purpose: 1 });
marketplacePropertySchema.index({ title: 'text', locality: 'text', description: 'text' });

export default mongoose.models.MarketplaceProperty || mongoose.model('MarketplaceProperty', marketplacePropertySchema);
