import React, { useState } from 'react';
import { Search, PhoneCall, Building, ChevronDown, ChevronUp, ShieldCheck, CheckCircle2, Award, Users } from 'lucide-react';

export default function MarketplaceTrustAndHowItWorks() {
  const [openFaq, setOpenFaq] = useState(null);

  const steps = [
    {
      num: '01',
      title: 'Search & Filter',
      desc: 'Filter by city, ceiling height, dock counts, and cold storage capabilities across prime logistics corridors.',
      icon: Search
    },
    {
      num: '02',
      title: 'Contact Directly',
      desc: 'Verify your mobile via quick OTP to unlock direct owner contact numbers or request an immediate call back.',
      icon: PhoneCall
    },
    {
      num: '03',
      title: 'Site Visit & Lease',
      desc: 'Schedule a guided property walkthrough, verify fire NOCs, and finalize lease documentation with zero hassle.',
      icon: Building
    }
  ];

  const faqs = [
    {
      q: 'How does All India Warehouse verify property listings?',
      a: 'Our field and industrial logistics team inspects key infrastructure including clear ceiling height, flooring load capacity, dock levellers, fire NOCs, and transformer sanctions before marking a property as "Verified by our team".'
    },
    {
      q: 'Is posting a property free for warehouse owners?',
      a: 'Yes, owners and industrial park developers can list their spaces for free. Submissions are checked for compliance before going live to verified enterprise tenants.'
    },
    {
      q: 'Can I request build-to-suit customized spaces?',
      a: 'Yes, we facilitate customized build-to-suit logistics parks and industrial sheds ranging from 20,000 sq.ft. to 500,000+ sq.ft. with dedicated dock configurations.'
    },
    {
      q: 'How quickly does the team respond after unlocking contact?',
      a: 'Our direct warehouse desk connects with you within 1 business hour to share detailed layout floor plans, site access maps, and coordinate property visits.'
    }
  ];

  return (
    <div style={{ background: '#ffffff', padding: '50px 0' }}>
      <div className="marketplace-container">
        {/* 1. Trust Metrics Strip */}
        <div style={{ background: '#0f172a', borderRadius: '16px', padding: '30px 24px', color: '#ffffff', marginBottom: '50px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fda4af' }}>100+</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '4px', fontWeight: 600 }}>
                Verified Spaces Across India
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>10+</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '4px', fontWeight: 600 }}>
                Major Industrial Corridors
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4ade80' }}>2.5M+</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '4px', fontWeight: 600 }}>
                Sq.Ft. Warehousing Network
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#facc15' }}>100%</div>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '4px', fontWeight: 600 }}>
                Free Owner Listing Portal
              </div>
            </div>
          </div>
        </div>

        {/* 2. How It Works (3 Steps) */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#e11d48', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Seamless Process
          </span>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f2744', margin: '4px 0 8px' }}>
            How All India Warehouse Works
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '560px', margin: '0 auto' }}>
            Find, evaluate, and lease Grade-A warehousing in three simple steps.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '50px' }}>
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div 
                key={st.num}
                style={{ 
                  background: '#f8fafc', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '28px 24px', 
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <div style={{ position: 'absolute', top: 12, left: 16, fontSize: '1.4rem', fontWeight: 800, color: '#e2e8f0' }}>
                  {st.num}
                </div>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#0f2744', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f2744', margin: '0 0 8px' }}>
                  {st.title}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5, margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3. FAQ Block */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f2744', textAlign: 'center', marginBottom: '20px' }}>
            Frequently Asked Questions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}
                >
                  <button 
                    type="button" 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{ width: '100%', padding: '14px 18px', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left', cursor: 'pointer', fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 18px 14px', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, borderTop: '1px solid #f1f5f9' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
