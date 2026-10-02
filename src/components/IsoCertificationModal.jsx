import React from 'react';
import { 
  X, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  FileCheck2, 
  Download,
  Flame,
  Scale
} from 'lucide-react';

export default function IsoCertificationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content iso-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="iso-header">
          <div className="iso-badge-icon-wrap">
            <Award size={36} className="iso-gold-icon" />
          </div>
          <div>
            <span className="iso-cert-tag">Quality Management System</span>
            <h2 className="iso-title">ISO 9001:2015 Certified Organization</h2>
            <p className="iso-sub">All India Warehouse & Mactech Engineers Pvt Ltd</p>
          </div>
        </div>

        {/* Body */}
        <div className="iso-body">
          <div className="iso-cert-card">
            <div className="cert-preview-box">
              <div className="cert-seal">
                <ShieldCheck size={48} className="seal-icon" />
                <span className="seal-text">ISO 9001:2015</span>
                <span className="seal-sub">REGISTERED FIRM</span>
              </div>
              <div className="cert-details">
                <span className="cert-scope-label">Certified Scope of Operations:</span>
                <p className="cert-scope-text">
                  "Provision of Turnkey Industrial Real Estate Aggregation, Pre-Engineered Building (PEB) Warehouse Construction, Heavy Storage Racking Integration, Material Handling Solutions, and Technical Industrial Infrastructure Services across India."
                </p>
                <div className="cert-meta-grid">
                  <div>
                    <strong>Standard:</strong> ISO 9001:2015
                  </div>
                  <div>
                    <strong>Audit Status:</strong> Fully Compliant
                  </div>
                  <div>
                    <strong>Safety Codes:</strong> NBC 2016 & FM Global
                  </div>
                  <div>
                    <strong>Audit Body:</strong> Accredited Quality Council
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="iso-pillars-title">Our 4 Core Compliance Guarantees</h3>
          <div className="iso-pillars-grid">
            <div className="pillar-item">
              <CheckCircle2 size={20} className="pillar-icon" />
              <div>
                <strong>Structural & Seismic Safety</strong>
                <p>All PEB sheds and racking systems are engineered for local seismic zone safety and wind velocity tolerances.</p>
              </div>
            </div>

            <div className="pillar-item">
              <Flame size={20} className="pillar-icon" />
              <div>
                <strong>Fire NOC & Life Safety</strong>
                <p>100% adherence to National Building Code (NBC), ESFR sprinkler networks, and local fire department NOC mandates.</p>
              </div>
            </div>

            <div className="pillar-item">
              <Scale size={20} className="pillar-icon" />
              <div>
                <strong>Clear Legal Due-Diligence</strong>
                <p>Every listed warehouse and land parcel undergoes 30-year title verification, SIPCOT/MIDC approvals, and zoning clearances.</p>
              </div>
            </div>

            <div className="pillar-item">
              <FileCheck2 size={20} className="pillar-icon" />
              <div>
                <strong>Transparent Commercial Contracts</strong>
                <p>Fair, standardized industrial lease agreements with zero hidden maintenance charges or escalation surprises.</p>
              </div>
            </div>
          </div>

          <div className="iso-footer">
            <button className="btn btn-navy" onClick={onClose}>
              Close Preview
            </button>
            <a href="tel:+919884012341" className="btn btn-primary">
              Contact Compliance Officer
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .iso-modal {
          max-width: 780px;
        }

        .iso-header {
          background: linear-gradient(135deg, #001a3d 0%, #002b61 100%);
          color: #ffffff;
          padding: 28px;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .iso-badge-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.15);
          border: 2px solid rgba(245, 158, 11, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .iso-gold-icon {
          color: var(--accent);
        }

        .iso-cert-tag {
          font-size: 0.75rem;
          color: var(--secondary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .iso-title {
          font-size: 1.5rem;
          color: #ffffff;
          margin: 2px 0;
        }

        .iso-sub {
          font-size: 0.85rem;
          color: #cbd5e1;
        }

        .iso-body {
          padding: 28px;
        }

        .iso-cert-card {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: var(--radius-lg);
          padding: 20px;
          margin-bottom: 24px;
        }

        .cert-preview-box {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        @media (max-width: 650px) {
          .cert-preview-box {
            flex-direction: column;
            text-align: center;
          }
        }

        .cert-seal {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: linear-gradient(135deg, #002b61 0%, #053b7c 100%);
          color: #ffffff;
          border: 4px double var(--accent);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(0, 43, 97, 0.2);
        }

        .seal-icon {
          color: var(--secondary);
          margin-bottom: 2px;
        }

        .seal-text {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        .seal-sub {
          font-size: 0.55rem;
          color: #cbd5e1;
        }

        .cert-scope-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
        }

        .cert-scope-text {
          font-size: 0.85rem;
          color: var(--text-main);
          font-style: italic;
          margin: 4px 0 12px;
          line-height: 1.5;
        }

        .cert-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .iso-pillars-title {
          font-size: 1.15rem;
          color: var(--primary);
          margin-bottom: 16px;
        }

        .iso-pillars-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 26px;
        }

        @media (max-width: 650px) {
          .iso-pillars-grid {
            grid-template-columns: 1fr;
          }
        }

        .pillar-item {
          display: flex;
          gap: 12px;
          background: var(--light-bg);
          border: 1px solid var(--border-color);
          padding: 14px;
          border-radius: var(--radius-md);
        }

        .pillar-icon {
          color: var(--secondary);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .pillar-item strong {
          display: block;
          font-size: 0.9rem;
          color: var(--primary);
          margin-bottom: 3px;
        }

        .pillar-item p {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .iso-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid var(--border-color);
        }
      `}</style>
    </div>
  );
}
