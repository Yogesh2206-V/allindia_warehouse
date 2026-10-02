import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, company, role } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      company: company || '',
      role: role || 'occupier'
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { identifier } = req.body; // email or phone

    if (!identifier) {
      return res.status(400).json({ success: false, message: 'Please provide your email or phone number' });
    }

    let user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase().trim() },
        { phone: identifier.trim() }
      ]
    });

    // If demo/quick login and user doesn't exist, create temporary active session
    if (!user) {
      const isEmail = identifier.includes('@');
      user = await User.create({
        name: isEmail ? identifier.split('@')[0] : 'Industrial Client',
        email: isEmail ? identifier.toLowerCase().trim() : `${identifier.replace(/\D/g, '')}@client.aiw.in`,
        phone: isEmail ? '+91 98000 00000' : identifier.trim(),
        role: 'occupier'
      });
    }

    res.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        role: user.role,
        savedProperties: user.savedProperties || []
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/auth/save-property
router.post('/save-property', async (req, res) => {
  try {
    const { userId, propertyId } = req.body;
    if (!userId || !propertyId) {
      return res.status(400).json({ success: false, message: 'userId and propertyId are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const index = user.savedProperties.indexOf(propertyId);
    if (index > -1) {
      user.savedProperties.splice(index, 1);
    } else {
      user.savedProperties.push(propertyId);
    }

    await user.save();
    res.json({ success: true, savedProperties: user.savedProperties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
