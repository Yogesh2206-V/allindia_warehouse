import express from 'express';
import Requirement from '../models/Requirement.js';

const router = express.Router();

// POST /api/requirements - Post property or post requirement
router.post('/', async (req, res) => {
  try {
    const { 
      mode, 
      name, 
      phone, 
      email, 
      company, 
      propertyType, 
      city, 
      corridor, 
      areaSqFt, 
      budgetOrExpectedRent, 
      timeline, 
      additionalDetails 
    } = req.body;

    if (!name || !phone || !city) {
      return res.status(400).json({ success: false, message: 'Name, phone, and city are required' });
    }

    const requirement = await Requirement.create({
      mode: mode || 'need',
      name,
      phone,
      email,
      company,
      propertyType: propertyType || 'Warehouse',
      city,
      corridor,
      areaSqFt,
      budgetOrExpectedRent,
      timeline,
      additionalDetails
    });

    res.status(201).json({
      success: true,
      message: mode === 'post' 
        ? 'Property posted successfully! Our verification team will contact you within 2 business hours.'
        : 'Requirement submitted! Our team will send matching verified options shortly.',
      data: requirement
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/requirements - list requirements
router.get('/', async (req, res) => {
  try {
    const requirements = await Requirement.find().sort({ createdAt: -1 });
    res.json({ success: true, count: requirements.length, data: requirements });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
