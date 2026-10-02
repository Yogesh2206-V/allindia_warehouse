import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  Warehouse, 
  PlusCircle, 
  MapPin, 
  MessageSquare, 
  Calculator, 
  Search,
  CreditCard,
  User,
  ChevronDown,
  ChevronUp,
  FileText,
  Brush,
  Truck,
  Gift,
  Receipt,
  Users,
  Briefcase,
  Building2,
  HelpCircle,
  Mail,
  ExternalLink,
  Sparkles,
  LogOut,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { 
  PlansModal, 
  RentReceiptModal, 
  ReferEarnModal, 
  RentalAgreementModal, 
  GeneralServiceModal, 
  PayRentModal, 
  CareersModal, 
  BlogModal, 
  SupportModal 
} from './SideMenuModals';

export default function Navbar({ 
  onOpenRequirement, 
  onNavigateSection,
  onOpenAuth,
  currentUser,
  onLogout
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commercialExpanded, setCommercialExpanded] = useState(false);
  const [contactExpanded, setContactExpanded] = useState(true);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Sub-modal states
  const [activeSubModal, setActiveSubModal] = useState(null); 
  // 'plans-tenant' | 'plans-owner' | 'plans-buyer' | 'plans-seller' | 'plans-commercial' | 'receipt' | 'refer' | 'agreement' | 'cleaning' | 'packers' | 'payrent' | 'careers' | 'blog' | 'support'

  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background body scrolling when right side menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenModal = (modalType) => {
    setMenuOpen(false);
    setActiveSubModal(modalType);
  };

  const handlePostProperty = () => {
    setMenuOpen(false);
    if (onOpenRequirement) {
      onOpenRequirement('post');
    }
  };

  const handleCorporateEnquiry = () => {
    setMenuOpen(false);
    if (onOpenRequirement) {
      onOpenRequirement('need', {
        title: 'Corporate / Enterprise Warehousing Sourcing',
        category: 'Grade-A Warehouse',
        notes: 'Corporate Enterprise Bulk Space Requirement'
      });
    }
  };

  return (
    <>
      <header className="header-wrapper">
        {/* Top Announcement & Helpline Strip */}
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

            {/* Desktop Center Links */}
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

            {/* Action Bar matching screenshot: Pay Rent / For Owners / Sign up / Log in / Menu */}
            <div className="nav-actions">
              {/* Pay Rent Online button */}
              <button 
                onClick={() => handleOpenModal('payrent')}
                className="nav-action-btn pay-btn desktop-only"
                title="Pay Warehouse Rent Online"
              >
                <CreditCard size={15} className="pay-icon" />
                <span>Pay Rent Online</span>
              </button>

              {/* For Property Owners (Teal button) */}
              <button 
                onClick={handlePostProperty}
                className="for-owners-btn desktop-only"
              >
                For Property Owners
              </button>

              {/* Auth Buttons or User Profile */}
              {currentUser ? (
                <div className="user-profile-menu-wrap desktop-only">
                  <button 
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="user-profile-btn"
                  >
                    <div className="user-avatar">
                      {currentUser.avatarInitial || currentUser.name?.charAt(0) || 'U'}
                    </div>
                    <span className="user-name-text">
                      {currentUser.name ? currentUser.name.split(' ')[0] : 'Member'}
                    </span>
                    <ChevronDown size={14} />
                  </button>

                  {userDropdownOpen && (
                    <div className="user-dropdown-popover">
                      <div className="user-dropdown-head">
                        <strong>{currentUser.name || 'Member User'}</strong>
                        <small>{currentUser.email || currentUser.phone}</small>
                      </div>
                      <div className="user-dropdown-divider" />
                      <button onClick={() => { setUserDropdownOpen(false); handleOpenModal('plans-tenant'); }} className="user-dropdown-item">
                        <Sparkles size={14} /> My VIP Membership
                      </button>
                      <button onClick={() => { setUserDropdownOpen(false); handlePostProperty(); }} className="user-dropdown-item">
                        <PlusCircle size={14} /> Post New Property
                      </button>
                      <div className="user-dropdown-divider" />
                      <button 
                        onClick={() => { setUserDropdownOpen(false); onLogout && onLogout(); }} 
                        className="user-dropdown-item logout-item"
                      >
                        <LogOut size={14} /> Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-links-group desktop-only">
                  <button 
                    onClick={() => onOpenAuth && onOpenAuth('register')} 
                    className="nav-auth-link"
                  >
                    Sign up
                  </button>
                  <span className="auth-divider">|</span>
                  <button 
                    onClick={() => onOpenAuth && onOpenAuth('login')} 
                    className="nav-auth-link"
                  >
                    Log in
                  </button>
                </div>
              )}

              {/* ☰ Menu Button (Visible in Website View & Mobile) */}
              <button 
                className={`menu-hamburger-btn ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle All India Warehouse Menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
                <span className="menu-btn-text">Menu</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Right Flyout / Dropdown Menu Drawer (Visible in Website View and Mobile) */}
        {menuOpen && (
          <div className="side-menu-overlay" onClick={() => setMenuOpen(false)}>
            <aside 
              ref={menuRef} 
              className="side-menu-panel" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Panel Header */}
              <div className="side-menu-header">
                <div className="side-menu-brand">
                  <div className="logo-icon-box-sm">
                    <Warehouse size={16} />
                  </div>
                  <div>
                    <h3 className="side-menu-title">ALL INDIA WAREHOUSE</h3>
                    <p className="side-menu-subtitle">Zero Brokerage Industrial Hub</p>
                  </div>
                </div>
                <button 
                  className="side-menu-close-btn" 
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* User quick status strip */}
              {currentUser ? (
                <div className="side-menu-user-strip">
                  <div className="user-avatar-sm">
                    {currentUser.avatarInitial || currentUser.name?.charAt(0) || 'U'}
                  </div>
                  <div className="user-strip-info">
                    <strong>{currentUser.name || 'Member User'}</strong>
                    <span>Verified Industrial Account</span>
                  </div>
                  <button onClick={onLogout} className="user-strip-logout" title="Log Out">
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <div className="side-menu-auth-strip">
                  <button 
                    onClick={() => { setMenuOpen(false); onOpenAuth && onOpenAuth('login'); }}
                    className="btn btn-outline btn-sm flex-1"
                  >
                    Log in
                  </button>
                  <button 
                    onClick={() => { setMenuOpen(false); onOpenAuth && onOpenAuth('register'); }}
                    className="btn btn-red btn-sm flex-1"
                  >
                    Sign up
                  </button>
                </div>
              )}

              {/* Menu List: 5 Main Topics Only */}
              <div className="side-menu-list">
                {/* 1. Post Your Property */}
                <button 
                  onClick={handlePostProperty} 
                  className="side-menu-item side-menu-item-highlight"
                >
                  <span className="item-text">1. Post Your Property</span>
                  <span className="item-badge-free">FREE</span>
                </button>

                {/* 2. Find Warehouses & Hubs */}
                <button 
                  onClick={() => { setMenuOpen(false); handleNavClick('properties'); }} 
                  className="side-menu-item"
                >
                  <span className="item-text">2. Find Warehouses & Locations</span>
                  <ChevronRight size={15} className="chevron-icon" />
                </button>

                {/* 3. Membership & Pricing Plans */}
                <button 
                  onClick={() => handleOpenModal('plans-tenant')} 
                  className="side-menu-item text-highlight-item"
                >
                  <span className="item-text">3. Membership & Plans</span>
                  <ChevronRight size={15} className="chevron-icon" />
                </button>

                {/* 4. Rental Agreement & Services */}
                <div className="side-menu-accordion-wrap">
                  <button 
                    onClick={() => setCommercialExpanded(!commercialExpanded)} 
                    className="side-menu-item accordion-header"
                  >
                    <span className="item-text">4. Rental Agreement & Services</span>
                    {commercialExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {commercialExpanded && (
                    <div className="side-menu-sublist">
                      <button 
                        onClick={() => handleOpenModal('agreement')} 
                        className="side-menu-subitem"
                      >
                        • E-Stamp Lease Agreement
                      </button>
                      <button 
                        onClick={() => handleOpenModal('receipt')} 
                        className="side-menu-subitem"
                      >
                        • Free Rent Receipt Generator
                      </button>
                      <button 
                        onClick={() => handleOpenModal('cleaning')} 
                        className="side-menu-subitem"
                      >
                        • Painting & Deep Cleaning
                      </button>
                      <button 
                        onClick={() => handleOpenModal('packers')} 
                        className="side-menu-subitem"
                      >
                        • Packers & Movers Logistics
                      </button>
                    </div>
                  )}
                </div>

                {/* 5. Contact Us & Support */}
                <div className="side-menu-accordion-wrap">
                  <button 
                    onClick={() => setContactExpanded(!contactExpanded)} 
                    className="side-menu-item accordion-header contact-header"
                  >
                    <span className="item-text">5. Contact Us & 24x7 Support</span>
                    {contactExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {contactExpanded && (
                    <div className="side-menu-contact-box">
                      <div className="contact-row">
                        <span className="contact-label">Email:</span>
                        <a href="mailto:assist@allindiawarehouse.in" className="contact-val email-val">
                          assist@allindiawarehouse.in
                        </a>
                      </div>
                      <div className="contact-row">
                        <span className="contact-label">Helpline:</span>
                        <a href="tel:+919884012341" className="contact-val phone-val">
                          +91 98840 12341
                        </a>
                      </div>
                      <div className="contact-row">
                        <span className="contact-label">WhatsApp:</span>
                        <a 
                          href="https://wa.me/919884012341?text=Hello%20All%20India%20Warehouse%20Support" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="contact-val text-emerald"
                        >
                          +91 98840 12341 (Chat Now)
                        </a>
                      </div>
                      <div className="contact-row">
                        <span className="contact-label">Hours:</span>
                        <span className="contact-text">Mon - Sun: 9:00 AM - 9:00 PM</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Action Footer inside Drawer */}
              <div className="side-menu-footer">
                <button 
                  onClick={() => { setMenuOpen(false); onOpenRequirement && onOpenRequirement('need'); }} 
                  className="btn btn-red w-full btn-sm"
                >
                  Need Warehouse Space?
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Global Component Modals triggered from Menu items */}
        {activeSubModal === 'plans-tenant' && (
          <PlansModal 
            isOpen={true} 
            planType="tenant" 
            onClose={() => setActiveSubModal(null)} 
            onOpenRequirement={onOpenRequirement} 
          />
        )}
        {activeSubModal === 'plans-owner' && (
          <PlansModal 
            isOpen={true} 
            planType="owner" 
            onClose={() => setActiveSubModal(null)} 
            onOpenRequirement={onOpenRequirement} 
          />
        )}
        {activeSubModal === 'plans-buyer' && (
          <PlansModal 
            isOpen={true} 
            planType="buyer" 
            onClose={() => setActiveSubModal(null)} 
            onOpenRequirement={onOpenRequirement} 
          />
        )}
        {activeSubModal === 'plans-seller' && (
          <PlansModal 
            isOpen={true} 
            planType="seller" 
            onClose={() => setActiveSubModal(null)} 
            onOpenRequirement={onOpenRequirement} 
          />
        )}
        {activeSubModal === 'plans-commercial' && (
          <PlansModal 
            isOpen={true} 
            planType="commercial" 
            onClose={() => setActiveSubModal(null)} 
            onOpenRequirement={onOpenRequirement} 
          />
        )}
        {activeSubModal === 'receipt' && (
          <RentReceiptModal 
            isOpen={true} 
            onClose={() => setActiveSubModal(null)} 
          />
        )}
        {activeSubModal === 'refer' && (
          <ReferEarnModal 
            isOpen={true} 
            onClose={() => setActiveSubModal(null)} 
          />
        )}
        {activeSubModal === 'agreement' && (
          <RentalAgreementModal 
            isOpen={true} 
            onClose={() => setActiveSubModal(null)} 
          />
        )}
        {activeSubModal === 'cleaning' && (
          <GeneralServiceModal 
            isOpen={true} 
            serviceType="cleaning" 
            onClose={() => setActiveSubModal(null)} 
          />
        )}
        {activeSubModal === 'packers' && (
          <GeneralServiceModal 
            isOpen={true} 
            serviceType="packers" 
            onClose={() => setActiveSubModal(null)} 
          />
        )}
        {activeSubModal === 'payrent' && (
          <PayRentModal 
            isOpen={true} 
            onClose={() => setActiveSubModal(null)} 
          />
        )}
        {activeSubModal === 'careers' && (
          <CareersModal 
            isOpen={true} 
            onClose={() => setActiveSubModal(null)} 
          />
        )}
        {activeSubModal === 'blog' && (
          <BlogModal 
            isOpen={true} 
            onClose={() => setActiveSubModal(null)} 
          />
        )}
        {activeSubModal === 'support' && (
          <SupportModal 
            isOpen={true} 
            onClose={() => setActiveSubModal(null)} 
          />
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
            box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
          }

          .nav-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 64px;
            gap: 16px;
          }

          .nav-logo {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            min-width: 0;
            flex-shrink: 0;
          }

          .logo-icon-box {
            width: 36px;
            height: 36px;
            background: #0f2744;
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
            color: #0f2744;
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
            color: #475569;
            font-weight: 600;
            font-size: 0.88rem;
            border-radius: var(--radius-xs);
            transition: var(--transition);
          }

          .nav-link:hover {
            color: #0f2744;
            background: #f1f5f9;
          }

          .nav-actions {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
          }

          /* Pay Rent Online Button */
          .nav-action-btn.pay-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: var(--radius-sm);
            color: #334155;
            font-size: 0.84rem;
            font-weight: 600;
            transition: var(--transition);
          }

          .nav-action-btn.pay-btn:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
            color: #0f172a;
          }

          .pay-icon {
            color: #64748b;
          }

          /* For Property Owners Button */
          .for-owners-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 7px 14px;
            background: #004953;
            color: #ffffff;
            font-weight: 700;
            font-size: 0.84rem;
            border-radius: 4px;
            letter-spacing: 0.01em;
            transition: var(--transition);
            white-space: nowrap;
          }

          .for-owners-btn:hover {
            background: #00363e;
            transform: translateY(-1px);
            box-shadow: 0 3px 8px rgba(0, 73, 83, 0.25);
          }

          /* Auth Links */
          .auth-links-group {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.88rem;
          }

          .nav-auth-link {
            color: #334155;
            font-weight: 600;
            padding: 4px 6px;
            transition: var(--transition);
          }

          .nav-auth-link:hover {
            color: #e11d48;
          }

          .auth-divider {
            color: #cbd5e1;
            font-size: 0.8rem;
          }

          /* Logged In User Pill & Popover */
          .user-profile-menu-wrap {
            position: relative;
          }

          .user-profile-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 10px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            color: #1e293b;
          }

          .user-avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #0f2744;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 700;
          }

          .user-dropdown-popover {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            width: 230px;
            background: #ffffff;
            border-radius: var(--radius-sm);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            border: 1px solid #e2e8f0;
            padding: 8px 0;
            z-index: 1050;
            animation: fadeIn 0.15s ease;
          }

          .user-dropdown-head {
            padding: 8px 14px;
            display: flex;
            flex-direction: column;
          }

          .user-dropdown-head strong {
            font-size: 0.9rem;
            color: #0f172a;
          }

          .user-dropdown-head small {
            font-size: 0.75rem;
            color: #64748b;
          }

          .user-dropdown-divider {
            height: 1px;
            background: #f1f5f9;
            margin: 6px 0;
          }

          .user-dropdown-item {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            font-size: 0.85rem;
            font-weight: 500;
            color: #334155;
            text-align: left;
            transition: var(--transition);
          }

          .user-dropdown-item:hover {
            background: #f8fafc;
            color: #0f2744;
          }

          .user-dropdown-item.logout-item {
            color: #e11d48;
          }

          .user-dropdown-item.logout-item:hover {
            background: #fff1f2;
          }

          /* Menu Hamburger Button (Always visible on right) */
          .menu-hamburger-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 7px 12px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: var(--radius-xs);
            color: #1e293b;
            font-size: 0.88rem;
            font-weight: 700;
            transition: var(--transition);
          }

          .menu-hamburger-btn:hover, .menu-hamburger-btn.active {
            background: #f1f5f9;
            border-color: #cbd5e1;
            color: #0f2744;
          }

          .menu-btn-text {
            font-weight: 700;
          }

          /* =========================================================
             RIGHT SIDE MENU FLYOUT / DROPDOWN PANEL (Matching Image)
             ========================================================= */
          .side-menu-overlay {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(2px);
            z-index: 9999;
            display: flex;
            justify-content: flex-end;
            animation: fadeIn 0.2s ease-out;
          }

          .side-menu-panel {
            width: 320px;
            max-width: 90vw;
            height: 100%;
            background: #ffffff;
            box-shadow: -8px 0 24px rgba(0, 0, 0, 0.12);
            display: flex;
            flex-direction: column;
            animation: slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            z-index: 10000;
          }

          .side-menu-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 18px;
            border-bottom: 1px solid #f1f5f9;
            background: #ffffff;
          }

          .side-menu-brand {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .logo-icon-box-sm {
            width: 28px;
            height: 28px;
            border-radius: 4px;
            background: #0f2744;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .side-menu-title {
            font-size: 0.88rem;
            font-weight: 800;
            color: #0f2744;
            line-height: 1.1;
          }

          .side-menu-subtitle {
            font-size: 0.65rem;
            font-weight: 600;
            color: #64748b;
          }

          .side-menu-close-btn {
            color: #64748b;
            padding: 6px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
          }

          .side-menu-close-btn:hover {
            background: #fee2e2;
            color: #e11d48;
          }

          /* User or Auth strip inside drawer */
          .side-menu-user-strip {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 18px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }

          .user-avatar-sm {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #0f2744;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.8rem;
          }

          .user-strip-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-width: 0;
          }

          .user-strip-info strong {
            font-size: 0.85rem;
            color: #0f172a;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .user-strip-info span {
            font-size: 0.7rem;
            color: #059669;
            font-weight: 600;
          }

          .user-strip-logout {
            color: #94a3b8;
            padding: 6px;
            border-radius: 4px;
            transition: var(--transition);
          }

          .user-strip-logout:hover {
            color: #e11d48;
            background: #ffe4e6;
          }

          .side-menu-auth-strip {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 18px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }

          /* Scrollable Menu Items */
          .side-menu-list {
            flex: 1;
            overflow-y: auto;
            padding: 6px 0;
            display: flex;
            flex-direction: column;
          }

          /* Scrollbar styling */
          .side-menu-list::-webkit-scrollbar {
            width: 5px;
          }
          .side-menu-list::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
          }

          .side-menu-item {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 11px 20px;
            font-size: 0.88rem;
            font-weight: 500;
            color: #475569;
            text-align: left;
            border-bottom: 1px solid #f8fafc;
            transition: var(--transition);
          }

          .side-menu-item:hover {
            background: #f8fafc;
            color: #0f172a;
            padding-left: 23px;
          }

          .side-menu-item-highlight {
            font-weight: 700;
            color: #0f172a;
          }

          .side-menu-item.text-highlight-item {
            color: #008080;
            font-weight: 600;
          }

          .item-text {
            flex: 1;
          }

          .item-badge-free {
            font-size: 0.68rem;
            font-weight: 700;
            color: #059669;
            background: #ecfdf5;
            padding: 2px 6px;
            border-radius: 4px;
            text-transform: uppercase;
          }

          .item-badge-earn {
            font-size: 0.68rem;
            font-weight: 700;
            color: #e11d48;
            background: #ffe4e6;
            padding: 2px 6px;
            border-radius: 4px;
          }

          .chevron-icon {
            color: #94a3b8;
          }

          /* Accordion styling */
          .side-menu-accordion-wrap {
            border-bottom: 1px solid #f1f5f9;
          }

          .accordion-header {
            color: #334155;
            font-weight: 600;
          }

          .side-menu-sublist {
            background: #f8fafc;
            padding: 4px 0 6px 14px;
            display: flex;
            flex-direction: column;
          }

          .side-menu-subitem {
            width: 100%;
            text-align: left;
            padding: 8px 16px;
            font-size: 0.82rem;
            color: #475569;
            font-weight: 500;
            transition: var(--transition);
          }

          .side-menu-subitem:hover {
            color: #0f2744;
            padding-left: 20px;
          }

          /* Contact Us Accordion Content */
          .side-menu-contact-box {
            background: #f8fafc;
            padding: 12px 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            font-size: 0.8rem;
            border-top: 1px solid #edf2f7;
          }

          .contact-row {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .contact-label {
            font-weight: 700;
            color: #64748b;
            font-size: 0.72rem;
            text-transform: uppercase;
          }

          .contact-val {
            font-weight: 600;
            color: #0f2744;
            transition: var(--transition);
          }

          .contact-val.email-val {
            color: #0284c7;
            word-break: break-all;
          }

          .contact-val.phone-val {
            color: #e11d48;
          }

          .contact-text {
            color: #475569;
            font-size: 0.78rem;
          }

          /* Side Menu Footer */
          .side-menu-footer {
            padding: 12px 18px;
            border-top: 1px solid #e2e8f0;
            background: #ffffff;
          }

          /* Keyframes */
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          /* Responsive Breakpoints */
          @media (max-width: 990px) {
            .nav-links {
              display: none !important;
            }
          }

          @media (max-width: 768px) {
            .top-strip {
              display: none !important;
            }
            .desktop-only {
              display: none !important;
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
            .side-menu-panel {
              width: 100%;
              max-width: 100%;
            }
          }
        `}</style>
      </header>
    </>
  );
}
