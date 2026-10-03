import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Building2, Maximize2, ChevronDown, Check } from 'lucide-react';
import { CITIES_LIST, LOCALITIES_BY_CITY, PROPERTY_TYPES } from '../data/sampleMarketplaceProperties';

export default function MarketplaceSearchBar({ onSearch, activeFilters = {} }) {
  const [purpose, setPurpose] = useState(activeFilters.purpose || 'rent');
  const [selectedCity, setSelectedCity] = useState(activeFilters.city || 'Chennai');
  const [locality, setLocality] = useState(activeFilters.locality || '');
  const [propertyType, setPropertyType] = useState(activeFilters.type || 'Warehouse');
  const [areaSqFt, setAreaSqFt] = useState(activeFilters.minArea || '');

  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [localityDropdownOpen, setLocalityDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const cityRef = useRef(null);
  const localityRef = useRef(null);
  const typeRef = useRef(null);

  const quickCities = ["Chennai", "Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Ahmedabad"];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (cityRef.current && !cityRef.current.contains(e.target)) setCityDropdownOpen(false);
      if (localityRef.current && !localityRef.current.contains(e.target)) setLocalityDropdownOpen(false);
      if (typeRef.current && !typeRef.current.contains(e.target)) setTypeDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const availableLocalities = LOCALITIES_BY_CITY[selectedCity] || [
    "Industrial Park", "Logistics Hub", "Highway Corridor", "MIDC Phase", "Cargo Vicinity"
  ];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setLocality('');
    setCityDropdownOpen(false);
  };

  const handleQuickCityClick = (city) => {
    setSelectedCity(city);
    setLocality('');
    if (onSearch) {
      onSearch({
        purpose,
        city,
        locality: '',
        type: propertyType === 'All Types' ? '' : propertyType,
        minArea: areaSqFt
      });
    }
  };

  const handleSubmitSearch = (e) => {
    if (e) e.preventDefault();
    if (onSearch) {
      onSearch({
        purpose,
        city: selectedCity === 'All Cities' ? '' : selectedCity,
        locality,
        type: propertyType === 'All Types' ? '' : propertyType,
        minArea: areaSqFt
      });
    }
  };

  return (
    <div className="mp-search-card" id="marketplace-search-section">
      {/* 1. Purpose Tabs: Rent | Buy | Lease */}
      <div className="mp-search-tabs">
        <button 
          type="button" 
          className={`mp-search-tab ${purpose === 'rent' ? 'active' : ''}`}
          onClick={() => setPurpose('rent')}
        >
          <span>Rent Warehouse</span>
        </button>
        <button 
          type="button" 
          className={`mp-search-tab ${purpose === 'lease' ? 'active' : ''}`}
          onClick={() => setPurpose('lease')}
        >
          <span>Long-Term Lease</span>
        </button>
        <button 
          type="button" 
          className={`mp-search-tab ${purpose === 'sale' ? 'active' : ''}`}
          onClick={() => setPurpose('sale')}
        >
          <span>Buy / Land Sale</span>
        </button>
      </div>

      {/* 2. Main Search Fields Grid */}
      <form onSubmit={handleSubmitSearch} className="mp-search-fields-grid">
        {/* City Selector */}
        <div className="mp-field-group" ref={cityRef}>
          <label className="mp-field-label">City / State</label>
          <div 
            className="mp-input-wrapper cursor-pointer"
            onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
          >
            <MapPin size={16} className="mp-input-icon text-red" />
            <input 
              type="text" 
              readOnly 
              value={selectedCity} 
              className="mp-input-control cursor-pointer"
              placeholder="Select City"
            />
            <ChevronDown size={14} style={{ position: 'absolute', right: 12, color: '#94a3b8' }} />
          </div>
          {cityDropdownOpen && (
            <div className="mp-autosuggest-dropdown">
              <div 
                className="mp-suggest-item"
                onClick={() => handleCitySelect('All Cities')}
              >
                <strong>All Indian Hubs</strong>
              </div>
              {CITIES_LIST.map((c) => (
                <div 
                  key={c} 
                  className={`mp-suggest-item ${selectedCity === c ? 'text-red font-bold' : ''}`}
                  onClick={() => handleCitySelect(c)}
                >
                  <MapPin size={14} />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Locality Auto-suggest */}
        <div className="mp-field-group" ref={localityRef}>
          <label className="mp-field-label">Locality / Industrial Corridor</label>
          <div className="mp-input-wrapper">
            <Search size={16} className="mp-input-icon" />
            <input 
              type="text" 
              value={locality}
              onChange={(e) => {
                setLocality(e.target.value);
                setLocalityDropdownOpen(true);
              }}
              onFocus={() => setLocalityDropdownOpen(true)}
              className="mp-input-control"
              placeholder={`e.g. ${availableLocalities[0] || 'Locality'}`}
            />
          </div>
          {localityDropdownOpen && availableLocalities.length > 0 && (
            <div className="mp-autosuggest-dropdown">
              {availableLocalities
                .filter(l => !locality || l.toLowerCase().includes(locality.toLowerCase()))
                .map((loc) => (
                  <div 
                    key={loc}
                    className="mp-suggest-item"
                    onClick={() => {
                      setLocality(loc);
                      setLocalityDropdownOpen(false);
                    }}
                  >
                    <span>{loc}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Property Type Dropdown */}
        <div className="mp-field-group" ref={typeRef}>
          <label className="mp-field-label">Property Type</label>
          <div 
            className="mp-input-wrapper cursor-pointer"
            onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
          >
            <Building2 size={16} className="mp-input-icon" />
            <input 
              type="text" 
              readOnly 
              value={propertyType}
              className="mp-input-control cursor-pointer"
              placeholder="Select Type"
            />
            <ChevronDown size={14} style={{ position: 'absolute', right: 12, color: '#94a3b8' }} />
          </div>
          {typeDropdownOpen && (
            <div className="mp-autosuggest-dropdown">
              <div 
                className="mp-suggest-item"
                onClick={() => { setPropertyType('All Types'); setTypeDropdownOpen(false); }}
              >
                <span>All Property Types</span>
              </div>
              {PROPERTY_TYPES.map((t) => (
                <div 
                  key={t}
                  className="mp-suggest-item"
                  onClick={() => { setPropertyType(t); setTypeDropdownOpen(false); }}
                >
                  <span>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Area Needed (Sq.Ft.) */}
        <div className="mp-field-group">
          <label className="mp-field-label">Min Area (Sq.Ft.)</label>
          <div className="mp-input-wrapper">
            <Maximize2 size={16} className="mp-input-icon" />
            <input 
              type="number"
              value={areaSqFt}
              onChange={(e) => setAreaSqFt(e.target.value)}
              className="mp-input-control"
              placeholder="e.g. 20000"
              min="0"
              step="1000"
            />
          </div>
        </div>

        {/* Search Submit Button */}
        <button type="submit" className="mp-search-submit-btn">
          <Search size={18} />
          <span>Search</span>
        </button>
      </form>

      {/* 3. Quick Location Chips */}
      <div className="mp-quick-chips-wrap">
        <span className="mp-chips-label">Popular Hubs:</span>
        {quickCities.map((city) => (
          <button 
            key={city}
            type="button"
            className={`mp-city-chip ${selectedCity === city ? 'active' : ''}`}
            onClick={() => handleQuickCityClick(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
