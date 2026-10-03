import React from 'react';
import { 
  MapPin, 
  Maximize2, 
  CheckCircle2, 
  Heart, 
  PhoneCall, 
  ShieldCheck, 
  Truck, 
  Layers, 
  Zap 
} from 'lucide-react';

export default function MarketplacePropertyCard({ 
  property, 
  onSelectProperty, 
  onUnlockContact, 
  isSaved = false, 
  onToggleSave 
}) {
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
    clear_height,
    docks,
    features = [],
    images = [],
    verified = true
  } = property;

  const defaultImg = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80";
  const thumbnail = images && images.length > 0 ? images[0] : defaultImg;

  // Format Price display
  const isSale = purpose === 'sale';
  const priceDisplay = isSale 
    ? `₹${price_or_rent_psf?.toLocaleString('en-IN') || '1,800'} / sq.ft` 
    : `₹${price_or_rent_psf || '25'} / sq.ft / mo`;

  return (
    <article className="mp-property-card">
      {/* Thumbnail + Badges */}
      <div className="mp-card-thumb-wrap">
        <img 
          src={thumbnail} 
          alt={title} 
          className="mp-card-thumb" 
          loading="lazy"
          onClick={() => onSelectProperty && onSelectProperty(property)}
        />
        {verified && (
          <div className="mp-badge-verified">
            <ShieldCheck size={12} />
            <span>Verified by our team</span>
          </div>
        )}
        <div className="mp-badge-purpose">
          {purpose === 'rent' ? 'For Rent' : purpose === 'lease' ? 'Long Lease' : 'For Sale'}
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="mp-card-content">
        <div>
          <h3 
            className="mp-card-title"
            onClick={() => onSelectProperty && onSelectProperty(property)}
          >
            {title}
          </h3>
          <div className="mp-card-location">
            <MapPin size={14} className="text-red" />
            <span>{locality}, {city} ({state})</span>
          </div>

          {/* Specs Row */}
          <div className="mp-card-specs-row">
            <div className="mp-spec-item">
              <span className="mp-spec-label">Area (Sq.Ft.)</span>
              <span className="mp-spec-val">{area_sqft?.toLocaleString('en-IN')}</span>
            </div>
            <div className="mp-spec-item">
              <span className="mp-spec-label">{isSale ? 'Outright Price' : 'Rent / Sq.Ft.'}</span>
              <span className="mp-spec-val">{priceDisplay}</span>
            </div>
            {clear_height && (
              <div className="mp-spec-item">
                <span className="mp-spec-label">Clear Height</span>
                <span className="mp-spec-val">{clear_height}</span>
              </div>
            )}
            <div className="mp-spec-item">
              <span className="mp-spec-label">Status</span>
              <span className="mp-spec-val" style={{ color: '#004953' }}>{status || 'Ready'}</span>
            </div>
          </div>

          {/* Key Feature Tags */}
          <div className="mp-card-tags">
            <span className="mp-card-tag font-semibold text-primary">{type}</span>
            {docks > 0 && <span className="mp-card-tag">{docks} Loading Docks</span>}
            {features.slice(0, 3).map((feat, idx) => (
              <span key={idx} className="mp-card-tag">{feat}</span>
            ))}
          </div>
        </div>

        {/* Footer Actions: Contact & Save */}
        <div className="mp-card-footer">
          <button 
            type="button" 
            className={`mp-btn-save ${isSaved ? 'saved' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave && onToggleSave(id);
            }}
            title={isSaved ? "Saved in Shortlist" : "Save Property"}
          >
            <Heart size={15} fill={isSaved ? "#e11d48" : "none"} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              type="button" 
              className="btn btn-outline btn-sm"
              onClick={() => onSelectProperty && onSelectProperty(property)}
            >
              View Specs
            </button>
            <button 
              type="button" 
              className="mp-btn-contact"
              onClick={(e) => {
                e.stopPropagation();
                onUnlockContact && onUnlockContact(property);
              }}
            >
              <PhoneCall size={14} />
              <span>Contact Owner</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
