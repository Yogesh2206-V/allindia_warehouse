import React from 'react';
import { MessageSquareQuote, Star, Building2, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/warehouseData';

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <MessageSquareQuote size={14} /> Client Trust & Track Record
          </span>
          <h2 className="section-title">Verified Feedback from Industrial Leaders</h2>
          <p className="section-subtitle">
            See how manufacturing giants, automobile OEMs, and 3PL supply chains scaled their warehousing infrastructure with All India Warehouse.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="testimonial-card">
              <div className="test-card-top">
                <div className="test-stars">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} className="star-filled" />
                  ))}
                </div>
                <span className="badge badge-amber">{item.tag}</span>
              </div>

              <p className="test-quote-text">
                "{item.quote}"
              </p>

              <div className="test-author-box">
                <div className="test-avatar-placeholder">
                  {item.author.charAt(0)}
                </div>
                <div className="test-author-meta">
                  <h4 className="test-author-name">{item.author}</h4>
                  <p className="test-author-role">{item.role}</p>
                  <span className="test-author-company">{item.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          background-color: #ffffff;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        @media (max-width: 992px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }

        .testimonial-card {
          background: var(--light-bg);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 30px;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
          position: relative;
        }

        .testimonial-card:hover {
          border-color: var(--secondary);
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }

        .test-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .test-stars {
          display: flex;
          gap: 4px;
        }

        .star-filled {
          fill: var(--accent);
          color: var(--accent);
        }

        .test-quote-text {
          font-size: 0.95rem;
          color: var(--text-main);
          line-height: 1.6;
          font-style: italic;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        .test-author-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
        }

        .test-avatar-placeholder {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--primary);
          color: #ffffff;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }

        .test-author-name {
          font-size: 0.98rem;
          color: var(--primary);
          margin-bottom: 2px;
        }

        .test-author-role {
          font-size: 0.8rem;
          color: var(--secondary);
          font-weight: 600;
        }

        .test-author-company {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
