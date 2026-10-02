import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Send } from 'lucide-react';

export default function FloatingActionBar({ onOpenRequirement }) {
  const [isScrolling, setIsScrolling] = useState(false);

  // Auto hide bottom bar while user is actively scrolling
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className={`floating-action-container ${isScrolling ? 'is-scrolling-hide' : ''}`}>
      {/* WhatsApp Floating Button (Desktop Only) */}
      <a 
        href="https://wa.me/919884012341?text=Hello%20All%20India%20Warehouse,%20I%20am%20looking%20for%20a%20warehouse."
        target="_blank"
        rel="noopener noreferrer"
        className="floating-wa-btn"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Us"
      >
        <MessageSquare size={16} />
        <span className="floating-text">Chat on WhatsApp</span>
      </a>

      {/* Mobile Sticky 3-Item Bar (Clean, spacious, 100% responsive) */}
      <div className={`mobile-bottom-bar ${isScrolling ? 'bar-hidden' : ''}`}>
        <a href="tel:+919884012341" className="mobile-bar-btn call" aria-label="Call Helpline">
          <Phone size={14} className="bar-icon" />
          <span className="bar-text">Call Us</span>
        </a>

        <a 
          href="https://wa.me/919884012341?text=Hello%20All%20India%20Warehouse,%20I%20am%20looking%20for%20a%20warehouse." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mobile-bar-btn whatsapp"
          aria-label="WhatsApp Chat"
        >
          <MessageSquare size={14} className="bar-icon" />
          <span className="bar-text">WhatsApp</span>
        </a>

        <button 
          type="button" 
          onClick={() => onOpenRequirement && onOpenRequirement('need')} 
          className="mobile-bar-btn quote"
          aria-label="Get Free Quote"
        >
          <Send size={14} className="bar-icon" />
          <span className="bar-text">Get Quote</span>
        </button>
      </div>

      <style>{`
        .floating-action-container {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 999;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .floating-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25d366;
          color: #ffffff;
          padding: 10px 18px;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.88rem;
          box-shadow: 0 4px 18px rgba(37, 211, 102, 0.4);
          transition: var(--transition);
        }

        .floating-wa-btn:hover {
          background: #20ba5a;
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 22px rgba(37, 211, 102, 0.5);
        }

        .mobile-bottom-bar {
          display: none;
        }

        @media (max-width: 768px) {
          .floating-action-container {
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            padding: 0;
            pointer-events: none;
          }

          .floating-wa-btn {
            display: none;
          }

          .mobile-bottom-bar {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            width: 100%;
            max-width: 100vw;
            background: #ffffff;
            border-top: 1px solid var(--border-light);
            box-shadow: 0 -3px 14px rgba(15, 23, 42, 0.1);
            padding: 6px 10px;
            padding-bottom: max(6px, env(safe-area-inset-bottom));
            gap: 6px;
            z-index: 9998;
            pointer-events: auto;
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
            transform: translateY(0);
            opacity: 1;
            box-sizing: border-box;
          }

          /* HIDE WHILE SCROLLING */
          .mobile-bottom-bar.bar-hidden {
            transform: translateY(100%);
            opacity: 0;
            pointer-events: none;
          }

          .mobile-bar-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 9px 4px;
            border-radius: var(--radius-xs);
            font-size: 0.78rem;
            font-weight: 700;
            color: #ffffff;
            text-align: center;
            border: none;
            cursor: pointer;
            text-decoration: none;
            box-sizing: border-box;
            transition: transform 0.15s ease, opacity 0.15s ease;
          }

          .mobile-bar-btn:active {
            transform: scale(0.97);
            opacity: 0.9;
          }

          .bar-icon {
            flex-shrink: 0;
          }

          .bar-text {
            white-space: nowrap;
          }

          .mobile-bar-btn.call {
            background: var(--primary);
          }

          .mobile-bar-btn.whatsapp {
            background: #25d366;
          }

          .mobile-bar-btn.quote {
            background: var(--brand-red);
          }
        }
      `}</style>
    </div>
  );
}
