import React, { useState } from 'react';
import { 
  Building2, 
  HardHat, 
  Boxes, 
  Truck, 
  Cpu, 
  Wrench, 
  Layers, 
  Zap, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Check
} from 'lucide-react';
import { CORE_SERVICES } from '../data/warehouseData';
import ServiceDetailModal from './ServiceDetailModal';

const iconMap = {
  Building2: Building2,
  HardHat: HardHat,
  Boxes: Boxes,
  Truck: Truck,
  Cpu: Cpu,
  Wrench: Wrench,
  Layers: Layers,
  Zap: Zap,
  Sparkles: Sparkles,
  ShieldAlert: ShieldAlert,
  ShieldCheck: ShieldCheck
};

export default function ServicesSection({ onOpenRfq }) {
  const [activeService, setActiveService] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);

  const partners = [
    { name: "Mactech Engineers Pvt Ltd", role: "Turnkey EPC" },
    { name: "Godrej Storage Solutions", role: "Storage & Racking Partner" },
    { name: "Kärcher Germany", role: "Cleaning Equipment Partner" }
  ];

  // Display first 4 core pillars by default, show all 11 on toggle
  const displayedServices = showAllServices ? CORE_SERVICES : CORE_SERVICES.slice(0, 4);

  return (
    <section className="nb-services-section section-padding" id="services">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <HardHat size={13} /> Turnkey Industrial Capabilities
          </span>
          <h2 className="section-title">End-to-End Warehouse & Storage Solutions</h2>
          <p className="section-subtitle">
            Direct warehouse leasing, Built-to-Suit PEB construction, and Godrej racking systems tailored for manufacturing and 3PL leaders.
          </p>
        </div>

        {/* Alliance Ribbon */}
        <div className="nb-alliance-strip">
          <span className="alliance-tag">Certified Engineering Alliances:</span>
          <div className="alliance-list">
            {partners.map((p, i) => (
              <div key={i} className="alliance-item">
                <Check size={13} className="text-teal" />
                <span className="alliance-name">{p.name}</span>
                <span className="alliance-role">({p.role})</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Clean Executive Pillar Cards */}
        <div className="nb-services-grid">
          {displayedServices.map((srv) => {
            const IconComponent = iconMap[srv.icon] || Building2;
            return (
              <div key={srv.id} className="nb-service-tile" onClick={() => setActiveService(srv)}>
                <div className="nb-tile-header">
                  <div className="nb-tile-icon-box">
                    <IconComponent size={22} className="nb-srv-icon" />
                  </div>
                  <span className="badge badge-amber">{srv.badge}</span>
                </div>

                <h3 className="nb-tile-title">{srv.title}</h3>
                <p className="nb-tile-desc">{srv.shortDesc}</p>

                <div className="nb-tile-bullets">
                  {srv.keyPoints.slice(0, 2).map((pt, index) => (
                    <div key={index} className="nb-tile-bullet-item">
                      <CheckCircle2 size={13} className="text-teal flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="nb-tile-footer">
                  <span className="nb-tile-cta">
                    View Specifications & Quote <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Toggle */}
        <div className="nb-services-toggle-wrap">
          <button 
            className="btn btn-outline"
            onClick={() => setShowAllServices(!showAllServices)}
          >
            {showAllServices ? 'Show Top 4 Core Solutions' : `Explore All ${CORE_SERVICES.length} Turnkey Capabilities`}
          </button>
        </div>
      </div>

      {/* Service Modal */}
      {activeService && (
        <ServiceDetailModal 
          service={activeService} 
          onClose={() => setActiveService(null)} 
        />
      )}

      <style>{`
        .nb-services-section {
          background-color: #ffffff;
        }

        .nb-alliance-strip {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #f9fafb;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 10px 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .alliance-tag {
          font-size: 0.775rem;
          font-weight: 700;
          color: #003666;
          text-transform: uppercase;
        }

        .alliance-list {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .alliance-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #ffffff;
          border: 1px solid var(--border-color);
          padding: 3px 10px;
          border-radius: var(--radius-xs);
          font-size: 0.775rem;
        }

        .alliance-name {
          font-weight: 600;
          color: var(--text-heading);
        }

        .alliance-role {
          color: var(--text-muted);
        }

        .nb-services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (max-width: 768px) {
          .nb-services-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        .nb-services-toggle-wrap {
          display: flex;
          justify-content: center;
          margin-top: 32px;
        }

        .nb-service-tile {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 22px;
          transition: var(--transition);
          cursor: pointer;
          display: flex;
          flex-direction: column;
        }

        .nb-service-tile:hover {
          border-color: #003666;
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }

        .nb-tile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .nb-tile-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: #f4f6f9;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #003666;
          transition: var(--transition);
        }

        .nb-service-tile:hover .nb-tile-icon-box {
          background: #003666;
          color: #ffffff;
        }

        .nb-tile-title {
          font-size: 1.1rem;
          color: var(--text-heading);
          margin-bottom: 6px;
        }

        .nb-tile-desc {
          font-size: 0.825rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .nb-tile-bullets {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 16px;
        }

        .nb-tile-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 0.775rem;
          color: var(--text-sub);
        }

        .nb-tile-footer {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #f3f4f6;
        }

        .nb-tile-cta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--brand-red);
          transition: var(--transition);
        }

        .nb-service-tile:hover .nb-tile-cta {
          gap: 8px;
        }
      `}</style>
    </section>
  );
}
