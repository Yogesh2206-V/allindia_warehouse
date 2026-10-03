import React, { useState, useEffect } from 'react';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Search, 
  RotateCcw, 
  PlusCircle, 
  Building2,
  Inbox
} from 'lucide-react';
import MarketplaceSearchBar from './MarketplaceSearchBar';
import MarketplaceFilterDrawer from './MarketplaceFilterDrawer';
import MarketplacePropertyCard from './MarketplacePropertyCard';
import MarketplaceServicesSection from './MarketplaceServicesSection';
import MarketplaceTrustAndHowItWorks from './MarketplaceTrustAndHowItWorks';
import { marketplaceApi } from '../services/marketplaceApi';

export default function MarketplaceListingPage({ 
  onSelectProperty, 
  onUnlockContact, 
  onNavigatePostProperty,
  onEnquireService 
}) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    purpose: 'all',
    city: 'All Cities',
    locality: '',
    type: 'All Types',
    minArea: '',
    maxArea: '',
    maxBudget: 80,
    status: 'all',
    features: [],
    sort: 'newest'
  });

  const [visibleCount, setVisibleCount] = useState(6);

  // Fetch properties on filter change
  const fetchFilteredProperties = async () => {
    setLoading(true);
    try {
      const data = await marketplaceApi.getProperties(filters);
      setProperties(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFilteredProperties();
  }, [filters]);

  useEffect(() => {
    setSavedIds(marketplaceApi.getSavedPropertyIds());
  }, []);

  const handleSearchFromBar = (searchParams) => {
    setFilters(prev => ({
      ...prev,
      ...searchParams
    }));
    setVisibleCount(6);
  };

  const handleSortChange = (e) => {
    setFilters(prev => ({
      ...prev,
      sort: e.target.value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      purpose: 'all',
      city: 'All Cities',
      locality: '',
      type: 'All Types',
      minArea: '',
      maxArea: '',
      maxBudget: 80,
      status: 'all',
      features: [],
      sort: 'newest'
    });
    setVisibleCount(6);
  };

  const handleToggleSave = (id) => {
    const updated = marketplaceApi.toggleSaveProperty(id);
    setSavedIds(updated);
  };

  const displayedProperties = properties.slice(0, visibleCount);

  return (
    <div className="marketplace-container" style={{ padding: '24px 16px 60px' }}>
      {/* 1. Top Search Bar */}
      <div style={{ marginBottom: '28px' }}>
        <MarketplaceSearchBar 
          onSearch={handleSearchFromBar}
          activeFilters={filters}
        />
      </div>

      {/* 2. Top Bar: Results Count, Mobile Filter Trigger, Sort Dropdown */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 18px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f2744', margin: 0 }}>
            Verified Warehouse Spaces
          </h2>
          <span style={{ fontSize: '0.82rem', background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
            {properties.length} Results
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Mobile Filter Button */}
          <button 
            type="button" 
            className="btn btn-outline btn-sm mobile-only"
            onClick={() => setMobileFilterOpen(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ArrowUpDown size={14} color="#64748b" />
            <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>Sort by:</span>
            <select 
              value={filters.sort}
              onChange={handleSortChange}
              className="form-control"
              style={{ padding: '6px 10px', fontSize: '0.84rem', fontWeight: 600 }}
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="area_asc">Area: Small to Large</option>
              <option value="area_desc">Area: Large to Small</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Grid: Left Filter Sidebar + Right Cards List */}
      <div className="mp-listing-layout">
        {/* Left Filter Sidebar */}
        <MarketplaceFilterDrawer 
          filters={filters}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setVisibleCount(6);
          }}
          onResetFilters={handleResetFilters}
          isOpenMobile={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />

        {/* Right Content Area */}
        <div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              <div className="loading-spinner" style={{ margin: '0 auto 12px' }} />
              <p>Fetching verified properties...</p>
            </div>
          ) : properties.length === 0 ? (
            /* Friendly Empty State */
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '48px 24px', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f1f5f9', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Inbox size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f2744', margin: '0 0 6px' }}>
                No Properties Match Your Criteria
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', maxWidth: '420px', margin: '0 auto 20px' }}>
                Try adjusting your search radius, area requirements, or clearing filters to see more available industrial hubs.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={15} />
                  <span>Reset All Filters</span>
                </button>
                <button 
                  type="button" 
                  className="btn btn-red"
                  onClick={onNavigatePostProperty}
                >
                  <PlusCircle size={15} />
                  <span>Post Your Property</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="mp-cards-grid">
              {displayedProperties.map((property) => (
                <MarketplacePropertyCard 
                  key={property.id || property._id}
                  property={property}
                  onSelectProperty={onSelectProperty}
                  onUnlockContact={onUnlockContact}
                  isSaved={savedIds.includes(property.id || property._id)}
                  onToggleSave={handleToggleSave}
                />
              ))}

              {/* Load More Button */}
              {visibleCount < properties.length && (
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <button 
                    type="button"
                    className="btn btn-outline"
                    style={{ padding: '10px 24px', fontWeight: 700 }}
                    onClick={() => setVisibleCount(prev => prev + 6)}
                  >
                    Load More Properties ({properties.length - visibleCount} Remaining)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. Services Section */}
      <div style={{ marginTop: '50px' }}>
        <MarketplaceServicesSection onEnquireService={onEnquireService} />
      </div>

      {/* 5. Trust Strip & How It Works */}
      <div style={{ marginTop: '20px' }}>
        <MarketplaceTrustAndHowItWorks />
      </div>
    </div>
  );
}
