import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Check, Settings, ChevronRight } from 'lucide-react';

export default function CookieConsentBanner({ onOpenPreferences, isPreferencesOpen, onClosePreferences }) {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Cookie settings state
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true, // always true & locked
    analytics: true,
    preferences: true,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('aiw_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isPreferencesOpen) {
      setShowModal(true);
    }
  }, [isPreferencesOpen]);

  const handleAcceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('aiw_cookie_consent', JSON.stringify(fullConsent));
    setShowBanner(false);
    setShowModal(false);
    if (onClosePreferences) onClosePreferences();
  };

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      preferences: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('aiw_cookie_consent', JSON.stringify(essentialOnly));
    setShowBanner(false);
    setShowModal(false);
    if (onClosePreferences) onClosePreferences();
  };

  const handleSaveCustom = () => {
    const customConsent = {
      ...cookieSettings,
      necessary: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('aiw_cookie_consent', JSON.stringify(customConsent));
    setShowBanner(false);
    setShowModal(false);
    if (onClosePreferences) onClosePreferences();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (onClosePreferences) onClosePreferences();
  };

  return (
    <>
      {/* Floating Bottom Cookie Consent Banner */}
      {showBanner && !showModal && (
        <div className="cookie-banner-wrap">
          <div className="container">
            <div className="cookie-banner-inner">
              <div className="cookie-banner-content">
                <div className="cookie-icon-wrap">
                  <Cookie size={24} className="text-red" />
                </div>
                <div className="cookie-text-col">
                  <h4 className="cookie-title">We Value Your Privacy & Industrial Search Experience</h4>
                  <p className="cookie-desc">
                    All India Warehouse uses cookies to enhance property search performance, remember your corridor filters, analyze traffic, and ensure seamless direct leasing inquiries. Read our{' '}
                    <span className="cookie-link">Privacy & Cookie Policy</span>.
                  </p>
                </div>
              </div>

              <div className="cookie-banner-actions">
                <button 
                  onClick={() => setShowModal(true)} 
                  className="btn btn-outline btn-sm cookie-btn-pref"
                >
                  <Settings size={14} /> Customize
                </button>
                <button 
                  onClick={handleRejectNonEssential} 
                  className="btn btn-outline btn-sm cookie-btn-reject"
                >
                  Reject Non-Essential
                </button>
                <button 
                  onClick={handleAcceptAll} 
                  className="btn btn-red btn-sm cookie-btn-accept"
                >
                  Accept All Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Cookie Preferences Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content cookie-pref-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close preferences">
              <X size={18} />
            </button>

            <div className="cookie-modal-header">
              <div className="cookie-modal-icon-badge">
                <ShieldCheck size={26} className="text-teal" />
              </div>
              <div>
                <h3 className="cookie-modal-title">Cookie & Privacy Preferences</h3>
                <p className="cookie-modal-sub">Manage which cookies you allow on All India Warehouse portal.</p>
              </div>
            </div>

            <div className="cookie-modal-body">
              {/* Category 1: Strictly Necessary */}
              <div className="cookie-category-item">
                <div className="cookie-cat-top">
                  <div>
                    <h4 className="cookie-cat-name">Strictly Necessary Cookies</h4>
                    <span className="cookie-status-locked">Always Active</span>
                  </div>
                  <input type="checkbox" checked={true} disabled className="cookie-switch locked" />
                </div>
                <p className="cookie-cat-desc">
                  Essential for basic navigation, security, session continuity, and accessing verified warehouse inquiry forms. These cannot be disabled.
                </p>
              </div>

              {/* Category 2: Performance & Analytics */}
              <div className="cookie-category-item">
                <div className="cookie-cat-top">
                  <div>
                    <h4 className="cookie-cat-name">Performance & Analytics Cookies</h4>
                    <span className="cookie-status-opt">Optional</span>
                  </div>
                  <label className="switch-toggle">
                    <input 
                      type="checkbox" 
                      checked={cookieSettings.analytics} 
                      onChange={(e) => setCookieSettings({ ...cookieSettings, analytics: e.target.checked })} 
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <p className="cookie-cat-desc">
                  Helps us understand how industrial tenants browse warehouse corridors, average page loading speeds, and search query trends.
                </p>
              </div>

              {/* Category 3: User Preferences */}
              <div className="cookie-category-item">
                <div className="cookie-cat-top">
                  <div>
                    <h4 className="cookie-cat-name">Functional & Preference Cookies</h4>
                    <span className="cookie-status-opt">Optional</span>
                  </div>
                  <label className="switch-toggle">
                    <input 
                      type="checkbox" 
                      checked={cookieSettings.preferences} 
                      onChange={(e) => setCookieSettings({ ...cookieSettings, preferences: e.target.checked })} 
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <p className="cookie-cat-desc">
                  Remembers your selected city (e.g. Chennai vs Bangalore), unit preference (Sq.Ft vs Sq.M), and shortlisted properties.
                </p>
              </div>

              {/* Category 4: Targeted Industrial Communication */}
              <div className="cookie-category-item">
                <div className="cookie-cat-top">
                  <div>
                    <h4 className="cookie-cat-name">Industrial Sourcing & Alerts</h4>
                    <span className="cookie-status-opt">Optional</span>
                  </div>
                  <label className="switch-toggle">
                    <input 
                      type="checkbox" 
                      checked={cookieSettings.marketing} 
                      onChange={(e) => setCookieSettings({ ...cookieSettings, marketing: e.target.checked })} 
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <p className="cookie-cat-desc">
                  Enables tailored notifications when newly vacant Grade-A warehouses or Built-to-Suit land parcels match your specifications.
                </p>
              </div>
            </div>

            <div className="cookie-modal-footer">
              <button onClick={handleRejectNonEssential} className="btn btn-outline btn-sm">
                Reject All
              </button>
              <div className="cookie-footer-right">
                <button onClick={handleSaveCustom} className="btn btn-outline btn-sm">
                  Save Custom Preferences
                </button>
                <button onClick={handleAcceptAll} className="btn btn-red btn-sm">
                  Accept All Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Floating Cookie Banner */
        .cookie-banner-wrap {
          position: fixed;
          bottom: 24px;
          left: 0;
          right: 0;
          z-index: 9998;
          animation: slideUpBanner 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 0 16px;
        }

        @keyframes slideUpBanner {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cookie-banner-inner {
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: var(--radius-lg);
          padding: 18px 24px;
          box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.2), 0 10px 15px -5px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        @media (max-width: 900px) {
          .cookie-banner-inner {
            flex-direction: column;
            align-items: stretch;
            padding: 18px;
            gap: 16px;
          }
          .cookie-banner-wrap {
            bottom: 12px;
          }
        }

        .cookie-banner-content {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          flex: 1;
        }

        .cookie-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #fef2f2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cookie-text-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cookie-title {
          font-size: 0.95rem;
          color: var(--text-heading);
          font-weight: 700;
        }

        .cookie-desc {
          font-size: 0.825rem;
          color: var(--text-sub);
          line-height: 1.5;
        }

        .cookie-link {
          color: var(--brand-red);
          font-weight: 600;
          text-decoration: underline;
          cursor: pointer;
        }

        .cookie-banner-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .cookie-btn-accept {
          font-weight: 700;
        }

        /* Modal Styles */
        .cookie-pref-modal {
          max-width: 680px;
        }

        .cookie-modal-header {
          padding: 24px;
          background: #f9fafb;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .cookie-modal-icon-badge {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: #e6f7f4;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cookie-modal-title {
          font-size: 1.25rem;
          color: var(--text-heading);
        }

        .cookie-modal-sub {
          font-size: 0.825rem;
          color: var(--text-muted);
        }

        .cookie-modal-body {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-height: 55vh;
          overflow-y: auto;
        }

        .cookie-category-item {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
        }

        .cookie-cat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .cookie-cat-name {
          font-size: 0.9rem;
          color: var(--text-heading);
          display: inline-block;
          margin-right: 8px;
        }

        .cookie-status-locked {
          font-size: 0.7rem;
          background: #ecfdf5;
          color: #059669;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-xs);
          text-transform: uppercase;
        }

        .cookie-status-opt {
          font-size: 0.7rem;
          background: #f3f4f6;
          color: #6b7280;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: var(--radius-xs);
        }

        .cookie-cat-desc {
          font-size: 0.8rem;
          color: var(--text-sub);
          line-height: 1.45;
        }

        /* Toggle switch */
        .switch-toggle {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 22px;
          flex-shrink: 0;
        }

        .switch-toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #cbd5e1;
          transition: 0.2s;
          border-radius: 22px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.2s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: var(--brand-red);
        }

        input:checked + .slider:before {
          transform: translateX(18px);
        }

        .cookie-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-top: 1px solid var(--border-color);
          background: #f9fafb;
          flex-wrap: wrap;
          gap: 10px;
        }

        .cookie-footer-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }
      `}</style>
    </>
  );
}
