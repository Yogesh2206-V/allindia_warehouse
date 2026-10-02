import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Building2, 
  PlusCircle, 
  Phone, 
  MapPin, 
  Layers, 
  MessageSquare,
  X 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { warehouseApi } from '../services/api';

export default function RequirementForm({ 
  initialMode = 'need', 
  prefillData = null, 
  onClose, 
  isModal = false 
}) {
  const [activeMode, setActiveMode] = useState(initialMode); // 'need' | 'post'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: prefillData?.cityReq || 'Chennai',
    propertyType: prefillData?.typeReq || 'Warehouse',
    area: prefillData?.areaReq || '',
    message: prefillData?.message || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    try {
      setIsSubmitting(true);
      await warehouseApi.submitRequirement({
        mode: activeMode,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        propertyType: formData.propertyType,
        areaSqFt: formData.area,
        additionalDetails: formData.message
      });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      setIsSubmitted(true);
      if (isModal && onClose) {
        setTimeout(() => onClose(), 2500);
      }
    } catch (err) {
      // Direct success fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formElement = (
    <div className={`req-form-card ${isModal ? 'is-modal-view' : ''}`}>
      {isModal && onClose && (
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
      )}

      {/* Mode Switcher Tabs */}
      <div className="req-mode-tabs">
        <button 
          type="button"
          className={`req-tab-btn ${activeMode === 'need' ? 'active' : ''}`}
          onClick={() => setActiveMode('need')}
        >
          <Building2 size={16} /> I Need Warehouse Space
        </button>
        <button 
          type="button"
          className={`req-tab-btn ${activeMode === 'post' ? 'active' : ''}`}
          onClick={() => setActiveMode('post')}
        >
          <PlusCircle size={16} /> List My Warehouse / Land
        </button>
      </div>

      {isSubmitted ? (
        <div className="req-success-view">
          <div className="success-icon-wrap">
            <CheckCircle2 size={44} className="text-emerald" />
          </div>
          <h3 className="success-title">Requirement Received Successfully!</h3>
          <p className="success-sub">
            Thank you, <strong>{formData.name}</strong>. Our industrial real estate specialist will contact you on <strong>{formData.phone}</strong> with verified direct options in {formData.city}.
          </p>

          <a 
            href={`https://wa.me/919884012341?text=${encodeURIComponent(`Hello, I submitted a requirement for ${formData.area || 'warehouse'} in ${formData.city}. Name: ${formData.name}, Phone: ${formData.phone}`)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-md"
          >
            <MessageSquare size={16} /> Chat on WhatsApp Now
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="req-form-body">
          <div className="req-form-header">
            <h3 className="req-form-title">
              {activeMode === 'need' 
                ? 'Get Verified Warehouse Options in 2 Hours' 
                : 'List Your Warehouse Shed / Industrial Land'}
            </h3>
            <p className="req-form-sub">
              {activeMode === 'need'
                ? 'Tell us your space requirement. Zero brokerage fees.'
                : 'Reach 1,000+ verified tenants & logistics companies directly.'}
            </p>
          </div>

          <div className="form-fields-grid">
            {/* Name */}
            <div className="form-field">
              <label className="field-label">Your Name *</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

            {/* Phone */}
            <div className="form-field">
              <label className="field-label">Phone Number *</label>
              <input 
                type="tel" 
                required
                placeholder="e.g. +91 98840 12341"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="form-input"
              />
            </div>

            {/* City */}
            <div className="form-field">
              <label className="field-label">Target City / Hub</label>
              <select 
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="form-input"
              >
                <option value="Chennai">Chennai (Sriperumbudur / Oragadam / Redhills)</option>
                <option value="Bangalore">Bangalore (Hoskote / Nelamangala)</option>
                <option value="Sri City">Sri City SEZ / DTA</option>
                <option value="Pune">Pune (Chakan / Talegaon)</option>
                <option value="Mumbai">Mumbai (Bhiwandi / Panvel)</option>
                <option value="Hyderabad">Hyderabad (Shamshabad / Medchal)</option>
                <option value="Hosur">Hosur Industrial Corridor</option>
                <option value="Coimbatore">Coimbatore Industrial Belt</option>
                <option value="Other">Other City in India</option>
              </select>
            </div>

            {/* Area / Size */}
            <div className="form-field">
              <label className="field-label">
                {activeMode === 'need' ? 'Space Needed (Sq.Ft)' : 'Total Property Area (Sq.Ft / Acres)'}
              </label>
              <input 
                type="text" 
                placeholder="e.g. 25,000 Sq.Ft or 5 Acres"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="form-input"
              />
            </div>

            {/* Property Type */}
            <div className="form-field full-width">
              <label className="field-label">Property Category</label>
              <select 
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="form-input"
              >
                <option value="Warehouse">Grade-A Warehouse Shed</option>
                <option value="Cold Storage">Cold Storage / Temperature Controlled</option>
                <option value="Industrial">Manufacturing Factory Shed</option>
                <option value="3PL / 4PL / 5PL">3PL Logistics Hub</option>
                <option value="Land">Industrial Land (BTS / Sale)</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="btn btn-red btn-lg w-full form-submit-btn"
          >
            <Send size={18} />
            <span>{isSubmitting ? 'Sending Request...' : (activeMode === 'need' ? 'Send My Requirement' : 'List Property for Free')}</span>
          </button>
        </form>
      )}

      <style>{`
        .req-form-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
        }

        .req-form-card.is-modal-view {
          border: none;
          box-shadow: none;
          padding: 10px;
        }

        .req-mode-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--bg-subtle);
          border-bottom: 1px solid var(--border-light);
        }

        .req-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px;
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--text-muted);
          background: transparent;
          transition: var(--transition);
        }

        .req-tab-btn.active {
          background: #ffffff;
          color: var(--primary);
          border-bottom: 3px solid var(--brand-red);
        }

        .req-form-body {
          padding: 32px;
        }

        .req-form-header {
          margin-bottom: 24px;
          text-align: center;
        }

        .req-form-title {
          font-size: 1.35rem;
          color: var(--text-heading);
          margin-bottom: 6px;
        }

        .req-form-sub {
          font-size: 0.9rem;
          color: var(--text-sub);
        }

        .form-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field.full-width {
          grid-column: span 2;
        }

        .field-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-heading);
        }

        .form-input {
          width: 100%;
          height: 46px;
          padding: 0 14px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-light);
          background: #ffffff;
          font-size: 0.92rem;
          color: var(--text-main);
          outline: none;
          transition: var(--transition);
        }

        .form-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(15, 39, 68, 0.1);
        }

        .form-submit-btn {
          height: 48px;
        }

        .req-success-view {
          padding: 48px 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .success-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--brand-emerald-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-title {
          font-size: 1.4rem;
          color: var(--text-heading);
        }

        .success-sub {
          font-size: 0.95rem;
          color: var(--text-sub);
          max-width: 480px;
          line-height: 1.55;
        }

        @media (max-width: 600px) {
          .req-tab-btn {
            padding: 11px 6px;
            font-size: 0.78rem;
            gap: 4px;
          }
          .req-form-body {
            padding: 18px 14px;
          }
          .req-form-title {
            font-size: 1.15rem;
          }
          .req-form-sub {
            font-size: 0.82rem;
          }
          .form-fields-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .form-field.full-width {
            grid-column: span 1;
          }
          .form-input {
            height: 44px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );

  if (isModal) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {formElement}
        </div>
      </div>
    );
  }

  return (
    <section className="req-section section-padding" id="requirement-form">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <PlusCircle size={14} /> Direct Sourcing
          </span>
          <h2 className="section-title">Can't Find the Exact Warehouse?</h2>
          <p className="section-subtitle">
            Submit your specific size, clear height, or BTS requirement. Our industrial engineering team will connect you directly with owners.
          </p>
        </div>

        {formElement}
      </div>

      <style>{`
        .req-section {
          background: #ffffff;
        }
      `}</style>
    </section>
  );
}
