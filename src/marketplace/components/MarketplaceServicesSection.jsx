import React from 'react';
import { Building2, Compass, Forklift, FileText, ArrowRight } from 'lucide-react';

export default function MarketplaceServicesSection({ onEnquireService }) {
  const services = [
    {
      id: 'bts',
      title: 'Build-to-Suit (BTS) Warehouses',
      desc: 'Turnkey customized warehouse parks designed to exact height, dock bays, and flooring specifications.',
      icon: Building2,
      badge: 'Custom Architecture'
    },
    {
      id: 'consultancy',
      title: 'Industrial Real Estate Consultancy',
      desc: 'Corridor feasibility studies, land acquisition support, and statutory fire/CLU approvals across India.',
      icon: Compass,
      badge: 'Expert Advisory'
    },
    {
      id: 'forklifts',
      title: 'Forklifts & Material Handling',
      desc: 'Electric reach trucks, diesel forklifts, and hydraulic pallet jacks on short and long-term rentals.',
      icon: Forklift,
      badge: 'MHE Fleet'
    },
    {
      id: 'lease-agreement',
      title: 'Lease Agreement & Legal Drafting',
      desc: 'Customized industrial tenancy agreements, e-stamping, and verified title clearance checks.',
      icon: FileText,
      badge: 'Legal & Compliance'
    }
  ];

  return (
    <section style={{ padding: '40px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="marketplace-container">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Comprehensive Solutions
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f2744', margin: '4px 0 8px' }}>
            Industrial Warehousing Services
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '600px', margin: '0 auto' }}>
            End-to-end industrial property infrastructure, compliance, and material handling support.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div 
                key={svc.id}
                style={{ 
                  background: '#ffffff', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)',
                  transition: 'transform 0.2s'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '10px', background: '#0f2744', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={22} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '4px' }}>
                      {svc.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: '#0f2744', margin: '0 0 8px' }}>
                    {svc.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.86rem', lineHeight: 1.5, margin: '0 0 16px' }}>
                    {svc.desc}
                  </p>
                </div>

                <button 
                  type="button" 
                  className="btn btn-outline btn-sm w-full"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 600 }}
                  onClick={() => onEnquireService && onEnquireService(svc.title)}
                >
                  <span>Enquire Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
