import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  Warehouse, 
  PlusCircle, 
  MapPin, 
  MessageSquare, 
  Calculator, 
  Search 
} from 'lucide-react';

export default function Navbar({ 
  onOpenRequirement, 
  onNavigateSection 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="header-wrapper">
      {/* Top Simple Announcement / Helpline Strip */}
      <div className="top-strip">
        <div className="container top-strip-inner">
          <div className="strip-left">
            <span className="strip-badge desktop-only">Direct Network</span>
            <span className="strip-text">Zero Middleman • Grade-A Industrial Sheds & Land</span>
          </div>
          <div className="strip-right">
            <a href="tel:+919884012341" className="strip-link">
              <Phone size={12} className="text-red" />
              <span>Helpline: <strong>+91 98840 12341</strong></span>
            </a>
            <span className="strip-divider desktop-only">|</span>
            <a 
              href="https://wa.me/919884012341?text=Hello%20All%20India%20Warehouse,%20I%20am%20looking%20for%20a%20warehouse." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="strip-link desktop-only"
            >
              <MessageSquare size={12} className="text-emerald" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`main-navbar ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-content">
          {/* Brand Logo */}
          <div className="nav-logo" onClick={() => handleNavClick('hero')}>
            <div className="logo-icon-box">
              <Warehouse size={20} className="logo-icon" />
            </div>
            <div className="logo-text-group">
              <span className="brand-name">ALL INDIA <span className="text-red">WAREHOUSE</span></span>
              <span className="brand-tagline">Direct Industrial Real Estate</span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="nav-links">
            <button onClick={() => handleNavClick('properties')} className="nav-link">
              <Search size={15} /> Find Warehouses
            </button>
            <button onClick={() => handleNavClick('locations')} className="nav-link">
              <MapPin size={15} /> Locations & Hubs
            </button>
            <button onClick={() => handleNavClick('calculator')} className="nav-link">
              <Calculator size={15} /> Rent Estimator
            </button>
          </div>

          {/* Action CTAs */}
          <div className="nav-actions">
            <button 
              onClick={() => onOpenRequirement('post')} 
              className="btn btn-outline btn-sm desktop-only"
            >
              <PlusCircle size={15} className="text-red" /> Post Property
            </button>

            <button 
              onClick={() => onOpenRequirement('need')} 
              className="btn btn-red btn-sm desktop-only"
            >
              Get Free Quote
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="logo-icon-box">
                <Warehouse size={18} className="logo-icon" />
              </div>
              <span className="brand-name">ALL INDIA <span className="text-red">WAREHOUSE</span></span>
              <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-links">
              <button onClick={() => handleNavClick('properties')} className="mobile-link">
                <Search size={18} /> Find Warehouses
              </button>
              <button onClick={() => handleNavClick('locations')} className="mobile-link">
                <MapPin size={18} /> Locations & Hubs
              </button>
              <button onClick={() => handleNavClick('calculator')} className="mobile-link">
                <Calculator size={18} /> Rent Estimator
              </button>
            </div>

            <div className="mobile-drawer-actions">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenRequirement('post'); }} 
                className="btn btn-outline w-full"
              >
                <PlusCircle size={16} className="text-red" /> Post My Property
              </button>
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenRequirement('need'); }} 
                className="btn btn-red w-full"
              >
                Need Warehouse Space
              </button>
              <a href="tel:+919884012341" className="btn btn-navy w-full">
                <Phone size={16} /> Call +91 98840 12341
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .header-wrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #ffffff;
        }

        .top-strip {
          background: #0f172a;
          color: #94a3b8;
          font-size: 0.76rem;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .top-strip-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .strip-left {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .strip-badge {
          background: rgba(225, 29, 72, 0.2);
          color: #fda4af;
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 700;
        }

        .strip-text {
          color: #cbd5e1;
          font-size: 0.74rem;
        }

        .strip-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .strip-link {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #f1f5f9;
          font-weight: 600;
          font-size: 0.75rem;
          white-space: nowrap;
        }

        .strip-divider {
          color: #475569;
        }

        .main-navbar {
          background: #ffffff;
          border-bottom: 1px solid var(--border-light);
          transition: var(--transition);
        }

        .main-navbar.is-scrolled {
          box-shadow: var(--shadow-sm);
        }

        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          min-width: 0;
        }

        .logo-icon-box {
          width: 36px;
          height: 36px;
          background: var(--primary);
          color: #ffffff;
          border-radius: var(--radius-xs);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .logo-text-group {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          color: var(--primary);
          line-height: 1.1;
          white-space: nowrap;
        }

        .brand-tagline {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          color: var(--text-sub);
          font-weight: 600;
          font-size: 0.9rem;
          border-radius: var(--radius-xs);
          transition: var(--transition);
        }

        .nav-link:hover {
          color: var(--primary);
          background: var(--bg-subtle);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hamburger-btn {
          display: none;
          color: var(--text-heading);
          padding: 8px;
          border-radius: var(--radius-xs);
          background: var(--bg-subtle);
        }

        .desktop-only {
          display: inline-flex;
        }

        .w-full {
          width: 100%;
        }

        /* Mobile Full-Screen Single View Menu */
        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          background: #ffffff;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          animation: fadeIn 0.2s ease-out;
        }

        .mobile-drawer {
          width: 100%;
          max-width: 100%;
          height: 100%;
          background: #ffffff;
          padding: 16px 20px 24px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          box-shadow: none;
          animation: slideDown 0.25s ease-out;
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-light);
        }

        .mobile-close-btn {
          margin-left: auto;
          color: var(--text-heading);
          padding: 8px;
          border-radius: 50%;
          background: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .mobile-close-btn:hover {
          background: var(--brand-red);
          color: #ffffff;
        }

        .mobile-drawer-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 24px 0;
          flex: 1;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-heading);
          border-radius: var(--radius-sm);
          background: var(--bg-page);
          border: 1px solid var(--border-light);
          text-align: left;
          transition: var(--transition);
        }

        .mobile-link:hover, .mobile-link:active {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
        }

        .mobile-drawer-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 18px;
          border-top: 1px solid var(--border-light);
        }

        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-12px); 
          }
          to { 
            opacity: 1;
            transform: translateY(0); 
          }
        }

        /* Responsive Breakpoints */
        @media (max-width: 860px) {
          .nav-links, .desktop-only {
            display: none !important;
          }
          .hamburger-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .nav-content {
            height: 56px;
          }
          .brand-tagline {
            display: none;
          }
          .brand-name {
            font-size: 0.98rem;
          }
          .top-strip-inner {
            justify-content: center;
          }
          .strip-left {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
