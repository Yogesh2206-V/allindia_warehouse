import React from 'react';
import { Search, PhoneCall, Key, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function HowItWorks({ onOpenRequirement }) {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <ShieldCheck size={14} /> Simple 3-Step Process
          </span>
          <h2 className="section-title">How All India Warehouse Works</h2>
          <p className="section-subtitle">
            Whether you need space for your business or want to list your warehouse shed, we make it 100% direct and transparent.
          </p>
        </div>

        <div className="steps-grid">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-number-badge">1</div>
            <div className="step-icon-box">
              <Search size={24} className="text-red" />
            </div>
            <h3 className="step-title">1. Search & Filter</h3>
            <p className="step-description">
              Choose your city, property type (Grade-A shed, cold storage, or land), and required square footage.
            </p>
            <div className="step-perk">
              <Check size={14} className="text-emerald" /> 100% Verified clear-title listings
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-number-badge">2</div>
            <div className="step-icon-box">
              <PhoneCall size={24} className="text-emerald" />
            </div>
            <h3 className="step-title">2. Free Site Inspection</h3>
            <p className="step-description">
              Schedule a visit with our local warehouse engineering team or talk directly on WhatsApp / Phone.
            </p>
            <div className="step-perk">
              <Check size={14} className="text-emerald" /> Zero middleman fees or broker hassle
            </div>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-number-badge">3</div>
            <div className="step-icon-box">
              <Key size={24} className="text-blue" />
            </div>
            <h3 className="step-title">3. Direct Deal & Move In</h3>
            <p className="step-description">
              Sign a direct lease agreement with the warehouse owner, complete customized racking, and start operations.
            </p>
            <div className="step-perk">
              <Check size={14} className="text-emerald" /> Fast legal & compliance turnaround
            </div>
          </div>
        </div>

        {/* Quick CTA Banner */}
        <div className="how-cta-banner">
          <div className="how-cta-text">
            <h4>Have a specific space or custom BTS requirement?</h4>
            <p>Tell us your city and area needed, and our engineers will send you curated options within 2 hours.</p>
          </div>
          <button 
            onClick={() => onOpenRequirement('need')} 
            className="btn btn-red btn-lg"
          >
            Submit Custom Requirement <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .how-it-works-section {
          background: #ffffff;
          padding: 64px 0;
          border-bottom: 1px solid var(--border-light);
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .step-card {
          position: relative;
          background: var(--bg-page);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
        }

        .step-card:hover {
          background: #ffffff;
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .step-number-badge {
          position: absolute;
          top: -12px;
          left: 24px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--primary);
          color: #ffffff;
          font-weight: 800;
          font-size: 0.82rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-icon-box {
          width: 52px;
          height: 52px;
          background: #ffffff;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-xs);
        }

        .step-title {
          font-size: 1.15rem;
          color: var(--text-heading);
          margin-bottom: 8px;
        }

        .step-description {
          font-size: 0.9rem;
          color: var(--text-sub);
          line-height: 1.55;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .step-perk {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--primary);
          padding-top: 12px;
          border-top: 1px dashed var(--border-light);
        }

        .how-cta-banner {
          background: var(--primary);
          border-radius: var(--radius-md);
          padding: 28px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          color: #ffffff;
        }

        .how-cta-text h4 {
          font-size: 1.2rem;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .how-cta-text p {
          font-size: 0.9rem;
          color: #cbd5e1;
        }

        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
          .how-cta-banner {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
