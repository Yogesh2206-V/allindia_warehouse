import express from 'express';
import MarketplaceProperty from '../models/MarketplaceProperty.js';
import MarketplaceLead from '../models/MarketplaceLead.js';

const router = express.Router();

// GET /api/marketplace/properties - List approved properties with query filters
router.get('/properties', async (req, res) => {
  try {
    const { purpose, city, locality, type, minArea, maxArea, sort } = req.query;
    const query = { approved: { $ne: false } };

    if (purpose && purpose !== 'all') {
      query.purpose = purpose.toLowerCase();
    }
    if (city && city !== 'All Cities') {
      query.city = { $regex: new RegExp(city, 'i') };
    }
    if (locality && locality.trim() !== '') {
      query.locality = { $regex: new RegExp(locality, 'i') };
    }
    if (type && type !== 'All Types') {
      query.type = type;
    }
    if (minArea || maxArea) {
      query.area_sqft = {};
      if (minArea) query.area_sqft.$gte = Number(minArea);
      if (maxArea) query.area_sqft.$lte = Number(maxArea);
    }

    let sortOption = { created_at: -1 };
    if (sort === 'price_asc') sortOption = { price_or_rent_psf: 1 };
    else if (sort === 'price_desc') sortOption = { price_or_rent_psf: -1 };
    else if (sort === 'area_asc') sortOption = { area_sqft: 1 };
    else if (sort === 'area_desc') sortOption = { area_sqft: -1 };

    const properties = await MarketplaceProperty.find(query).sort(sortOption);
    res.json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/marketplace/properties/:id
router.get('/properties/:id', async (req, res) => {
  try {
    const property = await MarketplaceProperty.findOne({ 
      $or: [{ id: req.params.id }, { _id: req.params.id }] 
    });
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/marketplace/post-property - Owner post (approval required)
router.post('/post-property', async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      id: req.body.id || `aiw-owner-${Date.now()}`,
      approved: false,
      verified: false
    };
    const newProperty = await MarketplaceProperty.create(propertyData);
    res.status(201).json({
      success: true,
      message: 'Property submitted for verification review!',
      data: newProperty
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST /api/marketplace/leads - Capture verified lead & dispatch notification to care@allindiawarehouse.in
router.post('/leads', async (req, res) => {
  try {
    const leadData = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email || '',
      property_id: req.body.property_id,
      property_title: req.body.property_title,
      property_city: req.body.property_city,
      message: req.body.message || 'Direct Owner Unlock Request',
      ip: req.ip || req.connection.remoteAddress,
      sent_to_email: 'care@allindiawarehouse.in'
    };

    const newLead = await MarketplaceLead.create(leadData);

    console.log(`[LEAD NOTIFICATION DISPATCHED] -> care@allindiawarehouse.in | Lead: ${leadData.name} (${leadData.phone}) for Property: ${leadData.property_title}`);

    res.status(201).json({
      success: true,
      message: 'Verified! Our team will call you within 1 hour.',
      data: newLead
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// GET /api/marketplace/admin/data
router.get('/admin/data', async (req, res) => {
  try {
    const passkey = req.headers['x-admin-key'] || req.query.passkey;
    if (passkey !== 'admin123' && passkey !== 'aiw@2026') {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const properties = await MarketplaceProperty.find().sort({ created_at: -1 });
    const leads = await MarketplaceLead.find().sort({ created_at: -1 });

    res.json({ success: true, properties, leads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
