import React from 'react';
import { Filter, RotateCcw, X } from 'lucide-react';
import { CITIES_LIST, PROPERTY_TYPES } from '../data/sampleMarketplaceProperties';

export default function MarketplaceFilterDrawer({ 
  filters, 
  onFilterChange, 
  onResetFilters,
  isOpenMobile,
  onCloseMobile 
}) {
  const featureOptions = [
    "Loading Docks",
    "Fire Safety",
    "Power Backup",
    "24x7 Security",
    "Truck Access",
    "Cold Storage",
    "Near Port"
  ];

  const handleCityChange = (e) => {
    onFilterChange({ ...filters, city: e.target.value });
  };

  const handleTypeChange = (e) => {
    onFilterChange({ ...filters, type: e.target.value });
  };

  const handleStatusChange = (status) => {
    onFilterChange({ ...filters, status });
  };

  const handleFeatureToggle = (feature) => {
    const currentFeatures = filters.features || [];
    let updated;
    if (currentFeatures.includes(feature)) {
      updated = currentFeatures.filter(f => f !== feature);
    } else {
      updated = [...currentFeatures, feature];
    }
    onFilterChange({ ...filters, features: updated });
  };

  const content = (
    <div className="mp-filter-content">
      <div className="mp-filter-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} className="text-red" />
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Filters</h3>
        </div>
        <button 
          type="button" 
          onClick={onResetFilters}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            background: 'none', 
            border: 'none', 
            color: '#64748b', 
            fontSize: '0.8rem', 
            cursor: 'pointer' 
          }}
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* City Filter */}
      <div className="mp-filter-group">
        <label className="mp-filter-group-title">City / Industrial Region</label>
        <select 
          value={filters.city || 'All Cities'} 
          onChange={handleCityChange}
          className="form-control"
          style={{ width: '100%', padding: '8px 10px', fontSize: '0.88rem' }}
        >
          <option value="All Cities">All Locations</option>
          {CITIES_LIST.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Property Type */}
      <div className="mp-filter-group">
        <label className="mp-filter-group-title">Property Type</label>
        <select 
          value={filters.type || 'All Types'} 
          onChange={handleTypeChange}
          className="form-control"
          style={{ width: '100%', padding: '8px 10px', fontSize: '0.88rem' }}
        >
          <option value="All Types">All Property Types</option>
          {PROPERTY_TYPES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Ready to Move vs Build to Suit */}
      <div className="mp-filter-group">
        <label className="mp-filter-group-title">Availability Status</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label className="mp-checkbox-label">
            <input 
              type="radio" 
              name="statusFilter" 
              checked={!filters.status || filters.status === 'all'} 
              onChange={() => handleStatusChange('all')}
            />
            <span>All Statuses</span>
          </label>
          <label className="mp-checkbox-label">
            <input 
              type="radio" 
              name="statusFilter" 
              checked={filters.status === 'Ready'} 
              onChange={() => handleStatusChange('Ready')}
            />
            <span>Ready to Move</span>
          </label>
          <label className="mp-checkbox-label">
            <input 
              type="radio" 
              name="statusFilter" 
              checked={filters.status === 'Build-to-Suit'} 
              onChange={() => handleStatusChange('Build-to-Suit')}
            />
            <span>Build-to-Suit (BTS)</span>
          </label>
        </div>
      </div>

      {/* Area Range */}
      <div className="mp-filter-group">
        <label className="mp-filter-group-title">Area Range (Sq.Ft.)</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="number"
            placeholder="Min sq ft"
            value={filters.minArea || ''}
            onChange={(e) => onFilterChange({ ...filters, minArea: e.target.value })}
            className="form-control"
            style={{ width: '50%', padding: '6px 8px', fontSize: '0.84rem' }}
          />
          <input 
            type="number"
            placeholder="Max sq ft"
            value={filters.maxArea || ''}
            onChange={(e) => onFilterChange({ ...filters, maxArea: e.target.value })}
            className="form-control"
            style={{ width: '50%', padding: '6px 8px', fontSize: '0.84rem' }}
          />
        </div>
      </div>

      {/* Max Budget (Rent psf) */}
      <div className="mp-filter-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <label className="mp-filter-group-title" style={{ marginBottom: 0 }}>Max Rent/Sq.Ft.</label>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e11d48' }}>
            {filters.maxBudget ? `₹${filters.maxBudget}/sq ft` : 'Any'}
          </span>
        </div>
        <input 
          type="range"
          min="15"
          max="80"
          step="5"
          value={filters.maxBudget || 80}
          onChange={(e) => onFilterChange({ ...filters, maxBudget: e.target.value })}
          style={{ width: '100%', accentColor: '#e11d48' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8' }}>
          <span>₹15/sqft</span>
          <span>₹80+/sqft</span>
        </div>
      </div>

      {/* Features & Amenities Checkboxes */}
      <div className="mp-filter-group">
        <label className="mp-filter-group-title">Key Infrastructure</label>
        {featureOptions.map((feat) => {
          const isChecked = (filters.features || []).includes(feat);
          return (
            <label key={feat} className="mp-checkbox-label">
              <input 
                type="checkbox"
                checked={isChecked}
                onChange={() => handleFeatureToggle(feat)}
              />
              <span>{feat}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="mp-filter-sidebar desktop-only">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="mp-modal-overlay mobile-only" onClick={onCloseMobile}>
          <div 
            className="mp-modal-content" 
            style={{ maxHeight: '85vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Filter Properties</h3>
              <button onClick={onCloseMobile} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            {content}
            <button 
              type="button" 
              className="btn btn-red w-full"
              style={{ marginTop: '16px' }}
              onClick={onCloseMobile}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
