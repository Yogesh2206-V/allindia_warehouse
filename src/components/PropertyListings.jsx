import React, { useState, useMemo, useEffect } from 'react';
import { 
  Warehouse, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  Building, 
  Heart, 
  MessageSquare,
  RotateCcw,
  X
} from 'lucide-react';
import { WAREHOUSE_LISTINGS } from '../data/warehouseData';
import { warehouseApi } from '../services/api';
import PropertyDetailModal from './PropertyDetailModal';

export default function PropertyListings({ externalFilters, onResetFilters, onOpenInquiry }) {
  const [propertiesData, setPropertiesData] = useState(WAREHOUSE_LISTINGS);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activePropertyModal, setActivePropertyModal] = useState(null);
  const [sortBy, setSortBy] = useState('featured');
  const [savedProperties, setSavedProperties] = useState({});

  useEffect(() => {
    let isMounted = true;
    const fetchApiProperties = async () => {
      try {
        setLoading(true);
        const data = await warehouseApi.getProperties();
        if (isMounted && data && data.length > 0) {
          setPropertiesData(data);
        }
      } catch (err) {
        // Local listings fallback
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchApiProperties();
    return () => { isMounted = false; };
  }, []);

  const categories = [
    { id: 'All', label: 'All Warehouses' },
    { id: 'Warehouse', label: 'Grade-A Warehouses' },
    { id: 'Cold Storage', label: 'Cold Storage / Pharma' },
    { id: 'Industrial', label: 'Manufacturing Sheds' },
    { id: '3PL / 4PL / 5PL', label: '3PL Logistics Hubs' },
    { id: 'Land', label: 'Industrial Land' }
  ];

  const citiesList = [
    'All',
    'Chennai',
    'Bangalore',
    'Sri City',
    'Pune',
    'Mumbai',
    'Hyderabad',
    'Hosur',
    'Coimbatore'
  ];

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSavedProperties(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Check if any filter is active
  const hasActiveFilters = Boolean(
    (externalFilters && Object.values(externalFilters).some(Boolean)) ||
    selectedCategory !== 'All' ||
    selectedCity !== 'All' ||
    selectedStatus !== 'All' ||
    searchKeyword.trim() !== ''
  );

  // Complete Reset Function
  const handleResetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedCity('All');
    setSelectedStatus('All');
    setSearchKeyword('');
    setSortBy('featured');
    if (onResetFilters) {
      onResetFilters();
    }
  };

  // Filter properties
  const filteredProperties = useMemo(() => {
    return propertiesData.filter(item => {
      // External search filter from hero
      if (externalFilters?.city && !item.city.toLowerCase().includes(externalFilters.city.toLowerCase())) {
        return false;
      }
      if (externalFilters?.category && !item.category.toLowerCase().includes(externalFilters.category.toLowerCase()) && !item.subCategory.toLowerCase().includes(externalFilters.category.toLowerCase())) {
        return false;
      }
      if (externalFilters?.minArea && item.areaSqFt < externalFilters.minArea) {
        return false;
      }
      if (externalFilters?.maxArea && item.areaSqFt > externalFilters.maxArea) {
        return false;
      }
      if (externalFilters?.status && !item.status.toLowerCase().includes(externalFilters.status.toLowerCase())) {
        return false;
      }
      if (externalFilters?.keyword && !item.location.toLowerCase().includes(externalFilters.keyword.toLowerCase()) && !item.title.toLowerCase().includes(externalFilters.keyword.toLowerCase())) {
        return false;
      }

      // Internal quick category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Cold Storage' && item.subCategory !== 'Cold Storage') return false;
        if (selectedCategory === '3PL / 4PL / 5PL' && item.subCategory !== '3PL / 4PL / 5PL') return false;
        if (selectedCategory === 'Industrial' && item.category !== 'Industrial') return false;
        if (selectedCategory === 'Land' && item.category !== 'Land') return false;
        if (selectedCategory === 'Warehouse' && item.category !== 'Warehouse') return false;
      }

      // Internal city filter
      if (selectedCity !== 'All' && !item.city.toLowerCase().includes(selectedCity.toLowerCase())) {
        return false;
      }

      // Internal status filter
      if (selectedStatus !== 'All') {
        if (selectedStatus === 'Rent' && !item.status.includes('Rent')) return false;
        if (selectedStatus === 'Sale' && !item.status.includes('Sale')) return false;
      }

      // Keyword search
      if (searchKeyword.trim() !== '') {
        const query = searchKeyword.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(query);
        const matchesLoc = item.location?.toLowerCase().includes(query);
        const matchesCity = item.city?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesCity) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'areaHigh') return b.areaSqFt - a.areaSqFt;
      if (sortBy === 'areaLow') return a.areaSqFt - b.areaSqFt;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [propertiesData, externalFilters, selectedCategory, selectedCity, selectedStatus, searchKeyword, sortBy]);

  const handleWhatsAppProperty = (property, e) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello All India Warehouse, I am interested in property "${property.title}" (${property.areaSqFt.toLocaleString()} Sq.Ft in ${property.location}). Please share details and pricing.`
    );
    window.open(`https://wa.me/919884012341?text=${text}`, '_blank');
  };

  return (
    <section className="listings-section section-padding" id="properties">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <CheckCircle2 size={13} /> Verified Warehouse Listings
          </span>
          <h2 className="section-title">Available Warehouses & Industrial Sheds</h2>
          <p className="section-subtitle">
            Explore ready-to-move Grade-A warehouses with verified clear titles, high clearance, and complete industrial NOCs.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="filter-controls-card">
          {/* Category Chips */}
          <div className="category-chips-row">
            {categories.map((cat) => (
              <button 
                key={cat.id}
                className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls (City, Status, Search, Sort) */}
          <div className="secondary-filters-row">
            <div className="filter-item">
              <label className="filter-label">City:</label>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="filter-select"
              >
                {citiesList.map(c => (
                  <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label className="filter-label">Type:</label>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter-select"
              >
                <option value="All">Rent & Sale</option>
                <option value="Rent">For Rent / Lease</option>
                <option value="Sale">For Sale / Outright</option>
              </select>
            </div>

            <div className="filter-item search-box-item">
              <input 
                type="text" 
                placeholder="Search location (e.g. Sriperumbudur, Chakan...)"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="filter-search-input"
              />
            </div>

            <div className="filter-item sort-item">
              <label className="filter-label">Sort:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="featured">Featured First</option>
                <option value="areaHigh">Size: High to Low</option>
                <option value="areaLow">Size: Low to High</option>
              </select>
            </div>

            {/* Reset All Filters Button in Filter Bar */}
            {hasActiveFilters && (
              <button 
                type="button"
                onClick={handleResetAllFilters}
                className="reset-all-filters-btn"
                title="Clear all active filters"
              >
                <RotateCcw size={14} /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Active Applied Filters Strip */}
        {hasActiveFilters && (
          <div className="active-filters-strip">
            <span className="active-filter-label">Active Filters:</span>
            {externalFilters?.city && (
              <span className="applied-pill">
                City: <strong>{externalFilters.city}</strong>
                <button onClick={() => onResetFilters && onResetFilters()}><X size={12} /></button>
              </span>
            )}
            {externalFilters?.category && (
              <span className="applied-pill">
                Category: <strong>{externalFilters.category}</strong>
                <button onClick={() => onResetFilters && onResetFilters()}><X size={12} /></button>
              </span>
            )}
            {externalFilters?.status && (
              <span className="applied-pill">
                Deal: <strong>{externalFilters.status}</strong>
                <button onClick={() => onResetFilters && onResetFilters()}><X size={12} /></button>
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="applied-pill">
                Category: <strong>{selectedCategory}</strong>
                <button onClick={() => setSelectedCategory('All')}><X size={12} /></button>
              </span>
            )}
            {selectedCity !== 'All' && (
              <span className="applied-pill">
                City: <strong>{selectedCity}</strong>
                <button onClick={() => setSelectedCity('All')}><X size={12} /></button>
              </span>
            )}
            {selectedStatus !== 'All' && (
              <span className="applied-pill">
                Status: <strong>{selectedStatus}</strong>
                <button onClick={() => setSelectedStatus('All')}><X size={12} /></button>
              </span>
            )}
            {searchKeyword && (
              <span className="applied-pill">
                Keyword: <strong>"{searchKeyword}"</strong>
                <button onClick={() => setSearchKeyword('')}><X size={12} /></button>
              </span>
            )}

            <button onClick={handleResetAllFilters} className="clear-all-text-btn">
              Clear All
            </button>
          </div>
        )}

        {/* Results Counter */}
        <div className="results-count-bar">
          <p className="results-text">
            Showing <strong>{filteredProperties.length}</strong> verified industrial properties
          </p>
        </div>

        {/* Properties Grid */}
        <div className="properties-grid">
          {filteredProperties.map((prop) => (
            <div 
              key={prop.id} 
              className="property-card"
              onClick={() => setActivePropertyModal(prop)}
            >
              {/* Image Container */}
              <div className="property-image-box">
                <img 
                  src={prop.image} 
                  alt={prop.title} 
                  className="property-image"
                  loading="lazy"
                />
                
                {/* Top Badges */}
                <div className="card-badge-top-left">
                  <span className="badge badge-grade">{prop.grade}</span>
                  <span className="badge badge-verified">
                    <ShieldCheck size={12} /> {prop.status}
                  </span>
                </div>

                <button 
                  className={`save-btn ${savedProperties[prop.id] ? 'saved' : ''}`}
                  onClick={(e) => toggleSave(prop.id, e)}
                  aria-label="Save Property"
                >
                  <Heart size={16} fill={savedProperties[prop.id] ? '#e11d48' : 'none'} color={savedProperties[prop.id] ? '#e11d48' : '#ffffff'} />
                </button>
              </div>

              {/* Card Body */}
              <div className="property-card-body">
                {/* Location */}
                <div className="property-location-tag">
                  <MapPin size={14} className="text-red" />
                  <span>{prop.location}, {prop.city}</span>
                </div>

                {/* Title */}
                <h3 className="property-card-title">{prop.title}</h3>

                {/* 3 Key Spec Badges */}
                <div className="spec-badges-grid">
                  <div className="spec-badge-box">
                    <span className="spec-badge-label">Total Space</span>
                    <span className="spec-badge-val">{prop.areaSqFt?.toLocaleString()} Sq.Ft</span>
                  </div>
                  <div className="spec-badge-box">
                    <span className="spec-badge-label">Clear Height</span>
                    <span className="spec-badge-val">{prop.clearHeight || '12 Meters'}</span>
                  </div>
                  <div className="spec-badge-box highlight">
                    <span className="spec-badge-label">Expected Rate</span>
                    <span className="spec-badge-val">₹{prop.pricePerSqFt || '24'} / sq.ft</span>
                  </div>
                </div>

                {/* Key Tags */}
                <div className="features-tags-row">
                  <span className="mini-tag">✓ Ready Fire NOC</span>
                  <span className="mini-tag">✓ Heavy Flooring</span>
                  <span className="mini-tag">✓ {prop.dockDoors || '6'} Docks</span>
                </div>

                {/* Card Action Buttons */}
                <div className="card-actions-row">
                  <button 
                    type="button"
                    className="btn btn-outline btn-sm card-view-btn"
                    onClick={() => setActivePropertyModal(prop)}
                  >
                    View Details <ArrowRight size={14} />
                  </button>

                  <button 
                    type="button"
                    className="btn btn-whatsapp btn-sm card-wa-btn"
                    onClick={(e) => handleWhatsAppProperty(prop, e)}
                    title="Direct WhatsApp Inquiry"
                  >
                    <MessageSquare size={14} /> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State with Working Reset */}
        {filteredProperties.length === 0 && (
          <div className="empty-results-box">
            <Building size={48} className="text-muted" />
            <h3>No warehouses matched your exact filter</h3>
            <p>Try resetting filters to view all available industrial sheds and parks.</p>
            <button 
              onClick={handleResetAllFilters} 
              className="btn btn-red"
            >
              <RotateCcw size={16} /> Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Property Detail Modal */}
      {activePropertyModal && (
        <PropertyDetailModal 
          property={activePropertyModal}
          onClose={() => setActivePropertyModal(null)}
          onBookVisit={(details) => {
            setActivePropertyModal(null);
            if (onOpenInquiry) {
              onOpenInquiry('need', {
                cityReq: details.propertyTitle,
                message: `Booked site visit for ${details.date} by ${details.name} (${details.phone})`
              });
            }
          }}
        />
      )}

      <style>{`
        .listings-section {
          background: #f8fafc;
        }

        .filter-controls-card {
          background: #ffffff;
          border-radius: var(--radius-md);
          padding: 18px 20px;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-sm);
          margin-bottom: 16px;
        }

        .category-chips-row {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 14px;
        }

        .category-chip {
          padding: 7px 16px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-sub);
          background: var(--bg-subtle);
          border: 1px solid var(--border-light);
          white-space: nowrap;
          transition: var(--transition);
        }

        .category-chip:hover, .category-chip.active {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
        }

        .secondary-filters-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .filter-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .filter-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-sub);
        }

        .filter-select {
          padding: 6px 12px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-light);
          background: #ffffff;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-main);
          outline: none;
          cursor: pointer;
        }

        .filter-search-input {
          padding: 6px 12px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-light);
          background: #ffffff;
          font-size: 0.85rem;
          width: 240px;
          outline: none;
        }

        .filter-search-input:focus, .filter-select:focus {
          border-color: var(--primary);
        }

        .sort-item {
          margin-left: auto;
        }

        .reset-all-filters-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: var(--brand-red-light);
          color: var(--brand-red);
          border: 1px solid rgba(225, 29, 72, 0.2);
          border-radius: var(--radius-xs);
          font-size: 0.82rem;
          font-weight: 700;
          transition: var(--transition);
        }

        .reset-all-filters-btn:hover {
          background: var(--brand-red);
          color: #ffffff;
        }

        /* Active Applied Filters Strip */
        .active-filters-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          padding: 10px 14px;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          margin-bottom: 20px;
        }

        .active-filter-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .applied-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-subtle);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          color: var(--text-heading);
          border: 1px solid var(--border-light);
        }

        .applied-pill button {
          color: var(--text-muted);
          display: flex;
          align-items: center;
          padding: 2px;
          border-radius: 50%;
        }

        .applied-pill button:hover {
          background: var(--brand-red);
          color: #ffffff;
        }

        .clear-all-text-btn {
          margin-left: auto;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--brand-red);
          text-decoration: underline;
        }

        .results-count-bar {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .results-text {
          font-size: 0.92rem;
          color: var(--text-sub);
        }

        /* Properties Grid */
        .properties-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .property-card {
          background: #ffffff;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .property-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-3px);
          border-color: #cbd5e1;
        }

        .property-image-box {
          position: relative;
          height: 210px;
          overflow: hidden;
          background: #0f172a;
        }

        .property-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .property-card:hover .property-image {
          transform: scale(1.04);
        }

        .card-badge-top-left {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          gap: 6px;
        }

        .save-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .save-btn:hover {
          background: rgba(15, 23, 42, 0.9);
        }

        .property-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .property-location-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .property-card-title {
          font-size: 1.15rem;
          color: var(--text-heading);
          margin-bottom: 14px;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* 3 Metric Badges Grid */
        .spec-badges-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          background: var(--bg-subtle);
          padding: 10px 8px;
          border-radius: var(--radius-xs);
          margin-bottom: 14px;
        }

        .spec-badge-box {
          display: flex;
          flex-direction: column;
          text-align: center;
        }

        .spec-badge-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
        }

        .spec-badge-val {
          font-size: 0.86rem;
          font-weight: 800;
          color: var(--text-heading);
        }

        .spec-badge-box.highlight .spec-badge-val {
          color: var(--brand-red);
        }

        .features-tags-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .mini-tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--brand-emerald);
          background: var(--brand-emerald-light);
          padding: 2px 6px;
          border-radius: var(--radius-xs);
        }

        .card-actions-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--border-light);
        }

        .card-view-btn {
          flex: 1;
        }

        .card-wa-btn {
          padding: 8px 12px;
        }

        .empty-results-box {
          text-align: center;
          padding: 48px 20px;
          background: #ffffff;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          max-width: 500px;
          margin: 40px auto;
        }

        @media (max-width: 1040px) {
          .properties-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 700px) {
          .properties-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .filter-controls-card {
            padding: 12px 14px;
          }
          .secondary-filters-row {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .filter-search-input {
            width: 100%;
          }
          .sort-item {
            margin-left: 0;
          }
          .property-card-body {
            padding: 16px 14px;
          }
          .property-image-box {
            height: 180px;
          }
          .property-card-title {
            font-size: 1.05rem;
            margin-bottom: 10px;
          }
          .spec-badges-grid {
            gap: 4px;
            padding: 8px 6px;
          }
          .spec-badge-val {
            font-size: 0.78rem;
          }
          .active-filters-strip {
            padding: 8px 10px;
            gap: 6px;
          }
        }
      `}</style>
    </section>
  );
}
