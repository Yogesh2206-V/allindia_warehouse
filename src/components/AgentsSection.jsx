import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MessageSquare, 
  Calendar, 
  CheckCircle2,
  Send,
  X
} from 'lucide-react';
import { VERIFIED_AGENTS } from '../data/warehouseData';
import confetti from 'canvas-confetti';

export default function AgentsSection() {
  const [selectedAgentForConsult, setSelectedAgentForConsult] = useState(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [consultDate, setConsultDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    setTimeout(() => {
      setSelectedAgentForConsult(null);
      setSubmitted(false);
      setClientName('');
      setClientPhone('');
      setConsultDate('');
    }, 2000);
  };

  return (
    <section className="agents-section section-padding" id="agents">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Users size={14} /> Verified Advisory Network
          </span>
          <h2 className="section-title">Connect with Industrial Real Estate Specialists</h2>
          <p className="section-subtitle">
            Our experienced managers and technical consultants assist you with land feasibility, statutory approvals, site shortlisting, and lease structuring.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="agents-grid">
          {VERIFIED_AGENTS.map((agent) => (
            <div key={agent.id} className="agent-profile-card">
              {/* Card Top / Avatar */}
              <div className="agent-avatar-wrap">
                <img src={agent.avatar} alt={agent.name} className="agent-avatar-img" />
                <div className="agent-verified-badge">
                  <ShieldCheck size={14} /> Verified Expert
                </div>
              </div>

              {/* Agent Details */}
              <div className="agent-info-body">
                <h3 className="agent-full-name">{agent.name}</h3>
                <p className="agent-position">{agent.role}</p>
                <span className="agent-exp-tag">Experience: {agent.experience}</span>

                <p className="agent-bio-text">{agent.bio}</p>

                <div className="agent-specialty-box">
                  <strong>Key Corridors:</strong> {agent.specialization}
                </div>

                {/* Direct Action Buttons */}
                <div className="agent-card-actions">
                  <a 
                    href={`tel:${agent.phone}`} 
                    className="btn btn-outline btn-sm agent-action-btn"
                    title="Call Directly"
                  >
                    <Phone size={14} /> Call
                  </a>
                  <a 
                    href={`https://wa.me/919884012341?text=Hi%20${agent.name},%20I%20am%20looking%20for%20warehouse%20space.`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm agent-action-btn agent-wa-btn"
                    title="WhatsApp Message"
                  >
                    <MessageSquare size={14} /> WhatsApp
                  </a>
                  <button 
                    onClick={() => setSelectedAgentForConsult(agent)} 
                    className="btn btn-primary btn-sm agent-action-btn"
                  >
                    Consult
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Booking Modal */}
      {selectedAgentForConsult && (
        <div className="modal-backdrop" onClick={() => setSelectedAgentForConsult(null)}>
          <div className="modal-content consult-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedAgentForConsult(null)}>
              <X size={20} />
            </button>

            <div className="consult-modal-header">
              <h3 className="consult-title">Schedule Advisory Consultation with {selectedAgentForConsult.name}</h3>
              <p className="consult-sub">{selectedAgentForConsult.role} • {selectedAgentForConsult.specialization}</p>
            </div>

            <div className="consult-modal-body">
              {submitted ? (
                <div className="consult-success">
                  <CheckCircle2 size={36} className="text-success" />
                  <h4>Consultation Registered!</h4>
                  <p>{selectedAgentForConsult.name} will call you back on your provided number to review your requirements.</p>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="consult-form">
                  <div className="consult-field">
                    <label>Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Anand Kumar" 
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="consult-input"
                    />
                  </div>
                  <div className="consult-field">
                    <label>Phone / WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 98840 12341" 
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="consult-input"
                    />
                  </div>
                  <div className="consult-field">
                    <label>Preferred Date for Call / Site Visit</label>
                    <input 
                      type="date" 
                      value={consultDate}
                      onChange={(e) => setConsultDate(e.target.value)}
                      className="consult-input"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    <Send size={16} /> Confirm Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .agents-section {
          background-color: var(--light-bg);
        }

        .agents-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 1100px) {
          .agents-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .agents-grid {
            grid-template-columns: 1fr;
          }
        }

        .agent-profile-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }

        .agent-profile-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
          border-color: rgba(0, 174, 255, 0.4);
        }

        .agent-avatar-wrap {
          position: relative;
          height: 220px;
          background: #002b61;
        }

        .agent-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .agent-verified-badge {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(16, 185, 129, 0.95);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
          backdrop-filter: blur(4px);
        }

        .agent-info-body {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .agent-full-name {
          font-size: 1.2rem;
          color: var(--primary);
          margin-bottom: 2px;
        }

        .agent-position {
          font-size: 0.825rem;
          color: var(--secondary);
          font-weight: 700;
          margin-bottom: 6px;
        }

        .agent-exp-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .agent-bio-text {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .agent-specialty-box {
          background: var(--light-bg);
          border: 1px solid var(--border-color);
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          color: var(--primary);
          margin-bottom: 18px;
        }

        .agent-card-actions {
          display: flex;
          gap: 6px;
          margin-top: auto;
        }

        .agent-action-btn {
          flex: 1;
          padding: 8px 4px;
          font-size: 0.8rem;
        }

        .agent-wa-btn:hover {
          background: #25d366;
          color: #ffffff;
          border-color: #25d366;
        }

        /* Modal */
        .consult-modal {
          max-width: 500px;
        }

        .consult-modal-header {
          padding: 24px;
          background: var(--primary);
          color: #ffffff;
        }

        .consult-title {
          font-size: 1.2rem;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .consult-sub {
          font-size: 0.825rem;
          color: #cbd5e1;
        }

        .consult-modal-body {
          padding: 24px;
        }

        .consult-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .consult-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .consult-field label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--primary);
        }

        .consult-input {
          padding: 10px 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 0.9rem;
          outline: none;
        }

        .consult-input:focus {
          border-color: var(--secondary);
        }

        .consult-success {
          text-align: center;
          padding: 20px;
        }

        .consult-success h4 {
          margin: 10px 0 6px;
          color: var(--primary);
        }

        .consult-success p {
          color: var(--text-muted);
          font-size: 0.875rem;
        }
      `}</style>
    </section>
  );
}
