import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Camera, 
  DollarSign, 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { CITIES_LIST, PROPERTY_TYPES } from '../data/sampleMarketplaceProperties';
import { marketplaceApi } from '../services/marketplaceApi';

export default function MarketplacePostPropertyWizard({ onComplete, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    purpose: 'rent',
    type: 'Warehouse',
    title: '',
    city: 'Chennai',
    locality: '',
    state: 'Tamil Nadu',
    area_sqft: '',
    clear_height: '32 Ft',
    docks: '4',
    power_backup: '100 kVA',
    price_or_rent_psf: '',
    deposit: '6 Months',
    status: 'Ready to Move',
    availability: 'Immediate',
    features: ['Loading Docks', 'Fire Safety', '24x7 Security', 'Truck Access'],
    imageUrl: '',
    description: '',
    owner_name: '',
    owner_phone: '',
    otp: ''
  });

  const availableFeatures = [
    "Loading Docks",
    "Fire Safety",
    "Power Backup",
    "24x7 Security",
    "Truck Access",
    "Cold Storage",
    "Crane Provisions",
    "Office Block Attached"
  ];

  const handleFeatureToggle = (feat) => {
    const current = formData.features;
    let updated;
    if (current.includes(feat)) {
      updated = current.filter(f => f !== feat);
    } else {
      updated = [...current, feat];
    }
    setFormData({ ...formData, features: updated });
  };

  // Step Navigations
  const handleNextStep = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (currentStep === 1) {
      if (!formData.title.trim()) {
        setErrorMsg('Please enter a brief property title');
        return;
      }
      if (!formData.locality.trim()) {
        setErrorMsg('Please specify locality or industrial corridor');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.area_sqft || Number(formData.area_sqft) <= 0) {
        setErrorMsg('Please enter a valid warehouse area in sq ft');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!formData.price_or_rent_psf) {
        setErrorMsg('Please enter expected price or rent per sq.ft');
        return;
      }
      setCurrentStep(4);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!formData.owner_name.trim()) {
      setErrorMsg('Please enter owner or company name');
      return;
    }
    if (formData.owner_phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const propertyPayload = {
        title: formData.title,
        type: formData.type,
        purpose: formData.purpose,
        city: formData.city,
        locality: formData.locality,
        state: formData.state,
        area_sqft: Number(formData.area_sqft),
        price_or_rent_psf: Number(formData.price_or_rent_psf),
        deposit: formData.deposit,
        status: formData.status,
        availability: formData.availability,
        clear_height: formData.clear_height,
        docks: Number(formData.docks) || 0,
        power_backup: formData.power_backup,
        features: formData.features,
        images: formData.imageUrl ? [formData.imageUrl] : [
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
        ],
        description: formData.description,
        owner_name: formData.owner_name,
        owner_phone: formData.owner_phone
      };

      await marketplaceApi.postProperty(propertyPayload);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Submission failed. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="marketplace-container" style={{ padding: '40px 16px' }}>
        <div className="mp-wizard-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={36} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f2744', margin: '0 0 8px' }}>
            Listing Submitted Successfully!
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', maxWidth: '500px', margin: '0 auto 20px', lineHeight: 1.5 }}>
            Your property <strong style={{ color: '#0f172a' }}>"{formData.title}"</strong> is submitted for verification. It will appear on the live portal after review by our logistics team.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fef9c3', color: '#854d0e', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '24px' }}>
            <Clock size={16} /> Status: Pending Verification Review
          </div>
          <div>
            <button 
              type="button" 
              className="btn btn-red"
              onClick={onComplete}
            >
              Go to Marketplace Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = (currentStep / 4) * 100;

  return (
    <div className="marketplace-container" style={{ padding: '30px 16px' }}>
      <div className="mp-wizard-card">
        {/* Wizard Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#004953', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Free Owner Listing
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f2744', margin: '2px 0 0' }}>
              Post Your Industrial Space
            </h2>
          </div>
          {onCancel && (
            <button 
              type="button" 
              onClick={onCancel}
              className="btn btn-outline btn-sm"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mp-progress-bar-wrap">
          <div className="mp-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* Step Indicators */}
        <div className="mp-wizard-steps-nav">
          <div className={`mp-step-indicator ${currentStep === 1 ? 'active' : currentStep > 1 ? 'done' : ''}`}>
            <span className="mp-step-number">1</span>
            <span className="desktop-only">Basic Info</span>
          </div>
          <div className={`mp-step-indicator ${currentStep === 2 ? 'active' : currentStep > 2 ? 'done' : ''}`}>
            <span className="mp-step-number">2</span>
            <span className="desktop-only">Specs & Photos</span>
          </div>
          <div className={`mp-step-indicator ${currentStep === 3 ? 'active' : currentStep > 3 ? 'done' : ''}`}>
            <span className="mp-step-number">3</span>
            <span className="desktop-only">Price & Terms</span>
          </div>
          <div className={`mp-step-indicator ${currentStep === 4 ? 'active' : ''}`}>
            <span className="mp-step-number">4</span>
            <span className="desktop-only">Contact & OTP</span>
          </div>
        </div>

        {errorMsg && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 14px', borderRadius: '6px', fontSize: '0.86rem', marginBottom: '18px' }}>
            {errorMsg}
          </div>
        )}

        {/* STEP 1: Basic Information */}
        {currentStep === 1 && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label className="mp-field-label">Purpose of Listing</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['rent', 'lease', 'sale'].map((p) => (
                  <button 
                    key={p}
                    type="button"
                    className={`btn flex-1 ${formData.purpose === p ? 'btn-red' : 'btn-outline'}`}
                    onClick={() => setFormData({ ...formData, purpose: p })}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {p === 'rent' ? 'For Rent' : p === 'lease' ? 'Long Lease' : 'For Sale'}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label className="mp-field-label">Property Title / Headline</label>
              <input 
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Modern 50,000 Sq.Ft. Pre-Engineered Shed near NH-48"
                className="form-control w-full"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label className="mp-field-label">Property Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="form-control w-full"
                >
                  {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="mp-field-label">City / Region</label>
                <select 
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="form-control w-full"
                >
                  {CITIES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="mp-field-label">Locality / Industrial Area</label>
              <input 
                type="text"
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                placeholder="e.g. Sriperumbudur / Bhiwandi / Chakan"
                className="form-control w-full"
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-red" onClick={handleNextStep}>
                <span>Next: Specs & Photos</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Details and Photos */}
        {currentStep === 2 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label className="mp-field-label">Total Space Area (Sq.Ft.) *</label>
                <input 
                  type="number"
                  value={formData.area_sqft}
                  onChange={(e) => setFormData({ ...formData, area_sqft: e.target.value })}
                  placeholder="e.g. 45000"
                  className="form-control w-full"
                  required
                />
              </div>

              <div>
                <label className="mp-field-label">Clear Height</label>
                <input 
                  type="text"
                  value={formData.clear_height}
                  onChange={(e) => setFormData({ ...formData, clear_height: e.target.value })}
                  placeholder="e.g. 36 Ft"
                  className="form-control w-full"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label className="mp-field-label">Number of Docks</label>
                <input 
                  type="number"
                  value={formData.docks}
                  onChange={(e) => setFormData({ ...formData, docks: e.target.value })}
                  placeholder="e.g. 6"
                  className="form-control w-full"
                />
              </div>

              <div>
                <label className="mp-field-label">Power Backup / Substation</label>
                <input 
                  type="text"
                  value={formData.power_backup}
                  onChange={(e) => setFormData({ ...formData, power_backup: e.target.value })}
                  placeholder="e.g. 150 kVA DG"
                  className="form-control w-full"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div style={{ marginBottom: '16px' }}>
              <label className="mp-field-label">Property Photo Link / URL</label>
              <input 
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/warehouse.jpg (or leave empty for verified stock)"
                className="form-control w-full"
              />
            </div>

            {/* Features Checkboxes */}
            <div style={{ marginBottom: '20px' }}>
              <label className="mp-field-label">Infrastructure Highlights</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {availableFeatures.map((feat) => (
                  <label key={feat} className="mp-checkbox-label">
                    <input 
                      type="checkbox"
                      checked={formData.features.includes(feat)}
                      onChange={() => handleFeatureToggle(feat)}
                    />
                    <span>{feat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className="btn btn-outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="button" className="btn btn-red" onClick={handleNextStep}>
                <span>Next: Price & Terms</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Price and Availability */}
        {currentStep === 3 && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label className="mp-field-label">
                  {formData.purpose === 'sale' ? 'Outright Rate (₹ / Sq.Ft.)' : 'Expected Rent (₹ / Sq.Ft. / Month)'} *
                </label>
                <input 
                  type="number"
                  value={formData.price_or_rent_psf}
                  onChange={(e) => setFormData({ ...formData, price_or_rent_psf: e.target.value })}
                  placeholder="e.g. 28"
                  className="form-control w-full"
                  required
                />
              </div>

              <div>
                <label className="mp-field-label">Security Deposit</label>
                <input 
                  type="text"
                  value={formData.deposit}
                  onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                  placeholder="e.g. 6 Months"
                  className="form-control w-full"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label className="mp-field-label">Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-control w-full"
                >
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Build-to-Suit">Build-to-Suit</option>
                  <option value="Under Construction">Under Construction</option>
                </select>
              </div>

              <div>
                <label className="mp-field-label">Availability</label>
                <input 
                  type="text"
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  placeholder="e.g. Immediate / 30 Days"
                  className="form-control w-full"
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="mp-field-label">Description / Special Highlights</label>
              <textarea 
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mention container turning radius, fire NOC, clear title, highway access..."
                className="form-control w-full"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className="btn btn-outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="button" className="btn btn-red" onClick={handleNextStep}>
                <span>Next: Owner Contact</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Contact & OTP Verification */}
        {currentStep === 4 && (
          <div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: '#004953' }}>
                <ShieldCheck size={18} />
                <span>Verified Direct Owner Listing</span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                Your contact details will only be shared with verified industrial tenants.
              </p>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label className="mp-field-label">Owner / Company Name *</label>
              <input 
                type="text"
                value={formData.owner_name}
                onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                placeholder="e.g. Rajesh Sharma / ABC Logistics Parks"
                className="form-control w-full"
                required
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label className="mp-field-label">Mobile Number *</label>
              <input 
                type="tel"
                value={formData.owner_phone}
                onChange={(e) => setFormData({ ...formData, owner_phone: e.target.value })}
                placeholder="10-digit phone number"
                className="form-control w-full"
                maxLength="10"
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="mp-field-label">Verification OTP (Demo Code: 1234)</label>
              <input 
                type="text"
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                placeholder="Enter 4-digit code"
                className="form-control w-full"
                maxLength="4"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" className="btn btn-outline" onClick={() => setCurrentStep(3)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button 
                type="button" 
                className="btn btn-red"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                style={{ fontWeight: 700 }}
              >
                {isSubmitting ? 'Submitting Property...' : 'Submit for Free Listing'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
