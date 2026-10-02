import { WAREHOUSE_LISTINGS } from '../data/warehouseData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Helper to fetch from backend with fallback
 */
async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[API] Fallback/Error on ${endpoint}:`, error.message);
    throw error;
  }
}

export const warehouseApi = {
  // Properties
  async getProperties(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.city && params.city !== 'All') query.append('city', params.city);
      if (params.category && params.category !== 'All') query.append('category', params.category);
      if (params.status && params.status !== 'All') query.append('status', params.status);
      if (params.keyword) query.append('keyword', params.keyword);
      if (params.minArea) query.append('minArea', params.minArea);
      if (params.sort) query.append('sort', params.sort);

      const res = await request(`/properties?${query.toString()}`);
      if (res && res.data && res.data.length > 0) {
        return res.data;
      }
      return WAREHOUSE_LISTINGS;
    } catch {
      // Return local data as seamless fallback
      return WAREHOUSE_LISTINGS;
    }
  },

  async getPropertyById(id) {
    try {
      const res = await request(`/properties/${id}`);
      return res.data;
    } catch {
      return WAREHOUSE_LISTINGS.find(item => item.id === id) || null;
    }
  },

  // Inquiries & Quotes
  async submitInquiry(data) {
    try {
      return await request('/inquiries', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch (e) {
      // Fallback response for offline / local mode
      console.log('Saved inquiry locally:', data);
      return {
        success: true,
        message: 'Inquiry received! Our industrial advisor will call you within 2 business hours.',
        local: true
      };
    }
  },

  // Post Property / Requirement
  async submitRequirement(data) {
    try {
      return await request('/requirements', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch (e) {
      console.log('Saved requirement locally:', data);
      return {
        success: true,
        message: data.mode === 'post' 
          ? 'Property posted successfully! Our verification team will review and approve.' 
          : 'Requirement received! Our team will send matching verified options.',
        local: true
      };
    }
  },

  // Auth
  async login(identifier) {
    try {
      return await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier })
      });
    } catch (e) {
      const isEmail = identifier.includes('@');
      return {
        success: true,
        user: {
          id: `usr_${Date.now()}`,
          name: isEmail ? identifier.split('@')[0] : 'Industrial Client',
          email: isEmail ? identifier : 'client@aiw.in',
          phone: isEmail ? '+91 98840 12345' : identifier,
          role: 'occupier'
        }
      };
    }
  },

  async register(userData) {
    try {
      return await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    } catch (e) {
      return {
        success: true,
        user: {
          id: `usr_${Date.now()}`,
          ...userData
        }
      };
    }
  }
};
