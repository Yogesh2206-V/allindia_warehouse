import React, { useState } from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Share2, 
  Heart, 
  Layers, 
  Zap, 
  Truck, 
  Lock, 
  Calendar,
  Building,
  Maximize2
} from 'lucide-react';

export default function MarketplacePropertyDetail({ 
  property, 
  allProperties = [], 
  onBackToList, 
  onUnlockContact, 
  onSelectProperty,
  isSaved,
  onToggleSave 
}) {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!property) return null;

  const {
    id,
    title,
    type,
    purpose,
    city,
    locality,
    state,
    area_sqft,
    price_or_rent_psf,
    deposit,
    status,
    availability,
    clear_height,
    docks,
    power_backup,
    flooring,
    fire_safety,
    features = [],
    images = [],
    description,
    owner_name,
    owner_phone
  } = property;

  const defaultImgs = [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80"
  ];
  const gallery = images && images.length > 0 ? images : defaultImgs;

  const isSale = purpose === 'sale';
  const priceDisplay = isSale 
    ? `₹${price_or_rent_psf?.toLocaleString('en-IN') || '1,800'} / sq.ft` 
    : `₹${price_or_rent_psf || '25'} / sq.ft / mo`;

  const totalMonthlyApprox = !isSale && area_sqft && price_or_rent_psf 
    ? `₹${(area_sqft * price_or_rent_psf).toLocaleString('en-IN')} / month` 
    : null;

  // Similar properties from same city or type
  const similar = allProperties
    .filter(p => p.id !== id && (p.city === city || p.type === type))
    .slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this warehouse in ${locality}, ${city} on All India Warehouse`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  return (
    <div className="marketplace-container" style={{ paddingBottom: '60px' }}>
      {/* Top Breadcrumb / Back Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0 16px' }}>
        <button 
          type="button" 
          onClick={onBackToList}
          className="btn btn-outline btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Listings</span>
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="button" 
            className={`mp-btn-save ${isSaved ? 'saved' : ''}`}
            onClick={() => onToggleSave && onToggleSave(id)}
          >
            <Heart size={15} fill={isSaved ? "#e11d48" : "none"} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>

          <button 
            type="button" 
            className="btn btn-outline btn-sm"
            onClick={handleShare}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Share2 size={15} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Details & Right Sticky Contact Box */}
      <div className="mp-detail-container">
        {/* Left Section */}
        <div>
          {/* Header Title */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="mp-status-pill approved">
                {purpose === 'rent' ? 'For Rent' : purpose === 'lease' ? 'Long-Term Lease' : 'For Sale'}
              </span>
              <span className="mp-status-pill" style={{ background: '#f1f5f9', color: '#334155' }}>
                {type}
              </span>
              <span className="mp-status-pill" style={{ background: '#004953', color: '#ffffff' }}>
                Verified by our team
              </span>
            </div>

            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f2744', margin: '4px 0 8px', lineHeight: 1.25 }}>
              {title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.92rem' }}>
              <MapPin size={16} className="text-red" />
              <span>{locality}, {city}, {state} (Direct Industrial Zone)</span>
            </div>
          </div>

          {/* Photo Gallery */}
          <div style={{ marginBottom: '24px' }}>
            <img 
              src={gallery[selectedImgIdx]} 
              alt={title} 
              className="mp-gallery-main" 
            />
            {gallery.length > 1 && (
              <div className="mp-gallery-thumbs">
                {gallery.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    className={`mp-gallery-thumb ${selectedImgIdx === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImgIdx(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Key Facts & Specifications Table */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f2744', margin: '0 0 14px' }}>
              Key Property Specifications & Facts
            </h3>
            <table className="mp-facts-table">
              <tbody>
                <tr>
                  <td className="mp-fact-key">Total Space Area</td>
                  <td className="mp-fact-val">{area_sqft?.toLocaleString('en-IN')} Sq.Ft.</td>
                </tr>
                <tr>
                  <td className="mp-fact-key">{isSale ? 'Outright Rate' : 'Base Rent / PSF'}</td>
                  <td className="mp-fact-val">{priceDisplay}</td>
                </tr>
                {!isSale && totalMonthlyApprox && (
                  <tr>
                    <td className="mp-fact-key">Estimated Monthly Rental</td>
                    <td className="mp-fact-val" style={{ color: '#e11d48' }}>{totalMonthlyApprox}</td>
                  </tr>
                )}
                <tr>
                  <td className="mp-fact-key">Security Deposit</td>
                  <td className="mp-fact-val">{deposit || 'Negotiable'}</td>
                </tr>
                <tr>
                  <td className="mp-fact-key">Clear Height</td>
                  <td className="mp-fact-val">{clear_height || 'Standard Height (30+ Ft)'}</td>
                </tr>
                <tr>
                  <td className="mp-fact-key">Loading Dock Bays</td>
                  <td className="mp-fact-val">{docks > 0 ? `${docks} Dedicated Docks with Levellers` : 'Ground Level Entry / Ramp'}</td>
                </tr>
                <tr>
                  <td className="mp-fact-key">Power & Transformer</td>
                  <td className="mp-fact-val">{power_backup || '3-Phase Heavy Industrial Supply'}</td>
                </tr>
                <tr>
                  <td className="mp-fact-key">Flooring Specification</td>
                  <td className="mp-fact-val">{flooring || 'Heavy Duty Industrial Laser Screed (5+ Ton/m²)'}</td>
                </tr>
                <tr>
                  <td className="mp-fact-key">Fire Safety Compliance</td>
                  <td className="mp-fact-val">{fire_safety || 'Fire Hydrant, Smoke Sensors & NOC Ready'}</td>
                </tr>
                <tr>
                  <td className="mp-fact-key">Availability Status</td>
                  <td className="mp-fact-val" style={{ color: '#004953' }}>{status} ({availability || 'Immediate'})</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Description */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f2744', margin: '0 0 10px' }}>
              Detailed Description
            </h3>
            <p style={{ color: '#334155', lineHeight: 1.6, fontSize: '0.94rem' }}>
              {description || 'Direct industrial property suitable for warehousing, 3PL logistics, FMCG storage, e-commerce fulfilment, and light manufacturing with hassle-free container entry.'}
            </p>
          </div>

          {/* Infrastructure & Amenities Badges */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f2744', margin: '0 0 12px' }}>
              Infrastructure & Amenities
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
              {features.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span style={{ fontWeight: 600, color: '#334155' }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Connectivity Map Placeholder */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f2744', margin: '0 0 10px' }}>
              Strategic Location & Highway Connectivity
            </h3>
            <div style={{ background: '#f1f5f9', borderRadius: '8px', padding: '20px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
              <MapPin size={28} className="text-red" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontWeight: 700, color: '#0f2744' }}>{locality}, {city} Hub</div>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0' }}>
                Connected to National Highway with 40-foot articulated truck turnarounds.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sticky Contact Sidebar */}
        <div>
          <div className="mp-sticky-contact-box">
            <div style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
              Expected Price / Rent
            </div>
            <div className="mp-price-highlight">{priceDisplay}</div>
            {totalMonthlyApprox && (
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
                Approx: {totalMonthlyApprox}
              </div>
            )}

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', marginBottom: '18px' }}>
              <div style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700 }}>Listing Verification</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#004953', fontWeight: 600, marginTop: '4px' }}>
                <ShieldCheck size={16} />
                <span>Verified by our team</span>
              </div>
            </div>

            <button 
              type="button" 
              className="btn btn-red w-full"
              style={{ padding: '12px', fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px' }}
              onClick={() => onUnlockContact && onUnlockContact(property)}
            >
              <Phone size={16} />
              <span>Contact / Get Callback</span>
            </button>

            <a 
              href={`https://wa.me/919884012341?text=Hello%20All%20India%20Warehouse%2C%20I%20am%20interested%20in%20property%3A%20${encodeURIComponent(title)}%20(${locality}%2C%20${city})`}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline w-full"
              style={{ padding: '10px', fontSize: '0.9rem', fontWeight: 600, borderColor: '#10b981', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <MessageSquare size={16} />
              <span>Chat on WhatsApp</span>
            </a>

            <div style={{ marginTop: '14px', textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
              ⚡ 1-hour callback guarantee from our industrial desk
            </div>
          </div>

          {/* Similar Properties Box */}
          {similar.length > 0 && (
            <div style={{ marginTop: '24px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem', color: '#0f2744', fontWeight: 700 }}>
                Similar Spaces in {city}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {similar.map(sim => (
                  <div 
                    key={sim.id}
                    style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', cursor: 'pointer', border: '1px solid #f1f5f9' }}
                    onClick={() => onSelectProperty && onSelectProperty(sim)}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>{sim.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                      {sim.area_sqft?.toLocaleString('en-IN')} sq.ft • ₹{sim.price_or_rent_psf}/sqft
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
