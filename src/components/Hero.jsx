import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Layers, 
  Clock, 
  CheckCircle2, 
  RotateCcw
} from 'lucide-react';

export default function Hero({ onSearchFilters, onSelectCategory, activeFilters }) {
  const [dealType, setDealType] = useState('Rent'); // 'Rent' | 'Buy' | 'BTS'
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSizeRange, setSelectedSizeRange] = useState('');

  // Sync with activeFilters from parent / clear when reset
  useEffect(() => {
    if (!activeFilters) {
      setSelectedCity('');
      setSelectedType('');
      setSelectedSizeRange('');
      setDealType('Rent');
    } else {
      if (activeFilters.city !== undefined) setSelectedCity(activeFilters.city || '');
      if (activeFilters.category !== undefined) setSelectedType(activeFilters.category || '');
      if (activeFilters.status !== undefined) {
        setDealType(activeFilters.status === 'Sale' ? 'Buy' : 'Rent');
      }
    }
  }, [activeFilters]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let minArea = null;
    let maxArea = null;

    if (selectedSizeRange === 'under25k') {
      maxArea = 25000;
    } else if (selectedSizeRange === '25k-50k') {
      minArea = 25000;
      maxArea = 50000;
    } else if (selectedSizeRange === '50k-100k') {
      minArea = 50000;
      maxArea = 100000;
    } else if (selectedSizeRange === '100k+') {
      minArea = 100000;
    }

    if (onSearchFilters) {
      onSearchFilters({
        status: dealType === 'Rent' ? 'Rent' : (dealType === 'Buy' ? 'Sale' : ''),
        city: selectedCity,
        category: selectedType,
        minArea,
        maxArea
      });
    }
  };

  const handleQuickCity = (city) => {
    const newCity = selectedCity === city ? '' : city;
    setSelectedCity(newCity);
    if (onSearchFilters) {
      onSearchFilters({
        city: newCity
      });
    }
  };

  const handleClearHeroFilters = () => {
    setSelectedCity('');
    setSelectedType('');
    setSelectedSizeRange('');
    setDealType('Rent');
    if (onSearchFilters) {
      onSearchFilters(null);
    }
  };

  const hasAnyHeroFilter = selectedCity || selectedType || selectedSizeRange;

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-content-wrap">
        {/* Main Headline */}
        <div className="hero-header">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span>Direct Warehouse Network</span>
          </div>
          <h1 className="hero-title">
            Find & Rent Verified Warehouses <span className="text-red">Across India</span>
          </h1>
          <p className="hero-subtitle">
            Connect directly with verified owners. Zero middleman commission. Ready Grade-A industrial sheds, cold storage, and logistics parks.
          </p>
        </div>

        {/* Streamlined Search Box */}
        <div className="hero-search-card">
          {/* Deal Type Switcher */}
          <div className="deal-tabs">
            <button 
              type="button" 
              className={`deal-tab ${dealType === 'Rent' ? 'active' : ''}`}
              onClick={() => setDealType('Rent')}
            >
              For Rent
            </button>
            <button 
              type="button" 
              className={`deal-tab ${dealType === 'Buy' ? 'active' : ''}`}
              onClick={() => setDealType('Buy')}
            >
              For Sale
            </button>
            <button 
              type="button" 
              className={`deal-tab ${dealType === 'BTS' ? 'active' : ''}`}
              onClick={() => setDealType('BTS')}
            >
              Built-to-Suit
            </button>
          </div>

          {/* 1-Step Unified Search Bar */}
          <form onSubmit={handleSearchSubmit} className="search-bar-grid">
            {/* 1. City Field */}
            <div className="search-field">
              <label className="field-label">
                <MapPin size={14} className="text-red flex-shrink-0" />
                <span>SELECT CITY / HUB</span>
              </label>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="clean-select"
              >
                <option value="">All Locations in India</option>
                <option value="Chennai">Chennai (Sriperumbudur / Oragadam)</option>
                <option value="Bangalore">Bangalore (Hoskote / Nelamangala)</option>
                <option value="Sricity">Sri City SEZ & DTA</option>
                <option value="Pune">Pune (Chakan / Talegaon)</option>
                <option value="Mumbai">Mumbai (Bhiwandi / Panvel)</option>
                <option value="Hyderabad">Hyderabad (Shamshabad / Medchal)</option>
                <option value="Hosur">Hosur Industrial Belt</option>
                <option value="Coimbatore">Coimbatore Industrial Corridor</option>
              </select>
            </div>

            {/* 2. Property Type Field */}
            <div className="search-field">
              <label className="field-label">
                <Building2 size={14} className="text-muted flex-shrink-0" />
                <span>WAREHOUSE TYPE</span>
              </label>
              <select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                className="clean-select"
              >
                <option value="">All Property Types</option>
                <option value="Warehouse">Grade-A Warehouse</option>
                <option value="Cold Storage">Cold Storage & Pharma</option>
                <option value="Industrial">Manufacturing Factory Shed</option>
                <option value="3PL / 4PL / 5PL">3PL Logistics Hub</option>
                <option value="Land">Industrial Land</option>
              </select>
            </div>

            {/* 3. Space Needed Field */}
            <div className="search-field">
              <label className="field-label">
                <Layers size={14} className="text-muted flex-shrink-0" />
                <span>SPACE REQUIRED</span>
              </label>
              <select 
                value={selectedSizeRange} 
                onChange={(e) => setSelectedSizeRange(e.target.value)}
                className="clean-select"
              >
                <option value="">Any Size (5k - 2L+ Sq.Ft)</option>
                <option value="under25k">Under 25,000 Sq.Ft</option>
                <option value="25k-50k">25,000 - 50,000 Sq.Ft</option>
                <option value="50k-100k">50,000 - 1,00,000 Sq.Ft</option>
                <option value="100k+">1,00,000+ Sq.Ft (Mega Park)</option>
              </select>
            </div>

            {/* 4. Search CTA Button */}
            <div className="search-cta-wrap">
              <button type="submit" className="btn btn-red btn-search">
                <Search size={16} />
                <span>Search Warehouses</span>
              </button>
            </div>
          </form>

          {/* Quick City Filter Pills */}
          <div className="quick-cities-strip">
            <span className="quick-label">TOP HUBS:</span>
            <div className="quick-pills-row">
              {['Chennai', 'Bangalore', 'Sricity', 'Pune', 'Mumbai', 'Hyderabad'].map((c) => (
                <button 
                  key={c} 
                  type="button" 
                  className={`quick-pill ${selectedCity === c ? 'active' : ''}`}
                  onClick={() => handleQuickCity(c)}
                >
                  {c === 'Sricity' ? 'Sri City' : c}
                </button>
              ))}

              {hasAnyHeroFilter && (
                <button 
                  type="button" 
                  onClick={handleClearHeroFilters}
                  className="hero-clear-btn"
                  title="Reset Filters"
                >
                  <RotateCcw size={11} /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3 Core Trust Pillars */}
        <div className="trust-pillars-row">
          <div className="trust-pillar-item">
            <div className="pillar-icon bg-emerald">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="pillar-title">100% Direct Owners</h3>
              <p className="pillar-desc">No middlemen commission or hidden brokerage fees.</p>
            </div>
          </div>

          <div className="trust-pillar-item">
            <div className="pillar-icon bg-blue">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h3 className="pillar-title">Verified Grade-A Specs</h3>
              <p className="pillar-desc">Laser screed flooring, 12m clear height & Fire NOCs.</p>
            </div>
          </div>

          <div className="trust-pillar-item">
            <div className="pillar-icon bg-amber">
              <Clock size={18} />
            </div>
            <div>
              <h3 className="pillar-title">Fast Site Inspections</h3>
              <p className="pillar-desc">Book a site visit with our local engineer in 24 hours.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%);
          padding: 36px 0 44px;
          border-bottom: 1px solid var(--border-light);
        }

        .hero-content-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .hero-header {
          text-align: center;
          max-width: 820px;
          margin-bottom: 20px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--primary);
          box-shadow: var(--shadow-xs);
          margin-bottom: 10px;
        }

        .pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--brand-emerald);
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.25);
        }

        .hero-title {
          font-size: 2.3rem;
          color: var(--primary-dark);
          letter-spacing: -0.03em;
          margin-bottom: 8px;
          line-height: 1.18;
        }

        .hero-subtitle {
          font-size: 0.98rem;
          color: var(--text-sub);
          line-height: 1.5;
          max-width: 660px;
          margin: 0 auto;
        }

        /* Search Card */
        .hero-search-card {
          width: 100%;
          max-width: 1060px;
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 20px 22px;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-light);
          margin-bottom: 24px;
          text-align: left;
          box-sizing: border-box;
        }

        .deal-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 10px;
          width: 100%;
        }

        .deal-tab {
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-muted);
          background: var(--bg-subtle);
          transition: var(--transition);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .deal-tab:hover {
          color: var(--primary);
          background: #e2e8f0;
        }

        .deal-tab.active {
          color: #ffffff;
          background: var(--primary);
        }

        .search-bar-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr auto;
          gap: 12px;
          align-items: flex-end;
          width: 100%;
        }

        .search-field {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 5px;
          width: 100%;
        }

        .field-label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-heading);
          text-transform: uppercase;
          letter-spacing: 0.02em;
          text-align: left;
          width: 100%;
        }

        .clean-select {
          width: 100%;
          height: 44px;
          padding: 0 12px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-light);
          background: #ffffff;
          font-size: 0.88rem;
          color: var(--text-main);
          font-weight: 500;
          outline: none;
          transition: var(--transition);
          cursor: pointer;
          box-sizing: border-box;
          display: block;
        }

        .clean-select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(15, 39, 68, 0.1);
        }

        .search-cta-wrap {
          display: flex;
          width: 100%;
        }

        .btn-search {
          height: 44px;
          padding: 0 20px;
          font-size: 0.9rem;
          width: 100%;
          justify-content: center;
        }

        .quick-cities-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px dashed var(--border-light);
          flex-wrap: wrap;
          width: 100%;
        }

        .quick-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-muted);
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .quick-pills-row {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          flex: 1;
        }

        .quick-pill {
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-sub);
          background: var(--bg-subtle);
          border: 1px solid var(--border-light);
          white-space: nowrap;
          transition: var(--transition);
        }

        .quick-pill:hover, .quick-pill.active {
          color: var(--primary);
          background: #ffffff;
          border-color: var(--primary);
          box-shadow: var(--shadow-xs);
        }

        .hero-clear-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--brand-red);
          background: var(--brand-red-light);
          padding: 4px 8px;
          border-radius: var(--radius-full);
          white-space: nowrap;
          transition: var(--transition);
        }

        .hero-clear-btn:hover {
          background: var(--brand-red);
          color: #ffffff;
        }

        /* Trust Pillars */
        .trust-pillars-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          width: 100%;
          max-width: 1060px;
        }

        .trust-pillar-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #ffffff;
          padding: 12px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-xs);
        }

        .pillar-icon {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bg-emerald {
          background: var(--brand-emerald-light);
          color: var(--brand-emerald);
        }

        .bg-blue {
          background: var(--brand-blue-light);
          color: var(--brand-blue);
        }

        .bg-amber {
          background: var(--brand-amber-light);
          color: var(--brand-amber);
        }

        .pillar-title {
          font-size: 0.88rem;
          color: var(--text-heading);
          font-weight: 700;
          margin-bottom: 2px;
        }

        .pillar-desc {
          font-size: 0.76rem;
          color: var(--text-muted);
          line-height: 1.35;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .search-bar-grid {
            grid-template-columns: 1fr 1fr;
          }
          .search-cta-wrap {
            grid-column: span 2;
          }
          .trust-pillars-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }
        }

        @media (max-width: 600px) {
          .hero-section {
            padding: 16px 0 20px;
          }
          .hero-header {
            margin-bottom: 12px;
          }
          .hero-title {
            font-size: 1.55rem;
            line-height: 1.2;
            margin-bottom: 4px;
          }
          .hero-subtitle {
            font-size: 0.82rem;
            line-height: 1.4;
          }
          .hero-search-card {
            padding: 12px 12px 14px;
            border-radius: var(--radius-md);
            margin-bottom: 16px;
            width: 100%;
          }
          .deal-tabs {
            margin-bottom: 10px;
            padding-bottom: 6px;
            gap: 4px;
            width: 100%;
          }
          .deal-tab {
            font-size: 0.74rem;
            padding: 6px 2px;
          }
          .search-bar-grid {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            width: 100%;
          }
          .search-field {
            width: 100%;
            align-items: flex-start;
            text-align: left;
            gap: 3px;
          }
          .field-label {
            font-size: 0.72rem;
            text-align: left;
            justify-content: flex-start;
            width: 100%;
          }
          .clean-select {
            height: 40px;
            font-size: 13.5px;
            width: 100%;
          }
          .search-cta-wrap {
            width: 100%;
            margin-top: 4px;
          }
          .btn-search {
            height: 42px;
            font-size: 0.88rem;
            width: 100%;
          }
          .quick-cities-strip {
            margin-top: 10px;
            padding-top: 8px;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
          .quick-pills-row {
            width: 100%;
            gap: 5px;
          }
          .quick-label {
            font-size: 0.7rem;
          }
          .quick-pill {
            padding: 3px 8px;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </section>
  );
}
