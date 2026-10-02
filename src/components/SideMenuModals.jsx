import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Copy, 
  Share2, 
  Download, 
  Printer, 
  FileText, 
  Send, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Truck, 
  Brush, 
  Gift, 
  Receipt, 
  Briefcase, 
  ArrowRight, 
  CreditCard,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { warehouseApi } from '../services/api';

/**
 * Plans Modal (Tenant, Owner, Buyer, Seller, Commercial)
 */
export function PlansModal({ isOpen, onClose, planType = 'tenant', onOpenRequirement }) {
  const [activeTab, setActiveTab] = useState(planType);
  const [selectedTier, setSelectedTier] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  if (!isOpen) return null;

  const planData = {
    tenant: {
      title: 'Warehouse Seeker / Tenant Plans',
      subtitle: 'Find verified Grade-A & B industrial sheds with zero brokerage and dedicated relationship manager.',
      tiers: [
        {
          id: 'tenant-basic',
          name: 'Freedom Plan',
          price: '₹0',
          period: 'Forever Free',
          badge: 'Popular',
          features: [
            'Direct Owner Contact Details',
            'Unlimited Search & Filter',
            'WhatsApp Instant Alerts',
            'Zero Brokerage Guarantee',
            'Basic Property Verification'
          ],
          cta: 'Browse Properties'
        },
        {
          id: 'tenant-assisted',
          name: 'Assisted Search Plan',
          price: '₹4,999',
          period: 'One-time (45 Days)',
          badge: 'Recommended',
          popular: true,
          features: [
            'Everything in Freedom Plan',
            'Dedicated Industrial Relationship Manager',
            'Up to 15 Curated Site Visits Arranged',
            'Rental Lease Negotiation Support',
            'Free Legal Lease Agreement Draft',
            'Priority Property Shortlisting'
          ],
          cta: 'Select Assisted Plan'
        },
        {
          id: 'tenant-enterprise',
          name: 'VIP Enterprise Plan',
          price: '₹14,999',
          period: '90 Days Custom',
          badge: 'Corporate',
          features: [
            'Everything in Assisted Plan',
            'Custom 3PL & Power Load Feasibility',
            'Fire NOC & Industrial Zoning Due Diligence',
            'Multi-City Warehouse Portfolio Sourcing',
            'Escorted Executive Physical Site Inspections',
            'Guaranteed Move-in Guarantee'
          ],
          cta: 'Select VIP Plan'
        }
      ]
    },
    owner: {
      title: 'Property Owner Listing Plans',
      subtitle: 'Rent or sell your industrial land, godown, or shed to verified MNC & 3PL corporate tenants 3x faster.',
      tiers: [
        {
          id: 'owner-free',
          name: 'Basic Listing',
          price: '₹0',
          period: 'Free Listing',
          features: [
            'Listing on All India Warehouse',
            'Direct Inquiries to your Phone/Email',
            'Standard Search Placement',
            'Zero Commission on Direct Deals'
          ],
          cta: 'Post Free Property'
        },
        {
          id: 'owner-super',
          name: 'Super Owner Plan',
          price: '₹3,999',
          period: '60 Days',
          badge: 'Best Value',
          popular: true,
          features: [
            'Featured Tag on Search & City Hubs',
            'Verification Badge & 360° Photo Tag',
            'Direct SMS & WhatsApp broadcast to 500+ Seekers',
            'Relationship Manager for Lead Screening',
            'Free Legal Lease Agreement'
          ],
          cta: 'Select Super Owner'
        },
        {
          id: 'owner-corporate',
          name: 'Fast Liquidity / MNC Plan',
          price: '₹11,999',
          period: 'Till Rented/Sold',
          badge: 'Guaranteed Leads',
          features: [
            'Top #1 Position in City Listings',
            'Dedicated Key Account Manager',
            'Direct Pitch to 50+ Top 3PL & E-commerce Brands',
            'Drone & High-Def Video Walkthrough Shoot',
            'Pre-qualified Corporate Tenant Meetings'
          ],
          cta: 'Select MNC Plan'
        }
      ]
    },
    buyer: {
      title: 'Buyer & Investor Acquisition Plans',
      subtitle: 'Buy high-yielding warehouse pre-leased properties and prime industrial plots with verified titles.',
      tiers: [
        {
          id: 'buyer-basic',
          name: 'Investor Basic',
          price: '₹0',
          period: 'Free Access',
          features: [
            'Access to Industrial Plot & Shed Listings',
            'ROI & Rental Yield Calculations',
            'Direct Seller Connect'
          ],
          cta: 'Explore Opportunities'
        },
        {
          id: 'buyer-elite',
          name: 'Elite Investor Club',
          price: '₹9,999',
          period: '180 Days',
          badge: 'High ROI',
          popular: true,
          features: [
            'Pre-leased Warehouse Portfolios (8-11% ROI)',
            'Title & Legal Clearance Reports by Senior Advocates',
            'Off-Market Prime Industrial Land Leads',
            'Direct Negotiation with Institutional Sellers',
            'Dedicated Transaction Advisor'
          ],
          cta: 'Join Elite Club'
        }
      ]
    },
    seller: {
      title: 'Seller Fast-Track Plans',
      subtitle: 'Liquidate your industrial assets, factory lands, or logistics parks to institutional funds and HNIs.',
      tiers: [
        {
          id: 'seller-standard',
          name: 'Standard Seller',
          price: '₹0',
          period: 'Zero Upfront',
          features: [
            'Direct listing on investor portal',
            'Inquiries forwarded directly to you',
            'Standard verification'
          ],
          cta: 'Post Property'
        },
        {
          id: 'seller-speed',
          name: 'Speed Liquidation',
          price: '₹7,999',
          period: '90 Days Fast-Track',
          badge: 'Speed Deal',
          popular: true,
          features: [
            'Direct Pitch to 250+ Registered Institutional Buyers',
            'Valuation & Yield Advisory Report',
            'Digital NDA & Escrow Advisory Support',
            'Featured placement on Investor Newsletters'
          ],
          cta: 'Select Speed Plan'
        }
      ]
    },
    commercial: {
      title: 'Commercial & Multi-Asset Plans',
      subtitle: 'Custom industrial solutions for Grade-A Warehouses, Cold Storage, Industrial Sheds & Commercial Land.',
      tiers: [
        {
          id: 'comm-warehouse',
          name: 'Grade-A Warehouse Suite',
          price: 'Custom',
          period: 'Per SFT / Month',
          features: [
            'FM2 Flooring & 12m Clear Height',
            'Fire Sprinklers & ESFR Systems',
            'Full Dock Levelers & 40ft Container Turnaround',
            'Multi-tenant or Dedicated Campus'
          ],
          cta: 'Request Proposal'
        },
        {
          id: 'comm-cold',
          name: 'Cold Storage & Temperature Controlled',
          price: 'Custom',
          period: 'Turnkey Solution',
          badge: 'Pharma / Agri',
          popular: true,
          features: [
            '-25°C Frozen to +15°C Chilled Zones',
            '100% DG Power Backup & Ammonia/Freon Tech',
            'FSSAI & Pharma Grade Compliance',
            'Multi-Chamber Modular Layouts'
          ],
          cta: 'Request Cold Storage'
        }
      ]
    }
  };

  const currentPlan = planData[activeTab] || planData.tenant;

  const handleSelectPlan = (tier) => {
    setSelectedTier(tier);
  };

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) return;

    try {
      await warehouseApi.submitInquiry({
        type: 'subscription_plan_inquiry',
        planCategory: activeTab,
        tierName: selectedTier ? selectedTier.name : 'General Plan Inquiry',
        price: selectedTier ? selectedTier.price : '',
        name: userName,
        phone: userPhone
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setInquirySent(true);
      setTimeout(() => {
        setInquirySent(false);
        setSelectedTier(null);
        onClose();
      }, 2500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="smenu-modal-overlay" onClick={onClose}>
      <div className="smenu-modal smenu-modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="smenu-modal-header">
          <div>
            <span className="smenu-modal-tag">Verified Direct Network</span>
            <h2 className="smenu-modal-title">{currentPlan.title}</h2>
            <p className="smenu-modal-sub">{currentPlan.subtitle}</p>
          </div>
          <button className="smenu-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Plan Category Tabs */}
        <div className="smenu-plan-tabs">
          {[
            { key: 'tenant', label: 'Tenant Plans' },
            { key: 'owner', label: 'Owner Plans' },
            { key: 'buyer', label: 'Buyer Plans' },
            { key: 'seller', label: 'Seller Plans' },
            { key: 'commercial', label: 'Commercial Plans' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSelectedTier(null); }}
              className={`smenu-plan-tab ${activeTab === tab.key ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body: Cards */}
        <div className="smenu-plan-cards">
          {currentPlan.tiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`smenu-plan-card ${tier.popular ? 'popular' : ''} ${selectedTier?.id === tier.id ? 'selected' : ''}`}
            >
              {tier.badge && (
                <span className={`smenu-plan-badge ${tier.popular ? 'badge-popular' : ''}`}>
                  {tier.badge}
                </span>
              )}
              <h3 className="plan-card-name">{tier.name}</h3>
              <div className="plan-card-price-box">
                <span className="plan-card-price">{tier.price}</span>
                <span className="plan-card-period">/ {tier.period}</span>
              </div>
              <ul className="plan-card-features">
                {tier.features.map((feat, idx) => (
                  <li key={idx} className="plan-feature-item">
                    <CheckCircle2 size={16} className="text-emerald shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleSelectPlan(tier)}
                className={`btn w-full ${tier.popular ? 'btn-red' : 'btn-outline'}`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Quick Callback / Lead Form if tier selected */}
        {selectedTier && (
          <div className="smenu-plan-checkout">
            {inquirySent ? (
              <div className="smenu-success-box">
                <CheckCircle2 size={24} className="text-emerald" />
                <div>
                  <h4>Thank You! Plan Request Received</h4>
                  <p>Our Senior Industrial Advisor will activate your <strong>{selectedTier.name}</strong> and call you within 15 minutes.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="smenu-checkout-form">
                <div className="smenu-checkout-info">
                  <span className="checkout-label">Selected Plan:</span>
                  <span className="checkout-title">{selectedTier.name} ({selectedTier.price})</span>
                </div>
                <div className="smenu-checkout-inputs">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="smenu-input"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    required
                    className="smenu-input"
                  />
                  <button type="submit" className="btn btn-red">
                    Confirm & Start <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="smenu-modal-footer">
          <span>Need custom enterprise warehousing across 10+ cities?</span>
          <button 
            onClick={() => { onClose(); onOpenRequirement && onOpenRequirement('need'); }} 
            className="smenu-footer-btn"
          >
            Request Corporate RFP <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Free Rent Receipts / GST Invoice Generator Modal
 */
export function RentReceiptModal({ isOpen, onClose }) {
  const [tenantName, setTenantName] = useState('');
  const [landlordName, setLandlordName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [rentAmount, setRentAmount] = useState('45000');
  const [receiptMonth, setReceiptMonth] = useState('October 2026');
  const [landlordPan, setLandlordPan] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const receiptNumber = `AIW-REC-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="smenu-modal-overlay" onClick={onClose}>
      <div className="smenu-modal smenu-modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="smenu-modal-header">
          <div>
            <span className="smenu-modal-tag">Free Industrial Utility</span>
            <h2 className="smenu-modal-title">Rent Receipt & Invoice Generator</h2>
            <p className="smenu-modal-sub">Generate instant HRA and tax-compliant industrial/residential rent receipts with PAN verification.</p>
          </div>
          <button className="smenu-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {!showPreview ? (
          <div className="smenu-modal-body">
            <div className="smenu-form-grid">
              <div className="form-group">
                <label>Tenant / Company Name *</label>
                <input 
                  type="text" 
                  value={tenantName} 
                  onChange={(e) => setTenantName(e.target.value)} 
                  placeholder="e.g. Apex Logistics Pvt Ltd" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group">
                <label>Landlord / Owner Name *</label>
                <input 
                  type="text" 
                  value={landlordName} 
                  onChange={(e) => setLandlordName(e.target.value)} 
                  placeholder="e.g. R. K. Warehouse Infrastructure" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group full-width">
                <label>Warehouse / Property Address *</label>
                <input 
                  type="text" 
                  value={propertyAddress} 
                  onChange={(e) => setPropertyAddress(e.target.value)} 
                  placeholder="e.g. Shed No. 4B, Hoskote Industrial Area, Bangalore - 562114" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group">
                <label>Monthly Rent Amount (₹) *</label>
                <input 
                  type="number" 
                  value={rentAmount} 
                  onChange={(e) => setRentAmount(e.target.value)} 
                  placeholder="45000" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group">
                <label>Rent Month / Period *</label>
                <input 
                  type="text" 
                  value={receiptMonth} 
                  onChange={(e) => setReceiptMonth(e.target.value)} 
                  placeholder="e.g. October 2026" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group full-width">
                <label>Landlord PAN (Required if rent &gt; ₹1 Lakh/yr for IT Tax Exemption)</label>
                <input 
                  type="text" 
                  value={landlordPan} 
                  onChange={(e) => setLandlordPan(e.target.value.toUpperCase())} 
                  placeholder="ABCDE1234F" 
                  maxLength={10}
                  className="smenu-input font-mono"
                />
              </div>
            </div>

            <button 
              onClick={() => {
                if (!tenantName || !landlordName) {
                  alert('Please enter Tenant and Landlord name');
                  return;
                }
                setShowPreview(true);
              }} 
              className="btn btn-red w-full mt-4"
            >
              Generate Printable Receipt <Receipt size={16} />
            </button>
          </div>
        ) : (
          <div className="smenu-modal-body">
            {/* Printable Receipt Card */}
            <div className="receipt-paper" id="printable-receipt">
              <div className="receipt-head">
                <div>
                  <h3 className="receipt-logo">ALL INDIA WAREHOUSE</h3>
                  <span className="receipt-type">RENT PAYMENT RECEIPT</span>
                </div>
                <div className="receipt-meta">
                  <span><strong>Receipt #:</strong> {receiptNumber}</span>
                  <span><strong>Date:</strong> {currentDate}</span>
                </div>
              </div>

              <div className="receipt-body">
                <p className="receipt-statement">
                  Received with thanks from <strong>{tenantName}</strong> the sum of 
                  <span className="receipt-amount-badge"> ₹{Number(rentAmount).toLocaleString('en-IN')} </span> 
                  towards the rent for the period of <strong>{receiptMonth}</strong> for the property located at:
                </p>
                <p className="receipt-address">
                  <strong>Premises:</strong> {propertyAddress || 'Industrial Warehouse Shed, India'}
                </p>

                <div className="receipt-signatures">
                  <div className="sign-box">
                    <span className="sign-label">Payment Mode:</span>
                    <span className="sign-val">Online / Bank Transfer (Direct)</span>
                  </div>
                  <div className="sign-box text-right">
                    <span className="sign-label">Landlord Signature:</span>
                    <span className="landlord-name-sign">{landlordName}</span>
                    {landlordPan && <span className="pan-text">PAN: {landlordPan}</span>}
                  </div>
                </div>
              </div>

              <div className="receipt-stamp">
                <span>VERIFIED VALID RENT RECEIPT</span>
              </div>
            </div>

            <div className="smenu-action-row">
              <button onClick={() => setShowPreview(false)} className="btn btn-outline">
                Edit Details
              </button>
              <button onClick={handlePrint} className="btn btn-red">
                <Printer size={16} /> Print / Save PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Refer & Earn Modal
 */
export function ReferEarnModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const referralCode = 'AIW-REF-98840';
  const referralUrl = `https://allindiawarehouse.in/?ref=${referralCode}`;

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Hi! If you are looking to rent, lease or buy warehouse space with Zero Brokerage, use All India Warehouse: ${referralUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="smenu-modal-overlay" onClick={onClose}>
      <div className="smenu-modal smenu-modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="smenu-modal-header">
          <div>
            <span className="smenu-modal-tag text-emerald">Rewards Program</span>
            <h2 className="smenu-modal-title">Refer & Earn ₹5,000</h2>
            <p className="smenu-modal-sub">Earn cash rewards whenever your referred warehouse owner or corporate tenant closes a deal on All India Warehouse.</p>
          </div>
          <button className="smenu-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="smenu-modal-body">
          <div className="refer-steps-grid">
            <div className="refer-step-card">
              <div className="refer-step-num">1</div>
              <h4>Share Your Link</h4>
              <p>Share your unique referral link with warehouse owners or logistics seekers.</p>
            </div>
            <div className="refer-step-card">
              <div className="refer-step-num">2</div>
              <h4>They Post / Search</h4>
              <p>They list their industrial shed or submit their space requirement.</p>
            </div>
            <div className="refer-step-card">
              <div className="refer-step-num">3</div>
              <h4>You Get ₹5,000</h4>
              <p>Direct bank transfer credited immediately upon verification.</p>
            </div>
          </div>

          <div className="refer-link-box">
            <span className="refer-link-label">Your Unique Referral Link:</span>
            <div className="refer-input-group">
              <input type="text" readOnly value={referralUrl} className="refer-input" />
              <button onClick={handleCopy} className="btn btn-outline btn-sm">
                <Copy size={15} /> {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="smenu-action-row mt-4">
            <button onClick={handleShareWhatsApp} className="btn btn-emerald w-full">
              <Share2 size={16} /> Share on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Rental Agreement Modal
 */
export function RentalAgreementModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tenantName: '',
    ownerName: '',
    city: 'Bangalore',
    monthlyRent: '65000',
    depositMonths: '6',
    leaseYears: '3',
    escalationPercent: '5'
  });
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await warehouseApi.submitInquiry({
        type: 'rental_agreement_draft_request',
        ...formData
      });
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setCompleted(true);
      setTimeout(() => {
        setCompleted(false);
        onClose();
      }, 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="smenu-modal-overlay" onClick={onClose}>
      <div className="smenu-modal smenu-modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="smenu-modal-header">
          <div>
            <span className="smenu-modal-tag">Legal & Due Diligence</span>
            <h2 className="smenu-modal-title">E-Stamp Rental & Lease Agreement</h2>
            <p className="smenu-modal-sub">Draft legally-vetted industrial commercial lease agreements with biometric e-sign & digital stamp delivery.</p>
          </div>
          <button className="smenu-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="smenu-modal-body">
          {completed ? (
            <div className="smenu-success-box">
              <CheckCircle2 size={28} className="text-emerald" />
              <div>
                <h4>Lease Agreement Request Initiated!</h4>
                <p>Our legal documentation team will contact you to draft your custom registered agreement within 2 hours.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="smenu-form-grid">
              <div className="form-group">
                <label>Tenant / Company Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.tenantName} 
                  onChange={(e) => setFormData({...formData, tenantName: e.target.value})} 
                  placeholder="e.g. QuickLogistics India" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group">
                <label>Property Owner / Landlord Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.ownerName} 
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})} 
                  placeholder="e.g. S. Narayanan" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group">
                <label>Warehouse City / Location *</label>
                <select 
                  value={formData.city} 
                  onChange={(e) => setFormData({...formData, city: e.target.value})} 
                  className="smenu-input"
                >
                  <option value="Bangalore">Bangalore / Hoskote / Nelamangala</option>
                  <option value="Chennai">Chennai / Sriperumbudur / Oragadam</option>
                  <option value="Mumbai">Mumbai / Bhiwandi / Panvel</option>
                  <option value="Delhi-NCR">Delhi NCR / Gurgaon / Manesar</option>
                  <option value="Pune">Pune / Chakan / Talegaon</option>
                  <option value="Hyderabad">Hyderabad / Shamshabad / Medchal</option>
                </select>
              </div>
              <div className="form-group">
                <label>Monthly Rent (₹) *</label>
                <input 
                  type="number" 
                  required 
                  value={formData.monthlyRent} 
                  onChange={(e) => setFormData({...formData, monthlyRent: e.target.value})} 
                  className="smenu-input"
                />
              </div>
              <div className="form-group">
                <label>Security Deposit (Months)</label>
                <input 
                  type="number" 
                  value={formData.depositMonths} 
                  onChange={(e) => setFormData({...formData, depositMonths: e.target.value})} 
                  className="smenu-input"
                />
              </div>
              <div className="form-group">
                <label>Lock-in / Lease Period (Years)</label>
                <input 
                  type="number" 
                  value={formData.leaseYears} 
                  onChange={(e) => setFormData({...formData, leaseYears: e.target.value})} 
                  className="smenu-input"
                />
              </div>

              <div className="full-width mt-3">
                <button type="submit" disabled={submitting} className="btn btn-red w-full">
                  {submitting ? 'Generating Agreement...' : 'Proceed with Legal Draft (₹999 Free Preview)'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Service Modal for Painting & Cleaning, Packers & Movers
 */
export function GeneralServiceModal({ isOpen, onClose, serviceType = 'cleaning' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Bangalore');
  const [sqft, setSqft] = useState('10000');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const config = serviceType === 'cleaning' ? {
    tag: 'Warehouse Upkeep',
    title: 'Industrial Painting & Deep Cleaning',
    sub: 'Heavy-duty epoxy floor coating, pressure washing, high-bay roof dusting, and pesticide sanitization.',
    icon: Brush
  } : {
    tag: '3PL & Transport',
    title: 'Packers, Movers & Heavy Logistics',
    sub: 'Factory relocation, heavy pallet shifting, forklift mobilization, and multi-axle container transport.',
    icon: Truck
  };

  const Icon = config.icon;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitting(true);
    try {
      await warehouseApi.submitInquiry({
        type: 'vendor_service_inquiry',
        serviceType,
        name,
        phone,
        city,
        approxAreaSqft: sqft
      });
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="smenu-modal-overlay" onClick={onClose}>
      <div className="smenu-modal smenu-modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="smenu-modal-header">
          <div>
            <span className="smenu-modal-tag">{config.tag}</span>
            <h2 className="smenu-modal-title">{config.title}</h2>
            <p className="smenu-modal-sub">{config.sub}</p>
          </div>
          <button className="smenu-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="smenu-modal-body">
          {submitted ? (
            <div className="smenu-success-box">
              <CheckCircle2 size={28} className="text-emerald" />
              <div>
                <h4>Request Submitted!</h4>
                <p>Our industrial vendor partner will share an instant competitive rate card and inspect your site.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="smenu-form-grid">
              <div className="form-group">
                <label>Your Name *</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="e.g. Rajesh Sharma" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  required 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="+91 98840 12341" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group">
                <label>City *</label>
                <select 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  className="smenu-input"
                >
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="NCR">Delhi NCR</option>
                  <option value="Pune">Pune</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
              <div className="form-group">
                <label>Approx Area (Sq.Ft.)</label>
                <input 
                  type="number" 
                  value={sqft} 
                  onChange={(e) => setSqft(e.target.value)} 
                  placeholder="10000" 
                  className="smenu-input"
                />
              </div>

              <div className="full-width mt-3">
                <button type="submit" disabled={submitting} className="btn btn-red w-full">
                  {submitting ? 'Submitting...' : 'Get Instant Free Quote & Rate Card'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Pay Rent Online Modal
 */
export function PayRentModal({ isOpen, onClose }) {
  const [landlordUpi, setLandlordUpi] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [paid, setPaid] = useState(false);

  if (!isOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    if (!rentAmount || !landlordUpi) return;
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setPaid(true);
    setTimeout(() => {
      setPaid(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="smenu-modal-overlay" onClick={onClose}>
      <div className="smenu-modal smenu-modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="smenu-modal-header">
          <div>
            <span className="smenu-modal-tag text-emerald">Zero Convenience Fee</span>
            <h2 className="smenu-modal-title">Pay Warehouse Rent & Token Online</h2>
            <p className="smenu-modal-sub">Pay monthly industrial rent or holding token securely via Credit Card, NetBanking, or UPI and earn credit reward points.</p>
          </div>
          <button className="smenu-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="smenu-modal-body">
          {paid ? (
            <div className="smenu-success-box">
              <CheckCircle2 size={28} className="text-emerald" />
              <div>
                <h4>Payment Link Generated!</h4>
                <p>Redirecting to secure 256-bit encrypted payment gateway. You will receive an instant GST invoice.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePay} className="smenu-form-grid">
              <div className="form-group">
                <label>Your Name / Company *</label>
                <input 
                  type="text" 
                  required 
                  value={tenantName} 
                  onChange={(e) => setTenantName(e.target.value)} 
                  placeholder="e.g. Metro Supply Chain Ltd" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group">
                <label>Landlord UPI ID / Account *</label>
                <input 
                  type="text" 
                  required 
                  value={landlordUpi} 
                  onChange={(e) => setLandlordUpi(e.target.value)} 
                  placeholder="e.g. warehouseowner@upi" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group full-width">
                <label>Rent Amount (₹) *</label>
                <input 
                  type="number" 
                  required 
                  value={rentAmount} 
                  onChange={(e) => setRentAmount(e.target.value)} 
                  placeholder="75000" 
                  className="smenu-input"
                />
              </div>

              <div className="pay-benefits-strip full-width">
                <span>✓ Earn up to 1.5% Cashback on Credit Cards</span>
                <span>✓ Instant Tax Invoice & Proof</span>
              </div>

              <div className="full-width mt-2">
                <button type="submit" className="btn btn-red w-full">
                  <CreditCard size={16} /> Proceed to Secure Payment
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Careers Modal
 */
export function CareersModal({ isOpen, onClose }) {
  const [appliedRole, setAppliedRole] = useState(null);
  const [applied, setApplied] = useState(false);
  const [candName, setCandName] = useState('');
  const [candPhone, setCandPhone] = useState('');

  if (!isOpen) return null;

  const roles = [
    { title: 'Warehouse Relationship Manager', loc: 'Bangalore / Chennai / Mumbai', type: 'Full-Time', exp: '2-5 Yrs' },
    { title: 'Industrial Land & Shed Surveyor', loc: 'Pan-India', type: 'Full-Time', exp: '1-3 Yrs' },
    { title: 'Corporate Key Account Executive', loc: 'Gurgaon / NCR', type: 'Full-Time', exp: '3-6 Yrs' }
  ];

  const handleApply = (e) => {
    e.preventDefault();
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setAppliedRole(null);
      onClose();
    }, 2500);
  };

  return (
    <div className="smenu-modal-overlay" onClick={onClose}>
      <div className="smenu-modal smenu-modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="smenu-modal-header">
          <div>
            <span className="smenu-modal-tag">We Are Hiring!</span>
            <h2 className="smenu-modal-title">Careers at All India Warehouse</h2>
            <p className="smenu-modal-sub">Join India's fastest-growing Zero-Brokerage Industrial Real Estate and logistics technology network.</p>
          </div>
          <button className="smenu-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="smenu-modal-body">
          {applied ? (
            <div className="smenu-success-box">
              <CheckCircle2 size={28} className="text-emerald" />
              <div>
                <h4>Application Received!</h4>
                <p>Our talent acquisition team will review your profile and contact you within 24 hours.</p>
              </div>
            </div>
          ) : appliedRole ? (
            <form onSubmit={handleApply} className="smenu-form-grid">
              <div className="full-width">
                <h4>Applying for: {appliedRole.title}</h4>
                <p className="text-muted text-sm">{appliedRole.loc} • {appliedRole.exp}</p>
              </div>
              <div className="form-group">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={candName} 
                  onChange={(e) => setCandName(e.target.value)} 
                  placeholder="Your Name" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group">
                <label>Mobile Number *</label>
                <input 
                  type="tel" 
                  required 
                  value={candPhone} 
                  onChange={(e) => setCandPhone(e.target.value)} 
                  placeholder="+91 98840 12341" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group full-width">
                <label>Resume / LinkedIn Profile Link</label>
                <input 
                  type="url" 
                  placeholder="https://linkedin.com/in/yourprofile" 
                  className="smenu-input"
                />
              </div>
              <div className="smenu-action-row full-width mt-2">
                <button type="button" onClick={() => setAppliedRole(null)} className="btn btn-outline">
                  Back to Openings
                </button>
                <button type="submit" className="btn btn-red">
                  Submit Application
                </button>
              </div>
            </form>
          ) : (
            <div className="career-list">
              {roles.map((r, i) => (
                <div key={i} className="career-item">
                  <div>
                    <h4>{r.title}</h4>
                    <p>{r.loc} • {r.exp} • {r.type}</p>
                  </div>
                  <button onClick={() => setAppliedRole(r)} className="btn btn-outline btn-sm">
                    Apply Now <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Blog / Insights Modal
 */
export function BlogModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const articles = [
    {
      title: 'Warehouse Rental Rates 2026: Bangalore, Chennai, Mumbai & NCR Compared',
      date: 'Oct 2026',
      readTime: '4 min read',
      tag: 'Market Trends',
      summary: 'Explore the latest per sq.ft leasing rentals across Hoskote, Bhiwandi, Sriperumbudur, and Manesar corridors with zero brokerage insights.'
    },
    {
      title: 'Grade-A vs Grade-B Industrial Sheds: Key Specification Differences',
      date: 'Sep 2026',
      readTime: '6 min read',
      tag: 'Compliance & Specs',
      summary: 'Everything you need to know about FM2 flooring, dock levelers, 12-meter clear heights, and NFPA fire sprinkler regulations.'
    },
    {
      title: 'How E-commerce & 3PL Logistics are Reshaping Multi-City Dark Stores',
      date: 'Aug 2026',
      readTime: '5 min read',
      tag: 'Logistics Tech',
      summary: 'Why intra-city micro fulfillment centers within 15 km of metropolitan centers are commanding premium long-term leases.'
    }
  ];

  return (
    <div className="smenu-modal-overlay" onClick={onClose}>
      <div className="smenu-modal smenu-modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="smenu-modal-header">
          <div>
            <span className="smenu-modal-tag">Industrial Intelligence</span>
            <h2 className="smenu-modal-title">All India Warehouse Blog & Insights</h2>
            <p className="smenu-modal-sub">Expert analyses, rental benchmarks, and regulatory guidelines for industrial real estate in India.</p>
          </div>
          <button className="smenu-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="smenu-modal-body">
          <div className="blog-list">
            {articles.map((art, idx) => (
              <div key={idx} className="blog-card">
                <div className="blog-meta">
                  <span className="blog-tag">{art.tag}</span>
                  <span className="blog-date">{art.date} • {art.readTime}</span>
                </div>
                <h3 className="blog-title">{art.title}</h3>
                <p className="blog-summary">{art.summary}</p>
                <div className="blog-footer">
                  <span className="blog-read-link">Read Full Report <ArrowRight size={14} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Support / 24x7 Helpdesk Modal
 */
export function SupportModal({ isOpen, onClose }) {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [userContact, setUserContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (!userContact) return;
    try {
      await warehouseApi.submitInquiry({
        type: 'support_helpdesk_ticket',
        subject: ticketSubject,
        message: ticketMsg,
        contact: userContact
      });
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="smenu-modal-overlay" onClick={onClose}>
      <div className="smenu-modal smenu-modal-md" onClick={(e) => e.stopPropagation()}>
        <div className="smenu-modal-header">
          <div>
            <span className="smenu-modal-tag text-emerald">24x7 Helpdesk</span>
            <h2 className="smenu-modal-title">All India Warehouse Support</h2>
            <p className="smenu-modal-sub">We are here to assist property owners, tenants, and industrial brokers with instant resolution.</p>
          </div>
          <button className="smenu-modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="smenu-modal-body">
          {/* Quick Contact Cards */}
          <div className="support-quick-grid">
            <a href="tel:+919884012341" className="support-card">
              <Phone size={20} className="text-red" />
              <div>
                <strong>Direct Helpline</strong>
                <span>+91 98840 12341</span>
              </div>
            </a>
            <a href="mailto:assist@allindiawarehouse.in" className="support-card">
              <Mail size={20} className="text-blue" />
              <div>
                <strong>Email Support</strong>
                <span>assist@allindiawarehouse.in</span>
              </div>
            </a>
          </div>

          {submitted ? (
            <div className="smenu-success-box mt-4">
              <CheckCircle2 size={28} className="text-emerald" />
              <div>
                <h4>Support Ticket #AIW-{Math.floor(1000 + Math.random() * 9000)} Created</h4>
                <p>Our senior support executive will call or email you within 30 minutes.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="smenu-form-grid mt-4">
              <div className="form-group full-width">
                <label>Your Phone or Email *</label>
                <input 
                  type="text" 
                  required 
                  value={userContact} 
                  onChange={(e) => setUserContact(e.target.value)} 
                  placeholder="+91 98840 12341 or name@company.com" 
                  className="smenu-input"
                />
              </div>
              <div className="form-group full-width">
                <label>Subject / Issue Type</label>
                <select 
                  value={ticketSubject} 
                  onChange={(e) => setTicketSubject(e.target.value)} 
                  className="smenu-input"
                >
                  <option value="Listing Verification Issue">Listing Verification & Approval</option>
                  <option value="Tenant Search Assistance">Assistance finding warehouse</option>
                  <option value="Legal Lease Agreement">Rental Agreement & Token</option>
                  <option value="Payment / Invoice">Payment / Invoice Inquiry</option>
                  <option value="Other">Other Query</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Describe your question or requirement</label>
                <textarea 
                  rows={3} 
                  value={ticketMsg} 
                  onChange={(e) => setTicketMsg(e.target.value)} 
                  placeholder="How can our industrial support team assist you today?" 
                  className="smenu-input"
                />
              </div>
              <div className="full-width">
                <button type="submit" className="btn btn-red w-full">
                  Submit Support Ticket <Send size={15} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
