import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Phone, User, Lock, ArrowRight, Clock, Building2 } from 'lucide-react';
import { marketplaceApi } from '../services/marketplaceApi';

export default function MarketplaceLeadUnlockModal({ 
  isOpen, 
  property, 
  onClose, 
  onSuccess 
}) {
  const [step, setStep] = useState('input'); // 'input' | 'otp' | 'success'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen || !property) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setTimer(30);
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length < 4) {
      setErrorMsg('Please enter the 4-digit code (Use default 1234)');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await marketplaceApi.submitLead({
        name,
        phone,
        property_id: property.id || property._id,
        property_title: property.title,
        property_city: property.city
      });

      setIsSubmitting(false);
      setStep('success');
      if (onSuccess) onSuccess();
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('Failed to verify. Please try again.');
    }
  };

  return (
    <div className="mp-modal-overlay" onClick={onClose}>
      <div className="mp-modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Close dialog"
        >
          <X size={20} color="#64748b" />
        </button>

        {/* STEP 1: Enter Name & Mobile */}
        {step === 'input' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldCheck size={22} className="text-emerald" />
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f2744', fontWeight: 800 }}>
                Direct Owner Contact
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
              Unlock direct verified owner contact for: <strong style={{ color: '#0f172a' }}>{property.title}</strong>
            </p>

            {errorMsg && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '14px' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSendOtp}>
              <div style={{ marginBottom: '14px' }}>
                <label className="mp-field-label">Your Name</label>
                <div className="mp-input-wrapper">
                  <User size={16} className="mp-input-icon" />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name / company"
                    className="mp-input-control"
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label className="mp-field-label">Mobile Number</label>
                <div className="mp-input-wrapper">
                  <Phone size={16} className="mp-input-icon" />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="mp-input-control"
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-red w-full"
                disabled={isSubmitting}
                style={{ padding: '12px', fontWeight: 700 }}
              >
                {isSubmitting ? 'Sending OTP...' : 'Get Contact Details (Instant)'}
              </button>

              <div style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.74rem', color: '#94a3b8' }}>
                🔒 100% Privacy. Zero spam. We connect you directly.
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Verify OTP */}
        {step === 'otp' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fee2e2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Lock size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0f2744' }}>Verify Your Mobile</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '4px' }}>
                Enter the 4-digit OTP sent to <strong>+91 {phone}</strong>
              </p>
              <div style={{ display: 'inline-block', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#475569', marginTop: '4px' }}>
                Demo code: <strong>1234</strong>
              </div>
            </div>

            {errorMsg && (
              <div style={{ background: '#fef2f2', color: '#dc2626', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '14px', textAlign: 'center' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleVerifyOtp}>
              <div className="mp-otp-input-group">
                {[0, 1, 2, 3].map((idx) => (
                  <input 
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength="1"
                    value={otp[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="mp-otp-box"
                  />
                ))}
              </div>

              <button 
                type="submit" 
                className="btn btn-red w-full"
                disabled={isSubmitting}
                style={{ padding: '12px', fontWeight: 700 }}
              >
                {isSubmitting ? 'Verifying...' : 'Confirm & Unlock Contact'}
              </button>

              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b' }}>
                <span>Didn't receive code?</span>
                <button 
                  type="button" 
                  disabled={timer > 0} 
                  onClick={() => setTimer(30)}
                  style={{ background: 'none', border: 'none', color: timer > 0 ? '#94a3b8' : '#e11d48', fontWeight: 600, cursor: timer > 0 ? 'default' : 'pointer' }}
                >
                  {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: Unlocked Contact Details & Confirmation */}
        {step === 'success' && (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <CheckCircle2 size={28} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f2744', fontWeight: 800 }}>
              Contact Details Unlocked!
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#64748b', marginTop: '6px' }}>
              Our dedicated warehouse coordinator has also been notified.
            </p>

            {/* Direct Contact Card */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', margin: '20px 0', textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                Owner / Manager Details
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                {property.owner_name || 'All India Warehouse Verified Listing'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', color: '#004953', fontWeight: 700 }}>
                <Phone size={15} />
                <span>{property.owner_phone || '+91 98840 12341'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', fontSize: '0.82rem', color: '#004953', fontWeight: 600, marginBottom: '20px' }}>
              <Clock size={16} />
              <span>Our team will call you within 1 hour to assist.</span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a 
                href={`tel:${property.owner_phone || '+919884012341'}`}
                className="btn btn-red flex-1"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Phone size={15} /> Call Now
              </a>
              <a 
                href={`https://wa.me/919884012341?text=Hello%2C%20I%20unlocked%20contact%20for%20property%3A%20${encodeURIComponent(property.title)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline flex-1"
                style={{ borderColor: '#10b981', color: '#10b981' }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
