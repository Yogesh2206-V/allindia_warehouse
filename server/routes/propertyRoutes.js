import express from 'express';
import mongoose from 'mongoose';
import Property from '../models/Property.js';

const router = express.Router();

// GET /api/properties - list with filters & search
router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: 0, data: [] });
    }
    const { city, category, status, keyword, minArea, maxArea, sort } = req.query;
    const filter = {};

    if (city && city !== 'All') {
      filter.city = new RegExp(city, 'i');
    }

    if (category && category !== 'All') {
      filter.$or = [
        { category: new RegExp(category, 'i') },
        { subCategory: new RegExp(category, 'i') }
      ];
    }

    if (status && status !== 'All') {
      filter.status = new RegExp(status, 'i');
    }

    if (minArea || maxArea) {
      filter.areaSqFt = {};
      if (minArea) filter.areaSqFt.$gte = Number(minArea);
      if (maxArea) filter.areaSqFt.$lte = Number(maxArea);
    }

    if (keyword) {
      const regex = new RegExp(keyword, 'i');
      filter.$or = [
        { title: regex },
        { location: regex },
        { city: regex },
        { state: regex },
        { idealFor: regex }
      ];
    }

    let query = Property.find(filter);

    if (sort === 'areaHigh') query = query.sort({ areaSqFt: -1 });
    else if (sort === 'areaLow') query = query.sort({ areaSqFt: 1 });
    else query = query.sort({ featured: -1, createdAt: -1 });

    const properties = await query.exec();
    res.json({
      success: true,
      count: properties.length,
      data: properties
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/properties/:id - get single property
router.get('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    const property = await Property.findOne({ 
      $or: [{ id: req.params.id }, { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }] 
    });
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.json({ success: true, data: property });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/properties - create property
router.post('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(201).json({ success: true, message: 'Mock property recorded', data: req.body });
    }
    const payload = req.body;
    if (!payload.id) {
      payload.id = `AIW-${Date.now().toString().slice(-5)}`;
    }
    const property = await Property.create(payload);
    res.status(201).json({ success: true, data: property });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;
