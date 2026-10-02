import React from 'react';
import { MapPin, ArrowRight, Compass, Building2, ExternalLink } from 'lucide-react';
import { TOP_LOCATIONS } from '../data/warehouseData';

export default function LocationsHub({ onSelectCityFilter }) {
  const hubsList = [
    {
      city: 'Chennai',
      state: 'Tamil Nadu',
      tag: 'Automotive & Electronics Capital',
      count: '35+ Parks',
      corridors: ['Sriperumbudur', 'Oragadam', 'Redhills', 'Maraimalai Nagar', 'Periyapalayam'],
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80'
    },
    {
      city: 'Bangalore',
      state: 'Karnataka',
      tag: 'E-Commerce & Tech Freight Hub',
      count: '28+ Parks',
      corridors: ['Hoskote', 'Nelamangala', 'Bommasandra', 'Dobbaspet', 'Devenahalli'],
      img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&auto=format&fit=crop&q=80'
    },
    {
      city: 'Sri City',
      state: 'Andhra Pradesh (SEZ / DTA)',
      tag: 'Zero-Duty Export & MNC Zone',
      count: '15+ Grade-A Hubs',
      corridors: ['Domestic Tariff Area (DTA)', 'Customs SEZ Zone', 'Mega Food Park'],
      img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&auto=format&fit=crop&q=80'
    },
    {
      city: 'Pune',
      state: 'Maharashtra',
      tag: 'Heavy Engineering & Auto Hub',
      count: '22+ Parks',
      corridors: ['Chakan Phase 1-4', 'Talegaon MIDC', 'Ranjangaon', 'Shikrapur'],
      img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80'
    },
    {
      city: 'Mumbai',
      state: 'Maharashtra (MMR)',
      tag: 'Port Connectivity & Mega 3PL',
      count: '30+ Parks',
      corridors: ['Bhiwandi Logistics Hub', 'Panvel - JNPT Corridor', 'Taloja MIDC'],
      img: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=600&auto=format&fit=crop&q=80'
    },
    {
      city: 'Hyderabad',
      state: 'Telangana',
      tag: 'Pharma & Airport Cargo Hub',
      count: '20+ Parks',
      corridors: ['Shamshabad Airport Zone', 'Medchal Corridor', 'Patancheru'],
      img: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const handleCityClick = (cityName) => {
    if (onSelectCityFilter) {
      onSelectCityFilter(cityName);
      const el = document.getElementById('properties');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="locations-section section-padding" id="locations">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Compass size={14} /> Major Logistics Hubs
          </span>
          <h2 className="section-title">Warehouses in Top Industrial Corridors</h2>
          <p className="section-subtitle">
            Choose your strategic corridor with direct national highway connectivity, rail freight links, and port access.
          </p>
        </div>

        {/* 6 City Cards Grid */}
        <div className="hubs-grid">
          {hubsList.map((hub, idx) => (
            <div 
              key={idx} 
              className="hub-card"
              onClick={() => handleCityClick(hub.city)}
            >
              <div className="hub-card-img-wrap">
                <img src={hub.img} alt={hub.city} className="hub-card-img" />
                <div className="hub-overlay">
                  <span className="hub-badge">{hub.count}</span>
                </div>
              </div>

              <div className="hub-card-body">
                <div className="hub-title-row">
                  <div>
                    <h3 className="hub-city-name">{hub.city}</h3>
                    <span className="hub-state">{hub.state}</span>
                  </div>
                  <button className="hub-arrow-btn" aria-label="Explore City">
                    <ArrowRight size={18} />
                  </button>
                </div>

                <p className="hub-tag">{hub.tag}</p>

                {/* Corridor Tags */}
                <div className="corridors-list">
                  {hub.corridors.slice(0, 3).map((c, cIdx) => (
                    <span key={cIdx} className="corridor-pill">
                      <MapPin size={11} className="text-red" /> {c}
                    </span>
                  ))}
                  {hub.corridors.length > 3 && (
                    <span className="corridor-more">+{hub.corridors.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .locations-section {
          background: #f8fafc;
        }

        .hubs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .hub-card {
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

        .hub-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }

        .hub-card-img-wrap {
          position: relative;
          height: 160px;
          overflow: hidden;
        }

        .hub-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .hub-card:hover .hub-card-img {
          transform: scale(1.06);
        }

        .hub-overlay {
          position: absolute;
          top: 12px;
          right: 12px;
        }

        .hub-badge {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .hub-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .hub-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .hub-city-name {
          font-size: 1.25rem;
          color: var(--text-heading);
          font-weight: 800;
        }

        .hub-state {
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .hub-arrow-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-subtle);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .hub-card:hover .hub-arrow-btn {
          background: var(--brand-red);
          color: #ffffff;
        }

        .hub-tag {
          font-size: 0.85rem;
          color: var(--text-sub);
          margin-bottom: 14px;
        }

        .corridors-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px dashed var(--border-light);
        }

        .corridor-pill {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-sub);
          background: var(--bg-subtle);
          padding: 3px 8px;
          border-radius: var(--radius-xs);
        }

        .corridor-more {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--brand-red);
          padding: 3px 4px;
        }

        @media (max-width: 960px) {
          .hubs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .hubs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
