import React from 'react';

export default function TrustedBrands() {
  return (
    <section className="trusted-brands-section" id="trusted-brands">
      <div className="container">
        <h2 className="trusted-brands-title">Brands who trust us</h2>

        <div className="trusted-brands-row">
          {/* 1. Anna University Logo */}
          <div className="brand-logo-item" title="Anna University">
            <div className="brand-logo-wrapper">
              <svg viewBox="0 0 140 140" className="brand-svg-logo" aria-label="Anna University">
                {/* Gear Outer Ring */}
                <g fill="none" stroke="#991b1b" strokeWidth="3.5">
                  {/* Gear teeth */}
                  <path d="M 60,10 L 80,10 L 82,22 L 95,26 L 105,18 L 118,31 L 110,41 L 114,54 L 126,56 L 126,76 L 114,78 L 110,91 L 118,101 L 105,114 L 95,106 L 82,110 L 80,122 L 60,122 L 58,110 L 45,106 L 35,114 L 22,101 L 30,91 L 26,78 L 14,76 L 14,56 L 26,54 L 30,41 L 22,31 L 35,18 L 45,26 L 58,22 Z" />
                  <circle cx="70" cy="66" r="44" />
                </g>
                {/* Text along top curve */}
                <path id="annaCurve" d="M 32,66 A 38,38 0 0,1 108,66" fill="none" />
                <text fill="#991b1b" fontSize="9.5" fontWeight="800" letterSpacing="0.8">
                  <textPath href="#annaCurve" startOffset="50%" textAnchor="middle">
                    ANNA UNIVERSITY
                  </textPath>
                </text>
                {/* Factory silhouette / chimney */}
                <path d="M 38,70 L 102,70 L 102,60 L 92,60 L 86,52 L 86,60 L 76,52 L 76,60 L 66,52 L 66,60 L 52,60 L 48,46 L 42,46 L 38,70 Z" fill="#991b1b" />
                {/* Open book */}
                <path d="M 52,86 C 60,82 66,84 70,88 C 74,84 80,82 88,86 L 88,74 C 80,70 74,72 70,76 C 66,72 60,70 52,74 Z" fill="none" stroke="#991b1b" strokeWidth="2.5" strokeLinejoin="round" />
                <line x1="70" y1="76" x2="70" y2="88" stroke="#991b1b" strokeWidth="2.5" />
                {/* Bottom banner */}
                <rect x="24" y="100" width="92" height="15" fill="#ffffff" stroke="#991b1b" strokeWidth="2.5" />
                <text x="70" y="111" fill="#991b1b" fontSize="6.2" fontWeight="900" textAnchor="middle" letterSpacing="0.3">
                  PROGRESS THROUGH KNOWLEDGE
                </text>
              </svg>
            </div>
          </div>

          {/* 2. IIT Bombay Logo */}
          <div className="brand-logo-item" title="Indian Institute of Technology Bombay">
            <div className="brand-logo-wrapper">
              <svg viewBox="0 0 140 140" className="brand-svg-logo" aria-label="IIT Bombay">
                {/* Gear ring */}
                <g fill="none" stroke="#0066b2" strokeWidth="3.5">
                  <path d="M 60,10 L 80,10 L 82,22 L 95,26 L 105,18 L 118,31 L 110,41 L 114,54 L 126,56 L 126,76 L 114,78 L 110,91 L 118,101 L 105,114 L 95,106 L 82,110 L 80,122 L 60,122 L 58,110 L 45,106 L 35,114 L 22,101 L 30,91 L 26,78 L 14,76 L 14,56 L 26,54 L 30,41 L 22,31 L 35,18 L 45,26 L 58,22 Z" />
                  <circle cx="70" cy="66" r="44" />
                </g>
                {/* Curved English text */}
                <path id="iitCurve" d="M 33,66 A 37,37 0 0,1 107,66" fill="none" />
                <text fill="#0066b2" fontSize="6.5" fontWeight="700">
                  <textPath href="#iitCurve" startOffset="50%" textAnchor="middle">
                    INDIAN INSTITUTE OF TECHNOLOGY BOMBAY
                  </textPath>
                </text>
                {/* Lotus Motif */}
                <g fill="none" stroke="#0066b2" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  {/* Center petal */}
                  <path d="M 70,38 C 65,48 65,58 70,68 C 75,58 75,48 70,38 Z" fill="#e1f0fa" />
                  {/* Left petal 1 */}
                  <path d="M 70,68 C 60,60 52,50 56,42 C 63,46 67,56 70,68 Z" fill="#e1f0fa" />
                  {/* Right petal 1 */}
                  <path d="M 70,68 C 80,60 88,50 84,42 C 77,46 73,56 70,68 Z" fill="#e1f0fa" />
                  {/* Outer petals */}
                  <path d="M 70,68 C 54,64 45,58 48,50 C 56,54 64,62 70,68 Z" fill="#e1f0fa" />
                  <path d="M 70,68 C 86,64 95,58 92,50 C 84,54 76,62 70,68 Z" fill="#e1f0fa" />
                  {/* Lotus base */}
                  <path d="M 50,71 C 60,67 80,67 90,71 L 86,76 C 76,73 64,73 54,76 Z" fill="#0066b2" />
                </g>
                {/* Open book at base */}
                <path d="M 52,86 C 60,82 66,84 70,88 C 74,84 80,82 88,86 L 88,77 C 80,73 74,75 70,79 C 66,75 60,73 52,77 Z" fill="none" stroke="#0066b2" strokeWidth="2.2" strokeLinejoin="round" />
                <line x1="70" y1="79" x2="70" y2="88" stroke="#0066b2" strokeWidth="2.2" />
                {/* Ribbon Motto Banner */}
                <path d="M 36,99 Q 70,95 104,99 L 98,110 Q 70,105 42,110 Z" fill="#ffffff" stroke="#0066b2" strokeWidth="2" />
                <text x="70" y="106" fill="#0066b2" fontSize="7" fontWeight="800" textAnchor="middle">
                  ज्ञानम् परमम् ध्येयम्
                </text>
              </svg>
            </div>
          </div>

          {/* 3. IndianOil Logo */}
          <div className="brand-logo-item" title="IndianOil">
            <div className="brand-logo-wrapper">
              <svg viewBox="0 0 140 140" className="brand-svg-logo" aria-label="IndianOil">
                {/* Outer Circular Ring with thick border */}
                <circle cx="70" cy="54" r="42" fill="#f37021" stroke="#002b49" strokeWidth="4" />
                {/* Dark Blue Center Stripe */}
                <rect x="29" y="40" width="82" height="28" fill="#002b49" />
                {/* Hindi Text in Saffron */}
                <text x="70" y="59" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
                  इंडियनऑयल
                </text>
                {/* IndianOil Wordmark below */}
                <text x="70" y="116" fill="#002b49" fontSize="18" fontWeight="900" textAnchor="middle" letterSpacing="-0.3" fontFamily="sans-serif">
                  IndianOil
                </text>
              </svg>
            </div>
          </div>

          {/* 4. Royal Enfield Logo */}
          <div className="brand-logo-item" title="Royal Enfield">
            <div className="brand-logo-wrapper">
              <svg viewBox="0 0 180 100" className="brand-svg-logo wide" aria-label="Royal Enfield">
                {/* Classic Royal Enfield Typography */}
                <text x="90" y="48" fill="#d9241b" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" letterSpacing="1.2">
                  ROYAL
                </text>
                <text x="90" y="78" fill="#d9241b" fontSize="23" fontWeight="900" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" letterSpacing="1.5">
                  ENFIELD
                </text>
              </svg>
            </div>
          </div>

          {/* 5. ISUZU Logo */}
          <div className="brand-logo-item" title="ISUZU">
            <div className="brand-logo-wrapper">
              <svg viewBox="0 0 180 80" className="brand-svg-logo wide" aria-label="ISUZU">
                <text 
                  x="90" 
                  y="54" 
                  fill="#ea1d2d" 
                  fontSize="36" 
                  fontWeight="900" 
                  textAnchor="middle" 
                  fontFamily="'Arial Black', Impact, sans-serif" 
                  letterSpacing="4"
                  style={{ transform: 'scale(1, 0.95)', transformOrigin: 'center' }}
                >
                  ISUZU
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .trusted-brands-section {
          background-color: #ffffff;
          padding: 38px 0 44px;
          border-bottom: 1px solid var(--border-color);
        }

        .trusted-brands-title {
          text-align: center;
          font-size: 1.55rem;
          font-weight: 500;
          color: #2b3545;
          margin-bottom: 32px;
          letter-spacing: -0.01em;
          font-family: var(--font-family);
        }

        .trusted-brands-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 48px;
          row-gap: 28px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .brand-logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease, filter 0.25s ease;
          cursor: pointer;
        }

        .brand-logo-item:hover {
          transform: translateY(-3px) scale(1.03);
        }

        .brand-logo-wrapper {
          height: 84px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-svg-logo {
          height: 100%;
          width: auto;
          max-width: 140px;
          max-height: 84px;
          object-fit: contain;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.04));
        }

        .brand-svg-logo.wide {
          max-width: 160px;
        }

        @media (max-width: 768px) {
          .trusted-brands-section {
            padding: 28px 0 34px;
          }

          .trusted-brands-title {
            font-size: 1.3rem;
            margin-bottom: 22px;
          }

          .trusted-brands-row {
            gap: 28px;
            row-gap: 20px;
          }

          .brand-logo-wrapper {
            height: 64px;
          }

          .brand-svg-logo {
            max-height: 64px;
            max-width: 110px;
          }

          .brand-svg-logo.wide {
            max-width: 125px;
          }
        }
      `}</style>
    </section>
  );
}
