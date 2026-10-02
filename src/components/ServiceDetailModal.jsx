import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  HardHat, 
  Building2, 
  Boxes, 
  Truck, 
  Cpu, 
  Wrench, 
  Layers, 
  Zap, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Phone,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { warehouseApi } from '../services/api';

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

export default function ServiceDetailModal({ service, onClose, onRfqSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!service) return null;

  const IconComp = iconMap[service.icon] || Building2;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    try {
      setSubmitting(true);
      await warehouseApi.submitInquiry({
        type: 'turnkey_service_quote',
        serviceTitle: service.title,
        name,
        phone,
        city,
        notes: details
      });

      confetti({
        particleCount: 70,
        spread: 50,
        origin: { y: 0.6 }
      });

      setSubmitted(true);
      setTimeout(() => {
        if (onRfqSubmit) {
          onRfqSubmit({
            serviceId: service.id,
            serviceTitle: service.title,
            name,
            phone,
            city,
            details
          });
        }
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error submitting turnkey service RFQ:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content service-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="service-modal-header">
          <div className="service-header-icon-box">
            <IconComp size={24} className="service-icon" />
          </div>
          <div>
            <span className="badge badge-amber">{service.badge}</span>
            <h2 className="service-modal-title">{service.title}</h2>
            <p className="service-modal-sub">{service.shortDesc}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="service-modal-body">
          {/* Key Specifications */}
          <div className="service-specs-section">
            <h3 className="service-section-heading">Key Specifications</h3>
            <div className="service-specs-grid">
              {service.keyPoints.map((pt, i) => (
                <div key={i} className="service-spec-item">
                  <CheckCircle2 size={15} className="text-teal flex-shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simple Quote Form */}
          <div className="service-quote-box">
            <h3 className="quote-box-title">
              <FileCheck size={18} className="text-red" /> Request a Free Quote
            </h3>

            {submitted ? (
              <div className="quote-success-box">
                <CheckCircle2 size={28} className="text-teal" />
                <h4>Thank You! We've Received Your Request</h4>
                <p>Our specialist will contact you with pricing details for <strong>{service.title}</strong>.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="quote-form">
                <div className="form-grid-2">
                  <div className="form-field">
                    <label>Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Full Name" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="clean-form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="Mobile or WhatsApp" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="clean-form-input"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label>City / Location</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Chennai, Sriperumbudur..." 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="clean-form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label>Required Size / Capacity (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 50,000 sq.ft or 2,000 pallets" 
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="clean-form-input"
                    />
                  </div>
                </div>

                <div className="quote-form-actions">
                  <a href="tel:+919884012341" className="quote-tel-link">
                    <Phone size={14} className="text-red" /> Call: +91 98840 12341
                  </a>
                  <button type="submit" className="btn btn-red btn-sm">
                    <Send size={15} /> Get Quote
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .service-modal {
          max-width: 640px;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .service-modal-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 24px;
          background: #003666;
          color: #ffffff;
        }

        .service-header-icon-box {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
        }

        .service-modal-title {
          font-size: 1.25rem;
          color: #ffffff;
          margin-top: 2px;
          margin-bottom: 2px;
          line-height: 1.2;
        }

        .service-modal-sub {
          font-size: 0.8rem;
          color: #cbd5e1;
          line-height: 1.35;
        }

        .service-modal-body {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .service-section-heading {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-heading);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 8px;
        }

        .service-specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        @media (max-width: 550px) {
          .service-specs-grid {
            grid-template-columns: 1fr;
          }
        }

        .service-spec-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-main);
          background: #f8fafc;
          border: 1px solid var(--border-color);
          padding: 7px 10px;
          border-radius: var(--radius-xs);
        }

        .service-quote-box {
          background: #f9fafb;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 16px;
        }

        .quote-box-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.95rem;
          color: #003666;
          margin-bottom: 12px;
          font-weight: 700;
        }

        .quote-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        @media (max-width: 550px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .form-field label {
          font-size: 0.725rem;
          font-weight: 600;
          color: var(--text-sub);
        }

        .clean-form-input {
          width: 100%;
          padding: 8px 10px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-color);
          background: #ffffff;
          font-size: 0.85rem;
          outline: none;
        }

        .clean-form-input:focus {
          border-color: #003666;
          box-shadow: 0 0 0 2px rgba(0, 54, 102, 0.1);
        }

        .quote-form-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 6px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .quote-tel-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-heading);
        }

        .quote-success-box {
          text-align: center;
          padding: 16px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: var(--radius-sm);
        }

        .quote-success-box h4 {
          color: #003666;
          margin: 6px 0 2px;
          font-size: 0.95rem;
        }

        .quote-success-box p {
          color: var(--text-muted);
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
