import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_ITEMS } from '../data/warehouseData';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="faq-section section-padding" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <HelpCircle size={14} /> Clear Answers & Advisory
          </span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about Grade-A warehouse specifications, leasing procedures, turnkey execution, and compliance.
          </p>
        </div>

        <div className="faq-accordion-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIdx === index;
            return (
              <div key={index} className={`faq-card ${isOpen ? 'open' : ''}`}>
                <button 
                  className="faq-question-btn"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-icon-wrap">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-section {
          background-color: var(--light-bg);
        }

        .faq-accordion-list {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .faq-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: var(--transition);
        }

        .faq-card.open {
          border-color: var(--secondary);
          box-shadow: var(--shadow-md);
        }

        .faq-question-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          text-align: left;
          background: transparent;
        }

        .faq-q-text {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--primary);
          padding-right: 16px;
        }

        .faq-icon-wrap {
          color: var(--secondary);
          flex-shrink: 0;
        }

        .faq-answer-body {
          padding: 0 24px 22px;
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
        }
      `}</style>
    </section>
  );
}
