import { SAMPLE_MARKETPLACE_PROPERTIES } from '../data/sampleMarketplaceProperties';

const API_BASE = '/api/marketplace';
const LOCAL_STORAGE_KEY_PROPS = 'aiw_marketplace_properties_v1';
const LOCAL_STORAGE_KEY_LEADS = 'aiw_marketplace_leads_v1';
const LOCAL_STORAGE_KEY_SAVED = 'aiw_marketplace_saved_ids';

// Helper to initialize local storage
function getLocalProperties() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY_PROPS);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROPS, JSON.stringify(SAMPLE_MARKETPLACE_PROPERTIES));
      return SAMPLE_MARKETPLACE_PROPERTIES;
    }
    return JSON.parse(data);
  } catch (e) {
    return SAMPLE_MARKETPLACE_PROPERTIES;
  }
}

function saveLocalProperties(props) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROPS, JSON.stringify(props));
  } catch (e) {
    console.error('Error saving local properties:', e);
  }
}

function getLocalLeads() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY_LEADS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalLead(lead) {
  try {
    const leads = getLocalLeads();
    leads.unshift(lead);
    localStorage.setItem(LOCAL_STORAGE_KEY_LEADS, JSON.stringify(leads));
  } catch (e) {
    console.error('Error saving lead:', e);
  }
}

export const marketplaceApi = {
  // Get all active approved properties (with optional filter query)
  async getProperties(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (filters.purpose) queryParams.append('purpose', filters.purpose);
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.locality) queryParams.append('locality', filters.locality);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.minArea) queryParams.append('minArea', filters.minArea);
      if (filters.maxArea) queryParams.append('maxArea', filters.maxArea);
      if (filters.sort) queryParams.append('sort', filters.sort);

      const res = await fetch(`${API_BASE}/properties?${queryParams.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) return json.data;
      }
    } catch (e) {
      // Backend not running or failed, gracefully fall back to local storage
    }

    // Local filtering fallback
    let list = [...getLocalProperties()].filter(p => p.approved !== false);

    if (filters.purpose && filters.purpose !== 'all') {
      list = list.filter(p => p.purpose?.toLowerCase() === filters.purpose?.toLowerCase());
    }
    if (filters.city && filters.city !== 'All Cities') {
      list = list.filter(p => p.city?.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.locality && filters.locality.trim() !== '') {
      list = list.filter(p => p.locality?.toLowerCase().includes(filters.locality.toLowerCase()));
    }
    if (filters.type && filters.type !== 'All Types') {
      list = list.filter(p => p.type?.toLowerCase() === filters.type?.toLowerCase());
    }
    if (filters.minArea) {
      list = list.filter(p => Number(p.area_sqft) >= Number(filters.minArea));
    }
    if (filters.maxArea) {
      list = list.filter(p => Number(p.area_sqft) <= Number(filters.maxArea));
    }
    if (filters.maxBudget) {
      list = list.filter(p => Number(p.price_or_rent_psf) <= Number(filters.maxBudget));
    }
    if (filters.features && filters.features.length > 0) {
      list = list.filter(p => 
        filters.features.every(f => p.features?.some(pf => pf.toLowerCase().includes(f.toLowerCase())))
      );
    }
    if (filters.status && filters.status !== 'all') {
      list = list.filter(p => p.status?.toLowerCase().includes(filters.status.toLowerCase()));
    }

    // Sorting
    if (filters.sort === 'price_asc') {
      list.sort((a, b) => (a.price_or_rent_psf || 0) - (b.price_or_rent_psf || 0));
    } else if (filters.sort === 'price_desc') {
      list.sort((a, b) => (b.price_or_rent_psf || 0) - (a.price_or_rent_psf || 0));
    } else if (filters.sort === 'area_asc') {
      list.sort((a, b) => (a.area_sqft || 0) - (b.area_sqft || 0));
    } else if (filters.sort === 'area_desc') {
      list.sort((a, b) => (b.area_sqft || 0) - (a.area_sqft || 0));
    } else {
      // Default: newest
      list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    }

    return list;
  },

  // Get single property by ID
  async getPropertyById(id) {
    try {
      const res = await fetch(`${API_BASE}/properties/${id}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (e) {
      // Fall back
    }
    const all = getLocalProperties();
    return all.find(p => p.id === id || p._id === id) || null;
  },

  // Post owner property (sets approved: false for review)
  async postProperty(propertyData) {
    const newProp = {
      ...propertyData,
      id: `aiw-owner-${Date.now()}`,
      approved: false, // Goes to pending approval
      verified: false,
      created_at: new Date().toISOString()
    };

    try {
      const res = await fetch(`${API_BASE}/post-property`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProp)
      });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (e) {
      // Fallback to local
    }

    const current = getLocalProperties();
    current.unshift(newProp);
    saveLocalProperties(current);
    return { success: true, message: 'Property submitted for verification review!', data: newProp };
  },

  // Lead Unlock & OTP Verification
  async submitLead(leadData) {
    const leadRecord = {
      id: `lead-${Date.now()}`,
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email || '',
      property_id: leadData.property_id,
      property_title: leadData.property_title,
      property_city: leadData.property_city,
      message: leadData.message || 'Direct Owner Unlock Request',
      created_at: new Date().toISOString()
    };

    try {
      const res = await fetch(`${API_BASE}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadRecord)
      });
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (e) {
      // Fallback
    }

    saveLocalLead(leadRecord);
    return { 
      success: true, 
      message: 'Verified! Our warehouse logistics team will connect with you within 1 hour.',
      data: leadRecord 
    };
  },

  // Saved / Bookmarked Properties
  getSavedPropertyIds() {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SAVED);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  },

  toggleSaveProperty(id) {
    try {
      const current = this.getSavedPropertyIds();
      let updated;
      if (current.includes(id)) {
        updated = current.filter(item => item !== id);
      } else {
        updated = [...current, id];
      }
      localStorage.setItem(LOCAL_STORAGE_KEY_SAVED, JSON.stringify(updated));
      return updated;
    } catch (e) {
      return [];
    }
  },

  // Admin APIs
  async getAdminData(passkey) {
    if (passkey !== 'admin123' && passkey !== 'aiw@2026') {
      throw new Error('Invalid Admin Passkey');
    }
    const properties = getLocalProperties();
    const leads = getLocalLeads();
    return { properties, leads };
  },

  async approveProperty(id) {
    const current = getLocalProperties();
    const updated = current.map(p => {
      if (p.id === id || p._id === id) {
        return { ...p, approved: true, verified: true };
      }
      return p;
    });
    saveLocalProperties(updated);
    return { success: true };
  },

  async deleteProperty(id) {
    const current = getLocalProperties();
    const updated = current.filter(p => p.id !== id && p._id !== id);
    saveLocalProperties(updated);
    return { success: true };
  }
};
