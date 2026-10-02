import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Layers, 
  ArrowUpRight, 
  Maximize2, 
  Zap, 
  Flame, 
  Truck, 
  Phone, 
  Mail, 
  Send,
  Building2,
  Calendar,
  Download,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { warehouseApi } from '../services/api';

export default function PropertyDetailModal({ property, onClose, onBookVisit }) {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [visitName, setVisitName] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!property) return null;

  const handleBookVisitSubmit = async (e) => {
    e.preventDefault();
    if (!visitName || !visitPhone) return;

    try {
      setSubmitting(true);
      await warehouseApi.submitInquiry({
        type: 'site_visit',
        propertyId: property.id,
        propertyTitle: property.title,
        name: visitName,
        phone: visitPhone,
        preferredDate: visitDate
      });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      setSubmitted(true);
      setTimeout(() => {
        if (onBookVisit) {
          onBookVisit({
            propertyId: property.id,
            propertyTitle: property.title,
            name: visitName,
            phone: visitPhone,
            date: visitDate
          });
        }
      }, 1200);
    } catch (err) {
      console.error('Error booking site visit:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content property-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Gallery Header */}
        <div className="modal-gallery-section">
          <div className="main-image-wrap">
            <img 
              src={property.images?.[selectedImgIdx] || property.image} 
              alt={property.title} 
              className="modal-main-img"
            />
            <div className="image-overlay-badges">
              <span className="badge badge-grade">{property.grade}</span>
              <span className="badge badge-verified">
                <ShieldCheck size={13} /> {property.readyStatus}
              </span>
            </div>
          </div>

          {property.images && property.images.length > 1 && (
            <div className="modal-thumbnails">
              {property.images.map((img, idx) => (
                <button 
                  key={idx} 
                  className={`thumbnail-btn ${selectedImgIdx === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImgIdx(idx)}
                >
                  <img src={img} alt={`View ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="modal-body-content">
          <div className="modal-header-info">
            <div className="property-ref-tag">
              <span>Property ID: {property.id}</span>
              <span className="divider">•</span>
              <span className="property-category-tag">{property.category} / {property.subCategory}</span>
            </div>

            <h2 className="modal-property-title">{property.title}</h2>
            
            <div className="modal-location">
              <MapPin size={18} className="loc-icon" />
              <span>{property.location}</span>
            </div>

            <div className="modal-pricing-bar">
              <div className="price-item">
                <span className="price-label">Quoted Rate</span>
                <span className="price-value">{property.ratePerSqFt}</span>
              </div>
              <div className="price-divider"></div>
              <div className="price-item">
                <span className="price-label">Total Estimated Value</span>
                <span className="price-value-total">{property.totalPrice}</span>
              </div>
              <div className="modal-actions-right">
                <button className="btn btn-outline btn-sm" onClick={handleShare}>
                  <Share2 size={15} /> {copiedLink ? 'Link Copied!' : 'Share'}
                </button>
              </div>
            </div>
          </div>

          {/* Key Technical Specs Grid */}
          <div className="specs-section">
            <h3 className="specs-heading">Key Technical Specifications</h3>
            <div className="specs-grid">
              <div className="spec-card">
                <span className="spec-label">Total Leasable Area</span>
                <strong className="spec-val">{property.areaSqFt.toLocaleString()} Sq.Ft ({property.areaSqM.toLocaleString()} m²)</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Clear Eaves Height</span>
                <strong className="spec-val">{property.clearHeight}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Floor Load Capacity</span>
                <strong className="spec-val">{property.floorLoad}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Dock Doors & Apron</span>
                <strong className="spec-val">{property.dockCount} Hydraulic Docks</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Sanctioned Power</span>
                <strong className="spec-val">{property.powerSanctioned}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Fire Fighting & Safety</span>
                <strong className="spec-val">{property.fireSafety}</strong>
              </div>
            </div>
          </div>

          {/* Property Features List */}
          <div className="features-section">
            <h3 className="specs-heading">Infrastructure & Highlights</h3>
            <div className="features-grid">
              {property.features.map((feat, idx) => (
                <div key={idx} className="feature-item">
                  <Check size={16} className="feature-check-icon" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suitable Industries */}
          <div className="suitable-box">
            <strong>Ideal Industry Vertical:</strong> {property.idealFor}
          </div>

          {/* Corporate Support & Site Visit Form */}
          <div className="modal-footer-cta-grid">
            {/* Corporate Desk Info */}
            <div className="modal-agent-card">
              <span className="agent-badge">Corporate Leasing Desk</span>
              <h4 className="agent-name">All India Warehouse</h4>
              <p className="agent-role">Direct Industrial Advisory & Site Coordination</p>
              <div className="agent-contacts">
                <a href="tel:+919884012341" className="agent-link-btn">
                  <Phone size={15} /> +91 98840 12341
                </a>
                <a 
                  href={`https://wa.me/919884012341?text=${encodeURIComponent(`Hello, I am interested in property "${property.title}" in ${property.location}. Please share complete details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="agent-link-btn wa-link"
                >
                  <Send size={15} /> Chat on WhatsApp
                </a>
                <a href="mailto:care@allindiawarehouse.in" className="agent-link-btn">
                  <Mail size={15} /> care@allindiawarehouse.in
                </a>
              </div>
            </div>

            {/* Visit Booking Form */}
            <div className="modal-booking-form-wrap">
              <h4 className="booking-title">Schedule Site Inspection / Get Tech Dossier</h4>
              {submitted ? (
                <div className="submitted-msg">
                  <Check size={28} className="text-success" />
                  <p><strong>Site Visit Request Registered!</strong></p>
                  <p>Our industrial support team will contact you shortly to confirm gate pass and technical drawings.</p>
                </div>
              ) : (
                <form onSubmit={handleBookVisitSubmit} className="booking-form">
                  <div className="form-row-2">
                    <input 
                      type="text" 
                      placeholder="Your Full Name *" 
                      required
                      value={visitName}
                      onChange={(e) => setVisitName(e.target.value)}
                      className="form-input"
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone / Mobile Number *" 
                      required
                      value={visitPhone}
                      onChange={(e) => setVisitPhone(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-row-2">
                    <input 
                      type="date" 
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="form-input"
                    />
                    <button type="submit" className="btn btn-primary btn-sm">
                      <Send size={15} /> Request Inspection Pass
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .property-modal {
          max-width: 880px;
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .modal-gallery-section {
          position: relative;
          background: #000000;
        }

        .main-image-wrap {
          position: relative;
          height: 340px;
          width: 100%;
          overflow: hidden;
        }

        .modal-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay-badges {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          gap: 8px;
        }

        .modal-thumbnails {
          display: flex;
          gap: 10px;
          padding: 12px 20px;
          background: #0a1128;
          overflow-x: auto;
        }

        .thumbnail-btn {
          width: 70px;
          height: 50px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          opacity: 0.6;
          border: 2px solid transparent;
          transition: var(--transition);
        }

        .thumbnail-btn.active, .thumbnail-btn:hover {
          opacity: 1;
          border-color: var(--secondary);
        }

        .thumbnail-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-body-content {
          padding: 30px;
        }

        .property-ref-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 8px;
        }

        .modal-property-title {
          font-size: 1.75rem;
          color: var(--primary);
          margin-bottom: 10px;
        }

        .modal-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 20px;
        }

        .loc-icon {
          color: var(--secondary);
        }

        .modal-pricing-bar {
          display: flex;
          align-items: center;
          gap: 24px;
          background: var(--light-bg);
          padding: 16px 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          margin-bottom: 26px;
        }

        .price-item {
          display: flex;
          flex-direction: column;
        }

        .price-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
        }

        .price-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--primary);
        }

        .price-value-total {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--secondary);
        }

        .price-divider {
          width: 1px;
          height: 35px;
          background: var(--border-color);
        }

        .modal-actions-right {
          margin-left: auto;
        }

        .specs-section, .features-section {
          margin-bottom: 24px;
        }

        .specs-heading {
          font-size: 1.15rem;
          color: var(--primary);
          margin-bottom: 14px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-color);
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        @media (max-width: 680px) {
          .specs-grid {
            grid-template-columns: 1fr;
          }
        }

        .spec-card {
          background: var(--light-bg);
          border: 1px solid var(--border-color);
          padding: 12px 14px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .spec-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .spec-val {
          font-size: 0.9rem;
          color: var(--primary);
          font-weight: 700;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        @media (max-width: 680px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-main);
        }

        .feature-check-icon {
          color: var(--success);
          flex-shrink: 0;
        }

        .suitable-box {
          background: rgba(0, 174, 255, 0.08);
          border-left: 4px solid var(--secondary);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          margin-bottom: 26px;
          color: var(--primary);
        }

        .modal-footer-cta-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
          .modal-footer-cta-grid {
            grid-template-columns: 1fr;
          }
          .main-image-wrap {
            height: 220px;
          }
          .modal-body-content {
            padding: 16px;
          }
          .modal-property-title {
            font-size: 1.25rem;
          }
          .modal-pricing-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 12px;
          }
          .price-divider {
            display: none;
          }
          .modal-actions-right {
            margin-left: 0;
            width: 100%;
          }
          .modal-actions-right button {
            width: 100%;
          }
          .specs-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
        }

        .modal-agent-card {
          background: var(--light-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 18px;
        }

        .agent-badge {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--secondary);
          text-transform: uppercase;
        }

        .agent-name {
          font-size: 1.1rem;
          color: var(--primary);
          margin: 4px 0;
        }

        .agent-role {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .agent-contacts {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .agent-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary);
        }

        .agent-link-btn:hover {
          color: var(--secondary);
        }

        .modal-booking-form-wrap {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 18px;
        }

        .booking-title {
          font-size: 0.95rem;
          color: var(--primary);
          margin-bottom: 12px;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .form-input {
          width: 100%;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 0.85rem;
          outline: none;
        }

        .form-input:focus {
          border-color: var(--secondary);
        }

        .submitted-msg {
          text-align: center;
          padding: 15px;
          background: var(--success-bg);
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
