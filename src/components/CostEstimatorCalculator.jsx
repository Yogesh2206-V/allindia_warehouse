import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, MapPin, Building2, Layers, CheckCircle2 } from 'lucide-react';

export default function CostEstimatorCalculator({ onOpenInquiry }) {
  const [area, setArea] = useState(30000);
  const [city, setCity] = useState('Chennai');
  const [propertyType, setPropertyType] = useState('Warehouse'); // 'Warehouse', 'Cold Storage', 'Industrial'

  const estimates = useMemo(() => {
    const cityRates = {
      'Chennai': 24,
      'Bangalore': 26,
      'Mumbai': 30,
      'Pune': 27,
      'Hyderabad': 25,
      'Sri City': 22,
      'Hosur': 23,
      'Coimbatore': 21
    };

    const typeMultipliers = {
      'Warehouse': 1.0,
      'Cold Storage': 2.2,
      'Industrial': 1.25
    };

    const baseRate = cityRates[city] || 24;
    const multiplier = typeMultipliers[propertyType] || 1.0;
    const ratePerSqFt = Math.round(baseRate * multiplier);
    const monthlyRent = area * ratePerSqFt;
    const palletCapacity = propertyType === 'Cold Storage' ? Math.round(area * 0.16) : Math.round(area * 0.12);
    const dockDoors = Math.max(2, Math.round(area / 8000));

    return {
      ratePerSqFt,
      monthlyRent,
      palletCapacity,
      dockDoors
    };
  }, [area, city, propertyType]);

  const handleGetQuotes = () => {
    if (onOpenInquiry) {
      onOpenInquiry('need', {
        cityReq: city,
        typeReq: propertyType,
        areaReq: `${area.toLocaleString()} Sq.Ft`,
        estMonthlyBudget: `₹ ${estimates.monthlyRent.toLocaleString()} / month`
      });
    }
  };

  return (
    <section className="calc-section section-padding" id="calculator">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Calculator size={14} /> Quick Rent Estimator
          </span>
          <h2 className="section-title">Warehouse Space & Cost Calculator</h2>
          <p className="section-subtitle">
            Instantly estimate your monthly lease cost, pallet capacity, and dock requirements based on your desired city.
          </p>
        </div>

        {/* Main 2-Column Calculator Card */}
        <div className="calc-card">
          {/* Left Column: Interactive Inputs */}
          <div className="calc-inputs-pane">
            <h3 className="pane-title">1. Configure Your Space Needs</h3>

            {/* 1. Size Slider */}
            <div className="calc-group">
              <div className="calc-label-row">
                <label className="calc-label">
                  <Layers size={16} className="text-red" /> Required Area:
                </label>
                <span className="calc-value-pill">{area.toLocaleString()} Sq.Ft</span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="150000" 
                step="2500"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value))}
                className="calc-range-slider"
                aria-label="Required Area Slider"
              />
              <div className="calc-slider-scale">
                <span>5K sq.ft</span>
                <span>50K</span>
                <span>100K</span>
                <span>150K sq.ft</span>
              </div>
            </div>

            {/* 2. City Selector */}
            <div className="calc-group">
              <label className="calc-label">
                <MapPin size={16} className="text-red" /> Select Target City:
              </label>
              <div className="city-buttons-grid">
                {['Chennai', 'Bangalore', 'Sri City', 'Pune', 'Mumbai', 'Hyderabad', 'Hosur'].map(c => (
                  <button 
                    key={c}
                    type="button"
                    className={`city-btn ${city === c ? 'active' : ''}`}
                    onClick={() => setCity(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Facility Type */}
            <div className="calc-group">
              <label className="calc-label">
                <Building2 size={16} className="text-muted" /> Type of Operation:
              </label>
              <div className="type-buttons-grid">
                {[
                  { id: 'Warehouse', label: 'Grade-A Warehouse' },
                  { id: 'Cold Storage', label: 'Cold Storage / Pharma' },
                  { id: 'Industrial', label: 'Manufacturing Shed' }
                ].map(t => (
                  <button 
                    key={t.id}
                    type="button"
                    className={`type-btn ${propertyType === t.id ? 'active' : ''}`}
                    onClick={() => setPropertyType(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Live Estimate Result */}
          <div className="calc-results-pane">
            <h3 className="result-pane-title">Estimated Monthly Budget</h3>
            
            <div className="main-price-display">
              <span className="price-currency">₹</span>
              <span className="price-amount">{estimates.monthlyRent.toLocaleString()}</span>
              <span className="price-per">/ month</span>
            </div>

            <p className="price-disclaimer">
              *Approx. market base rent for {city} (₹{estimates.ratePerSqFt}/sq.ft/mo)
            </p>

            {/* Quick Metrics */}
            <div className="result-metrics-grid">
              <div className="result-metric-card">
                <span className="metric-title">Pallet Positions</span>
                <span className="metric-val">~{estimates.palletCapacity.toLocaleString()} Pallets</span>
              </div>
              <div className="result-metric-card">
                <span className="metric-title">Dock Loading Bays</span>
                <span className="metric-val">{estimates.dockDoors} Dedicated Docks</span>
              </div>
              <div className="result-metric-card">
                <span className="metric-title">Clear Height</span>
                <span className="metric-val">10 - 13.5 Meters</span>
              </div>
              <div className="result-metric-card">
                <span className="metric-title">Brokerage Fee</span>
                <span className="metric-val text-emerald">₹0 (Zero Brokerage)</span>
              </div>
            </div>

            {/* CTA Button */}
            <button 
              onClick={handleGetQuotes} 
              className="btn btn-red btn-lg w-full calc-cta-btn"
            >
              <span>Get Exact Quotation & Sheds</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .calc-section {
          background: #ffffff;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
          overflow: hidden;
        }

        .calc-card {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 28px;
          background: var(--bg-page);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          padding: 32px;
          box-shadow: var(--shadow-sm);
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        .calc-inputs-pane, .calc-results-pane {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }

        .pane-title {
          font-size: 1.2rem;
          color: var(--text-heading);
          margin-bottom: 20px;
        }

        .calc-group {
          margin-bottom: 22px;
          width: 100%;
          min-width: 0;
        }

        .calc-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
        }

        .calc-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-heading);
        }

        .calc-value-pill {
          background: var(--primary);
          color: #ffffff;
          font-weight: 800;
          font-size: 0.9rem;
          padding: 4px 12px;
          border-radius: var(--radius-full);
          white-space: nowrap;
        }

        .calc-range-slider {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: #cbd5e1;
          outline: none;
          accent-color: var(--brand-red);
          cursor: pointer;
          display: block;
          margin: 6px 0;
        }

        .calc-slider-scale {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 4px;
          width: 100%;
        }

        .city-buttons-grid, .type-buttons-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
          width: 100%;
        }

        .city-btn, .type-btn {
          padding: 7px 12px;
          border-radius: var(--radius-xs);
          background: #ffffff;
          border: 1px solid var(--border-light);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-sub);
          transition: var(--transition);
          cursor: pointer;
          white-space: nowrap;
        }

        .city-btn:hover, .type-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .city-btn.active, .type-btn.active {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
        }

        /* Results Pane */
        .calc-results-pane {
          background: #ffffff;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
          padding: 24px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-md);
        }

        .result-pane-title {
          font-size: 0.88rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .main-price-display {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 4px;
        }

        .price-currency {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--brand-red);
        }

        .price-amount {
          font-size: clamp(1.8rem, 5vw, 2.4rem);
          font-weight: 800;
          color: var(--primary-dark);
          line-height: 1.1;
          word-break: break-word;
        }

        .price-per {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .price-disclaimer {
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .result-metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 20px;
          width: 100%;
        }

        .result-metric-card {
          background: var(--bg-subtle);
          padding: 10px 12px;
          border-radius: var(--radius-xs);
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .metric-title {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .metric-val {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .calc-cta-btn {
          margin-top: auto;
          width: 100%;
          text-align: center;
          white-space: normal;
          padding: 12px 16px;
          line-height: 1.3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .calc-card {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 20px;
          }
        }

        @media (max-width: 576px) {
          .calc-card {
            padding: 14px;
            gap: 16px;
            border-radius: var(--radius-md);
          }

          .pane-title {
            font-size: 1.05rem;
            margin-bottom: 14px;
          }

          .calc-label {
            font-size: 0.84rem;
          }

          .calc-value-pill {
            font-size: 0.8rem;
            padding: 3px 10px;
          }

          .calc-slider-scale {
            font-size: 0.68rem;
          }

          .city-buttons-grid, .type-buttons-grid {
            gap: 5px;
          }

          .city-btn, .type-btn {
            padding: 6px 10px;
            font-size: 0.76rem;
            flex: 1 1 auto;
            text-align: center;
          }

          .calc-results-pane {
            padding: 16px 14px;
          }

          .result-metrics-grid {
            grid-template-columns: 1fr 1fr;
            gap: 6px;
          }

          .result-metric-card {
            padding: 8px 10px;
          }

          .metric-title {
            font-size: 0.64rem;
          }

          .metric-val {
            font-size: 0.82rem;
          }

          .calc-cta-btn {
            font-size: 0.9rem;
            padding: 11px 14px;
          }
        }
      `}</style>
    </section>
  );
}
