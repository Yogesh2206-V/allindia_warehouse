import express from 'express';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// POST /api/inquiries - Submit an inquiry, site visit, turnkey quote or estimator lead
router.post('/', async (req, res) => {
  try {
    const { 
      type, 
      propertyId, 
      propertyTitle, 
      serviceTitle, 
      name, 
      phone, 
      email, 
      company, 
      city, 
      requiredSize, 
      preferredDate, 
      notes 
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone number are required' });
    }

    const inquiry = await Inquiry.create({
      type: type || 'property_inquiry',
      propertyId,
      propertyTitle,
      serviceTitle,
      name,
      phone,
      email,
      company,
      city,
      requiredSize,
      preferredDate,
      notes
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. Our industrial specialist will contact you shortly.',
      data: inquiry
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/inquiries - list all inquiries (admin)
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
