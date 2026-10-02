import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Layers, 
  Clock, 
  CheckCircle2, 
  RotateCcw,
  ChevronDown
} from 'lucide-react';

export default function Hero({ onSearchFilters, onSelectCategory, activeFilters }) {
  const [dealType, setDealType] = useState('Rent'); // 'Buy' | 'Rent' | 'Commercial'
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [keywordInput, setKeywordInput] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Full Warehouse');
  const [selectedSizeRange, setSelectedSizeRange] = useState('');

  // Sync with activeFilters from parent / clear when reset
  useEffect(() => {
    if (!activeFilters) {
      setSelectedCity('Bangalore');
      setKeywordInput('');
      setSelectedPropertyType('Full Warehouse');
      setSelectedSizeRange('');
      setDealType('Rent');
    } else {
      if (activeFilters.city !== undefined) setSelectedCity(activeFilters.city || 'Bangalore');
      if (activeFilters.keyword !== undefined) setKeywordInput(activeFilters.keyword || '');
      if (activeFilters.status !== undefined) {
        if (activeFilters.status === 'Sale') setDealType('Buy');
        else if (activeFilters.status === 'Commercial') setDealType('Commercial');
        else setDealType('Rent');
      }
    }
  }, [activeFilters]);

  // Handle category radio switch based on dealType
  const getRadioOptions = () => {
    if (dealType === 'Buy') {
      return [
        { id: 'Industrial Land', label: 'Industrial Land / Plot' },
        { id: 'Pre-leased Warehouse', label: 'Pre-leased Warehouse' },
        { id: 'Factory Shed', label: 'Factory Shed' }
      ];
    }
    if (dealType === 'Commercial') {
      return [
        { id: 'Grade-A Warehouse', label: 'Grade-A Logistics Park' },
        { id: 'Cold Storage', label: 'Cold Storage & Pharma' },
        { id: 'Manufacturing', label: 'Manufacturing Facility' }
      ];
    }
    // Default Rent
    return [
      { id: 'Full Warehouse', label: 'Full Warehouse' },
      { id: 'Shared / 3PL', label: 'Shared / 3PL' },
      { id: 'Industrial Shed', label: 'Industrial Shed' }
    ];
  };

  const handleTabChange = (type) => {
    setDealType(type);
    if (type === 'Buy') setSelectedPropertyType('Industrial Land');
    else if (type === 'Commercial') setSelectedPropertyType('Grade-A Warehouse');
    else setSelectedPropertyType('Full Warehouse');
  };

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

    let categoryFilter = '';
    if (selectedPropertyType.includes('Cold Storage')) categoryFilter = 'Cold Storage';
    else if (selectedPropertyType.includes('3PL')) categoryFilter = '3PL / 4PL / 5PL';
    else if (selectedPropertyType.includes('Land')) categoryFilter = 'Land';
    else if (selectedPropertyType.includes('Industrial')) categoryFilter = 'Industrial';
    else if (selectedPropertyType.includes('Warehouse')) categoryFilter = 'Warehouse';

    if (onSearchFilters) {
      onSearchFilters({
        status: dealType === 'Buy' ? 'Sale' : (dealType === 'Rent' ? 'Rent' : ''),
        city: selectedCity === 'All' ? '' : selectedCity,
        keyword: keywordInput.trim(),
        category: categoryFilter,
        minArea,
        maxArea
      });
    }
  };

  const handleClearHeroFilters = () => {
    setSelectedCity('Bangalore');
    setKeywordInput('');
    setSelectedPropertyType('Full Warehouse');
    setSelectedSizeRange('');
    setDealType('Rent');
    if (onSearchFilters) {
      onSearchFilters(null);
    }
  };

  const hasAnyHeroFilter = keywordInput || selectedSizeRange || dealType !== 'Rent';

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-content-wrap">
        {/* Main Headline */}
        <div className="hero-header">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            <span>Direct Industrial Network</span>
          </div>
          <h1 className="hero-title">
            India's Largest NoBrokerage <span className="text-red">Warehouse Portal</span>
          </h1>
          <p className="hero-subtitle">
            Zero Brokerage • Verified Grade-A Sheds, Industrial Land & Logistics Parks Direct From Owners
          </p>
        </div>

        {/* NoBroker-Style Search Bar Component */}
        <div className="nobroker-search-wrapper">
          {/* Top Deal Type Tabs */}
          <div className="nobroker-tabs-row">
            <button 
              type="button" 
              className={`nb-tab ${dealType === 'Buy' ? 'active' : ''}`}
              onClick={() => handleTabChange('Buy')}
            >
              Buy
            </button>
            <button 
              type="button" 
              className={`nb-tab ${dealType === 'Rent' ? 'active' : ''}`}
              onClick={() => handleTabChange('Rent')}
            >
              Rent
            </button>
            <button 
              type="button" 
              className={`nb-tab ${dealType === 'Commercial' ? 'active' : ''}`}
              onClick={() => handleTabChange('Commercial')}
            >
              Commercial
            </button>
          </div>

          {/* Main White Box Search Container */}
          <form onSubmit={handleSearchSubmit} className="nobroker-search-box">
            {/* Top Search Line: City Dropdown | Keyword Search Input | Red Search Button */}
            <div className="nb-search-main-row">
              {/* 1. City Dropdown */}
              <div className="nb-city-selector-wrap">
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="nb-city-select"
                  aria-label="Select City"
                >
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi-NCR">Delhi-NCR</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Sri City">Sri City</option>
                  <option value="Hosur">Hosur</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="All">All India</option>
                </select>
                <ChevronDown size={15} className="nb-city-chevron" />
              </div>

              <div className="nb-row-divider"></div>

              {/* 2. Keyword / Locality Search Input */}
              <div className="nb-input-wrap">
                <input 
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  placeholder="Search upto 3 industrial hubs, localities or landmarks (e.g. Hoskote, Nelamangala)"
                  className="nb-text-input"
                />
              </div>

              {/* 3. Red Search Button */}
              <button type="submit" className="nb-search-btn">
                <Search size={18} className="nb-search-icon" />
                <span className="nb-search-text">Search</span>
              </button>
            </div>

            {/* Bottom Sub-Filter Line: Radio Options + Size / Type Dropdown */}
            <div className="nb-subfilter-row">
              {/* Radio options */}
              <div className="nb-radios-group">
                {getRadioOptions().map((opt) => (
                  <label key={opt.id} className="nb-radio-label">
                    <input 
                      type="radio" 
                      name="warehouse_type_radio"
                      value={opt.id}
                      checked={selectedPropertyType === opt.id}
                      onChange={() => setSelectedPropertyType(opt.id)}
                      className="nb-native-radio"
                    />
                    <span className="nb-custom-radio"></span>
                    <span className="nb-radio-text">{opt.label}</span>
                  </label>
                ))}
              </div>

              {/* Size / BHK Type Dropdown on Right */}
              <div className="nb-size-dropdown-wrap">
                <select 
                  value={selectedSizeRange}
                  onChange={(e) => setSelectedSizeRange(e.target.value)}
                  className="nb-size-select"
                >
                  <option value="">Space Size (Sq.Ft)</option>
                  <option value="under25k">Under 25,000 Sq.Ft</option>
                  <option value="25k-50k">25,000 - 50,000 Sq.Ft</option>
                  <option value="50k-100k">50,000 - 1,00,000 Sq.Ft</option>
                  <option value="100k+">1,00,000+ Sq.Ft (Mega Park)</option>
                </select>
                <ChevronDown size={14} className="nb-size-chevron" />
              </div>
            </div>
          </form>

          {/* Quick City Filter Pills underneath */}
          <div className="nb-quick-cities">
            <span className="quick-label">POPULAR HUBS:</span>
            <div className="quick-pills-row">
              {['Bangalore', 'Chennai', 'Mumbai', 'Pune', 'Hyderabad', 'Sri City'].map((c) => (
                <button 
                  key={c} 
                  type="button" 
                  className={`nb-quick-pill ${selectedCity === c ? 'active' : ''}`}
                  onClick={() => setSelectedCity(c)}
                >
                  {c}
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
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
          padding: 32px 0 40px;
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
          margin-bottom: 24px;
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
          font-size: 2.2rem;
          color: var(--primary-dark);
          letter-spacing: -0.03em;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 0.96rem;
          color: var(--text-sub);
          line-height: 1.5;
          max-width: 680px;
          margin: 0 auto;
        }

        /* =========================================================
           NoBroker Style Search Component
           ========================================================= */
        .nobroker-search-wrapper {
          width: 100%;
          max-width: 960px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 28px;
        }

        /* Tabs (Buy | Rent | Commercial) */
        .nobroker-tabs-row {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-bottom: -1px;
          z-index: 2;
        }

        .nb-tab {
          padding: 8px 20px;
          font-size: 0.98rem;
          font-weight: 600;
          color: #64748b;
          background: transparent;
          border: none;
          position: relative;
          cursor: pointer;
          transition: var(--transition);
        }

        .nb-tab:hover {
          color: var(--brand-red);
        }

        .nb-tab.active {
          color: var(--brand-red);
          font-weight: 700;
        }

        .nb-tab.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 3px;
          background: var(--brand-red);
          border-radius: 3px 3px 0 0;
        }

        /* Main Search Card */
        .nobroker-search-box {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04);
          overflow: hidden;
          transition: var(--transition);
        }

        .nobroker-search-box:focus-within {
          border-color: #cbd5e1;
          box-shadow: 0 8px 30px -4px rgba(15, 23, 42, 0.12);
        }

        /* Search Top Line */
        .nb-search-main-row {
          display: flex;
          align-items: stretch;
          border-bottom: 1px solid #f1f5f9;
          background: #ffffff;
        }

        /* City Selector */
        .nb-city-selector-wrap {
          position: relative;
          min-width: 160px;
          display: flex;
          align-items: center;
          background: #ffffff;
        }

        .nb-city-select {
          width: 100%;
          height: 52px;
          padding: 0 32px 0 16px;
          border: none;
          outline: none;
          background: transparent;
          font-size: 0.95rem;
          font-weight: 600;
          color: #0f172a;
          cursor: pointer;
          appearance: none;
        }

        .nb-city-chevron {
          position: absolute;
          right: 14px;
          pointer-events: none;
          color: #94a3b8;
        }

        .nb-row-divider {
          width: 1px;
          background: #e2e8f0;
          margin: 10px 0;
        }

        /* Keyword Text Input */
        .nb-input-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 16px;
        }

        .nb-text-input {
          width: 100%;
          height: 52px;
          border: none;
          outline: none;
          font-size: 0.92rem;
          color: #1e293b;
          background: transparent;
        }

        .nb-text-input::placeholder {
          color: #94a3b8;
          font-size: 0.88rem;
        }

        /* Search Button */
        .nb-search-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 32px;
          background: #ff385c;
          background: linear-gradient(135deg, #ff385c 0%, #e11d48 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          transition: var(--transition);
          flex-shrink: 0;
        }

        .nb-search-btn:hover {
          background: linear-gradient(135deg, #e11d48 0%, #be123c 100%);
          box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.08);
        }

        .nb-search-icon {
          stroke-width: 2.5;
        }

        /* Sub-Filter Row (Radio Options + Size Dropdown) */
        .nb-subfilter-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #ffffff;
          gap: 16px;
          flex-wrap: wrap;
        }

        .nb-radios-group {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .nb-radio-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          font-size: 0.86rem;
          font-weight: 500;
          color: #475569;
          user-select: none;
          transition: var(--transition);
        }

        .nb-radio-label:hover {
          color: #0f172a;
        }

        .nb-native-radio {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .nb-custom-radio {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          flex-shrink: 0;
        }

        .nb-native-radio:checked + .nb-custom-radio {
          border-color: #008080;
          background: #ffffff;
        }

        .nb-native-radio:checked + .nb-custom-radio::after {
          content: '';
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #008080;
        }

        .nb-radio-text {
          font-size: 0.86rem;
          color: #334155;
        }

        .nb-native-radio:checked ~ .nb-radio-text {
          font-weight: 600;
          color: #0f172a;
        }

        /* Size / BHK Dropdown */
        .nb-size-dropdown-wrap {
          position: relative;
          min-width: 170px;
        }

        .nb-size-select {
          width: 100%;
          height: 36px;
          padding: 0 28px 0 12px;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          background: #ffffff;
          font-size: 0.82rem;
          color: #475569;
          font-weight: 500;
          outline: none;
          cursor: pointer;
          appearance: none;
          transition: var(--transition);
        }

        .nb-size-select:hover, .nb-size-select:focus {
          border-color: #94a3b8;
          color: #0f172a;
        }

        .nb-size-chevron {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #94a3b8;
        }

        /* Popular Hubs strip */
        .nb-quick-cities {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .quick-label {
          font-size: 0.72rem;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.04em;
        }

        .quick-pills-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .nb-quick-pill {
          padding: 4px 12px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          color: #475569;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          transition: var(--transition);
          cursor: pointer;
        }

        .nb-quick-pill:hover, .nb-quick-pill.active {
          color: var(--primary);
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        .hero-clear-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--brand-red);
          background: #ffe4e6;
          border: 1px solid rgba(225, 29, 72, 0.2);
          cursor: pointer;
        }

        /* 3 Trust Pillars */
        .trust-pillars-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          width: 100%;
          max-width: 960px;
          margin-top: 8px;
        }

        .trust-pillar-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-xs);
        }

        .pillar-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #ffffff;
        }

        .bg-emerald {
          background: var(--brand-emerald);
        }
        .bg-blue {
          background: var(--brand-blue);
        }
        .bg-amber {
          background: var(--brand-amber);
        }

        .pillar-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-heading);
          margin-bottom: 2px;
        }

        .pillar-desc {
          font-size: 0.78rem;
          color: var(--text-sub);
          line-height: 1.4;
        }

        /* =========================================================
           Mobile & Tablet Responsive Styling
           ========================================================= */
        @media (max-width: 768px) {
          .hero-section {
            padding: 20px 0 28px;
          }

          .hero-title {
            font-size: 1.6rem;
          }

          .hero-subtitle {
            font-size: 0.86rem;
          }

          .nobroker-tabs-row {
            gap: 12px;
          }

          .nb-tab {
            padding: 6px 14px;
            font-size: 0.9rem;
          }

          .nb-search-main-row {
            flex-direction: column;
          }

          .nb-city-selector-wrap {
            width: 100%;
            border-bottom: 1px solid #f1f5f9;
          }

          .nb-city-select {
            height: 46px;
          }

          .nb-row-divider {
            display: none;
          }

          .nb-input-wrap {
            padding: 0 14px;
          }

          .nb-text-input {
            height: 46px;
            font-size: 0.85rem;
          }

          .nb-search-btn {
            width: 100%;
            height: 46px;
            padding: 0 16px;
            border-radius: 0 0 6px 6px;
          }

          .nb-subfilter-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 12px 14px;
            border-top: 1px solid #f1f5f9;
          }

          .nb-radios-group {
            width: 100%;
            gap: 14px;
          }

          .nb-size-dropdown-wrap {
            width: 100%;
          }

          .trust-pillars-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}
