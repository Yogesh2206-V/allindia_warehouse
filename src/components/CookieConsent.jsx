import React, { useState, useEffect } from 'react';
import { Cookie, X, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('aiw_cookie_consent');
    if (!consent) {
      // Show banner after brief delay for smooth entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('aiw_cookie_consent', JSON.stringify({
      analytics: true,
      preferences: true,
      essential: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('aiw_cookie_consent', JSON.stringify({
      analytics: false,
      preferences: true,
      essential: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay" role="dialog" aria-live="polite">
      <div className="cookie-consent-card">
        <div className="cookie-header">
          <div className="cookie-icon-box">
            <Cookie size={20} className="cookie-icon" />
          </div>
          <div className="cookie-title-wrap">
            <h4 className="cookie-title">We Value Your Privacy & Experience</h4>
            <span className="cookie-subtitle">Cookie & Analytics Consent</span>
          </div>
          <button 
            type="button" 
            onClick={handleAcceptEssential} 
            className="cookie-close-btn"
            aria-label="Dismiss cookie notice"
          >
            <X size={16} />
          </button>
        </div>

        <p className="cookie-desc">
          We use cookies to save your warehouse search filters, calculate instant rental estimates, and enhance your property inspection booking experience.
        </p>

        {showDetails && (
          <div className="cookie-details-box">
            <div className="cookie-detail-item">
              <ShieldCheck size={16} className="text-emerald" />
              <div>
                <strong>Essential Cookies:</strong> Required for search filters, site visit booking, and secure quote submissions.
              </div>
            </div>
            <div className="cookie-detail-item">
              <CheckCircle2 size={16} className="text-blue" />
              <div>
                <strong>Analytics & Performance:</strong> Helps us improve industrial corridor listings and estimate accuracy.
              </div>
            </div>
          </div>
        )}

        <div className="cookie-actions-row">
          <button 
            type="button" 
            onClick={() => setShowDetails(!showDetails)}
            className="cookie-link-btn"
          >
            {showDetails ? 'Hide Details' : 'Preferences'}
          </button>

          <div className="cookie-btns-group">
            <button 
              type="button" 
              onClick={handleAcceptEssential} 
              className="cookie-btn cookie-btn-outline"
            >
              Essential Only
            </button>
            <button 
              type="button" 
              onClick={handleAcceptAll} 
              className="cookie-btn cookie-btn-primary"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .cookie-consent-overlay {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 99999;
          max-width: 440px;
          width: calc(100% - 48px);
          animation: cookieSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cookie-consent-card {
          background: #ffffff;
          border-radius: var(--radius-md);
          box-shadow: 0 16px 36px -6px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(15, 23, 42, 0.08);
          padding: 20px;
          border: 1px solid var(--border-light);
        }

        .cookie-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
          position: relative;
        }

        .cookie-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff1f2;
          color: var(--brand-red);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cookie-title-wrap {
          flex: 1;
        }

        .cookie-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-heading);
          margin: 0;
          line-height: 1.2;
        }

        .cookie-subtitle {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .cookie-close-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f1f5f9;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          border: none;
        }

        .cookie-close-btn:hover {
          background: var(--brand-red);
          color: #ffffff;
        }

        .cookie-desc {
          font-size: 0.84rem;
          color: var(--text-sub);
          line-height: 1.45;
          margin: 0 0 14px 0;
        }

        .cookie-details-box {
          background: #f8fafc;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-xs);
          padding: 10px 12px;
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.78rem;
          color: var(--text-sub);
          line-height: 1.35;
        }

        .cookie-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .cookie-detail-item strong {
          color: var(--text-heading);
        }

        .text-blue {
          color: #2563eb;
        }

        .cookie-actions-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .cookie-link-btn {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-decoration: underline;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px 0;
        }

        .cookie-link-btn:hover {
          color: var(--primary);
        }

        .cookie-btns-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cookie-btn {
          padding: 8px 14px;
          border-radius: var(--radius-xs);
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
          border: 1px solid transparent;
        }

        .cookie-btn-outline {
          background: #ffffff;
          border-color: var(--border-light);
          color: var(--text-main);
        }

        .cookie-btn-outline:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: #f8fafc;
        }

        .cookie-btn-primary {
          background: var(--brand-red);
          color: #ffffff;
        }

        .cookie-btn-primary:hover {
          background: var(--brand-red-hover);
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.35);
        }

        @keyframes cookieSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Mobile View: Sits comfortably above bottom bar */
        @media (max-width: 768px) {
          .cookie-consent-overlay {
            bottom: 74px;
            left: 10px;
            right: 10px;
            width: calc(100% - 20px);
            max-width: 100%;
          }

          .cookie-consent-card {
            padding: 14px;
          }

          .cookie-desc {
            font-size: 0.78rem;
            margin-bottom: 10px;
          }

          .cookie-actions-row {
            justify-content: flex-end;
          }

          .cookie-btns-group {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
          }

          .cookie-btn {
            padding: 8px 6px;
            text-align: center;
            font-size: 0.78rem;
          }
        }
      `}</style>
    </div>
  );
}
