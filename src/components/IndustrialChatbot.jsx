import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  Phone, 
  MapPin, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  Building2, 
  Calculator, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { WAREHOUSE_LISTINGS } from '../data/warehouseData';

export default function IndustrialChatbot({ 
  onOpenRequirement, 
  isOpen: externalIsOpen, 
  onClose: externalOnClose, 
  onOpenChat: externalOnOpenChat 
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Controlled or uncontrolled isOpen
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = (val) => {
    if (val) {
      if (externalOnOpenChat) externalOnOpenChat();
      else setInternalIsOpen(true);
    } else {
      if (externalOnClose) externalOnClose();
      else setInternalIsOpen(false);
    }
  };

  // Automatically hide floating chatbot trigger while scrolling
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! 👋 I'm **Indra**, your AI Warehouse Advisor from **All India Warehouse**.",
      subText: "How can I help you find, calculate, or book verified warehouse space today?",
      quickReplies: [
        "🏢 Warehouses in Chennai",
        "❄️ Cold Storage Facilities",
        "🧮 Calculate Rent Budget",
        "📦 Bangalore Corridors",
        "📞 Speak with Specialist"
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [messages, isOpen]);

  const generateBotReply = (userQuery) => {
    const q = userQuery.toLowerCase();

    // 1. Chennai / Sriperumbudur / Oragadam / Redhills
    if (q.includes('chennai') || q.includes('sriperumbudur') || q.includes('oragadam') || q.includes('redhills')) {
      const chennaiProps = WAREHOUSE_LISTINGS.filter(p => p.city === 'Chennai');
      return {
        text: `We have **${chennaiProps.length || 12}+ Verified Grade-A Warehouses** across Chennai (Sriperumbudur, Oragadam, Redhills) starting at ₹22/sq.ft.`,
        cards: chennaiProps.slice(0, 2),
        quickReplies: ["View Chennai Listings", "🧮 Calculate Monthly Rent", "📞 Call Specialist"]
      };
    }

    // 2. Bangalore / Hoskote / Nelamangala
    if (q.includes('bangalore') || q.includes('hoskote') || q.includes('nelamangala') || q.includes('bengaluru')) {
      const blrProps = WAREHOUSE_LISTINGS.filter(p => p.city === 'Bangalore');
      return {
        text: `We have **${blrProps.length || 8}+ Grade-A Warehouses** in Bangalore (Hoskote, Nelamangala, Bommasandra) with 12m clear height & laser-screed flooring.`,
        cards: blrProps.slice(0, 2),
        quickReplies: ["View Bangalore Listings", "📝 Post Requirement", "📞 Connect on WhatsApp"]
      };
    }

    // 3. Cold Storage / Pharma
    if (q.includes('cold') || q.includes('pharma') || q.includes('temp') || q.includes('frozen')) {
      const coldProps = WAREHOUSE_LISTINGS.filter(p => p.subCategory === 'Cold Storage');
      return {
        text: `Our Multi-Temperature Cold Storages operate between **-25°C to +15°C** with FDA/FSSAI compliance, back-up gensets, and automated racking.`,
        cards: coldProps.slice(0, 2),
        quickReplies: ["Inquire for Cold Storage", "Sri City Pharma Hub", "📞 WhatsApp Specialist"]
      };
    }

    // 4. Rent / Price / Budget Calculation
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('rent') || q.includes('budget') || q.includes('calc')) {
      return {
        text: `📊 **Standard Grade-A Monthly Rental Benchmarks:**\n\n• **Chennai (Sriperumbudur/Oragadam):** ₹22 - ₹26 / sq.ft\n• **Sri City SEZ & DTA:** ₹20 - ₹24 / sq.ft\n• **Bangalore (Hoskote/Nelamangala):** ₹24 - ₹30 / sq.ft\n• **Pune (Chakan/Talegaon):** ₹26 - ₹32 / sq.ft\n• **Mumbai (Bhiwandi/Panvel):** ₹28 - ₹35 / sq.ft\n\n*Example:* 20,000 sq.ft in Chennai ≈ **₹4.40 - ₹5.20 Lakhs / month** (0% Brokerage).`,
        quickReplies: ["Open Rent Calculator", "📝 Request Formal Quote", "📞 Call Helpline"]
      };
    }

    // 5. Contact / Phone / Visit / Specialist
    if (q.includes('contact') || q.includes('call') || q.includes('phone') || q.includes('speak') || q.includes('talk') || q.includes('visit') || q.includes('expert')) {
      return {
        text: `Reach our senior warehouse industrial advisors directly:\n\n📞 **Helpline:** [+91 98840 12341](tel:+919884012341)\n💬 **WhatsApp:** [Chat with Engineer](https://wa.me/919884012341?text=Hello%20AIW,%20I%20need%20assistance)\n✉️ **Direct Email:** care@allindiawarehouse.in\n🏢 **Central HQ:** Guindy / St. Thomas Mount, Chennai`,
        quickReplies: ["📝 Post Custom Requirement", "🔍 View All Listings", "🧮 Use Rent Calculator"]
      };
    }

    // 6. Post / List Warehouse
    if (q.includes('post') || q.includes('list') || q.includes('owner') || q.includes('lease my')) {
      return {
        text: `Are you a warehouse owner looking for verified corporate tenants (Flipkart, Amazon, Mahindra, DHL)?\n\nWe list properties **100% Free** with 0% brokerage!`,
        quickReplies: ["📝 List My Property Now", "📞 Speak to Onboarding Team", "Back to Menu"]
      };
    }

    // Default fallback
    return {
      text: `Got it! I understand you're inquiring about **"${userQuery}"**.\n\nOur industrial network has over **15 Million+ sq.ft** under direct owner management across 28+ logistics hubs. How would you prefer to proceed?`,
      quickReplies: [
        "🔍 Search Available Warehouses",
        "🧮 Use Rent Calculator",
        "📝 Post Custom Requirement",
        "📞 Call +91 98840 12341"
      ]
    };
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotReply(query);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse.text,
        cards: botResponse.cards || null,
        quickReplies: botResponse.quickReplies || null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleQuickReplyClick = (replyText) => {
    if (replyText.includes("Post Custom Requirement") || replyText.includes("Submit Requirement") || replyText.includes("Request Formal Quote") || replyText.includes("Inquire for Cold Storage") || replyText.includes("List My Property")) {
      if (onOpenRequirement) onOpenRequirement(replyText.includes("List") ? 'post' : 'need');
      handleSendMessage(replyText);
      return;
    }

    if (replyText.includes("Calculator") || replyText.includes("Calculate Monthly Rent") || replyText.includes("Open Rent Calculator")) {
      const el = document.getElementById('calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      return;
    }

    if (replyText.includes("View") || replyText.includes("Search Available Warehouses") || replyText.includes("Listings")) {
      const el = document.getElementById('properties');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      return;
    }

    handleSendMessage(replyText);
  };

  const suggestedPrompts = [
    "Chennai rates",
    "Cold storage",
    "Bangalore Hoskote",
    "20k sq.ft rent",
    "Direct owner connect"
  ];

  return (
    <>
      {/* Floating Chat Launcher Button */}
      {!isOpen && (
        <div className={`chatbot-floating-launcher ${isScrolling ? 'is-scrolling-hidden' : ''}`}>
          <button 
            type="button"
            className="chatbot-launcher-pill"
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Warehouse Assistant"
          >
            <div className="bot-launcher-avatar">
              <Bot size={22} />
              <span className="bot-online-dot"></span>
            </div>
            <div className="bot-launcher-info">
              <span className="bot-launcher-title">AI Warehouse Advisor</span>
              <span className="bot-launcher-sub">Instant answers & rates</span>
            </div>
            {unreadCount > 0 && (
              <span className="bot-launcher-badge">{unreadCount}</span>
            )}
          </button>
        </div>
      )}

      {/* Modern Responsive Chatbot Overlay / Window */}
      {isOpen && (
        <div className="chatbot-viewport-overlay">
          <div className="chatbot-window-card">
            {/* Header */}
            <div className="chat-modal-header">
              <div className="chat-header-main">
                <div className="header-avatar-circle">
                  <Bot size={22} />
                  <span className="header-online-status"></span>
                </div>
                <div className="header-title-box">
                  <div className="header-name-row">
                    <h3 className="header-name">Indra • AI Advisor</h3>
                    <span className="header-tag">AI Powered</span>
                  </div>
                  <p className="header-subtitle">Direct Warehouses • Real-time Estimates</p>
                </div>
              </div>

              <div className="chat-header-actions">
                <a 
                  href="tel:+919884012341" 
                  className="header-action-btn phone" 
                  title="Call Specialist"
                  aria-label="Call Specialist"
                >
                  <Phone size={16} />
                </a>
                <a 
                  href="https://wa.me/919884012341?text=Hello%20AIW,%20I%20am%20chatting%20with%20Indra%20AI" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-action-btn whatsapp" 
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={16} />
                </a>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)} 
                  className="header-action-btn close" 
                  aria-label="Close Chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Quick Suggestions Strip */}
            <div className="chat-suggestions-bar">
              <span className="suggestion-label"><Sparkles size={12} /> Popular:</span>
              <div className="suggestion-chips-scroll">
                {suggestedPrompts.map((prompt, pIdx) => (
                  <button 
                    key={pIdx} 
                    type="button"
                    className="suggestion-chip-btn"
                    onClick={() => handleSendMessage(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Stream */}
            <div className="chat-conversation-area">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
                  {msg.sender === 'bot' && (
                    <div className="chat-avatar-mini">
                      <Bot size={16} />
                    </div>
                  )}

                  <div className="chat-bubble-wrapper">
                    <div className="chat-bubble">
                      <p className="chat-text-content">{msg.text}</p>
                      {msg.subText && <p className="chat-subtext-content">{msg.subText}</p>}

                      {/* Embedded Property Mini Cards */}
                      {msg.cards && msg.cards.length > 0 && (
                        <div className="chat-embedded-cards">
                          {msg.cards.map((card) => (
                            <div key={card.id} className="chat-embed-card">
                              <img src={card.image} alt={card.title} className="chat-embed-thumb" />
                              <div className="chat-embed-info">
                                <h5 className="chat-embed-title">{card.title}</h5>
                                <p className="chat-embed-location">
                                  <MapPin size={11} className="pin-icon" /> {card.location}
                                </p>
                                <div className="chat-embed-metrics">
                                  <span className="price-tag">₹{card.pricePerSqFt}/sq.ft</span>
                                  <span className="area-tag">{card.areaSqFt.toLocaleString()} sq.ft</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quick Reply Pills */}
                    {msg.quickReplies && msg.quickReplies.length > 0 && (
                      <div className="chat-quick-actions-row">
                        {msg.quickReplies.map((reply, rIdx) => (
                          <button 
                            key={rIdx} 
                            type="button"
                            className="chat-action-pill"
                            onClick={() => handleQuickReplyClick(reply)}
                          >
                            <span>{reply}</span>
                            <ArrowRight size={12} className="pill-arrow" />
                          </button>
                        ))}
                      </div>
                    )}

                    <span className="chat-time-stamp">{msg.timestamp}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chat-bubble-row bot">
                  <div className="chat-avatar-mini">
                    <Bot size={16} />
                  </div>
                  <div className="chat-typing-bubble">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
              className="chat-input-container"
            >
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Ask Indra about rates, sizes, cities..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="chat-text-field"
              />
              <button 
                type="submit" 
                className="chat-send-submit-btn"
                disabled={!inputMessage.trim()}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        /* ===================================================
           1. FLOATING LAUNCHER (DESKTOP & TABLET)
           =================================================== */
        .chatbot-floating-launcher {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9990;
          transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
          opacity: 1;
          transform: translateY(0) scale(1);
          visibility: visible;
        }

        .chatbot-floating-launcher.is-scrolling-hidden {
          opacity: 0 !important;
          transform: translateY(20px) scale(0.92) !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        .chatbot-launcher-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #0f2744 0%, #1a365d 100%);
          color: #ffffff;
          padding: 8px 18px 8px 8px;
          border-radius: var(--radius-full);
          box-shadow: 0 10px 28px rgba(15, 39, 68, 0.35), 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .chatbot-launcher-pill:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 34px rgba(15, 39, 68, 0.45);
          border-color: rgba(255, 255, 255, 0.35);
        }

        .bot-launcher-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--brand-red);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.4);
        }

        .bot-online-dot {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #0f2744;
          box-shadow: 0 0 6px #10b981;
        }

        .bot-launcher-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .bot-launcher-title {
          font-size: 0.9rem;
          font-weight: 700;
          line-height: 1.2;
          color: #ffffff;
        }

        .bot-launcher-sub {
          font-size: 0.72rem;
          color: #94a3b8;
        }

        .bot-launcher-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--brand-red);
          color: #ffffff;
          font-size: 0.7rem;
          font-weight: 800;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        /* ===================================================
           2. CHATBOT WINDOW (DESKTOP)
           =================================================== */
        .chatbot-viewport-overlay {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 99999;
          animation: chatSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .chatbot-window-card {
          width: 400px;
          max-width: 94vw;
          height: 560px;
          max-height: 84vh;
          background: #ffffff;
          border-radius: var(--radius-lg);
          box-shadow: 0 24px 48px -12px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(15, 23, 42, 0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        @keyframes chatSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Header */
        .chat-modal-header {
          background: linear-gradient(135deg, #0f2744 0%, #1e3a5f 100%);
          color: #ffffff;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chat-header-main {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-avatar-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: var(--brand-red);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 3px 10px rgba(225, 29, 72, 0.35);
        }

        .header-online-status {
          position: absolute;
          bottom: 0px;
          right: 0px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #0f2744;
        }

        .header-title-box {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .header-name-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .header-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.2;
        }

        .header-tag {
          font-size: 0.62rem;
          background: rgba(255, 255, 255, 0.18);
          color: #ffffff;
          padding: 2px 6px;
          border-radius: var(--radius-full);
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .header-subtitle {
          font-size: 0.72rem;
          color: #cbd5e1;
          margin: 2px 0 0 0;
        }

        .chat-header-actions {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .header-action-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: var(--transition);
          text-decoration: none;
        }

        .header-action-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
        }

        .header-action-btn.whatsapp:hover {
          background: #25d366;
        }

        .header-action-btn.phone:hover {
          background: #3b82f6;
        }

        /* Quick Suggestions Strip */
        .chat-suggestions-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: #f1f5f9;
          border-bottom: 1px solid var(--border-light);
          overflow: hidden;
          flex-shrink: 0;
        }

        .suggestion-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          white-space: nowrap;
        }

        .suggestion-chips-scroll {
          display: flex;
          align-items: center;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .suggestion-chips-scroll::-webkit-scrollbar {
          display: none;
        }

        .suggestion-chip-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: var(--primary);
          font-size: 0.72rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          white-space: nowrap;
          cursor: pointer;
          transition: var(--transition);
        }

        .suggestion-chip-btn:hover {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
        }

        /* Conversation Body */
        .chat-conversation-area {
          flex: 1;
          padding: 16px 14px;
          overflow-y: auto;
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          gap: 14px;
          -webkit-overflow-scrolling: touch;
        }

        .chat-bubble-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          max-width: 90%;
        }

        .chat-bubble-row.user {
          margin-left: auto;
          flex-direction: row-reverse;
        }

        .chat-avatar-mini {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--primary);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          box-shadow: 0 2px 6px rgba(15, 39, 68, 0.2);
        }

        .chat-bubble-wrapper {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .chat-bubble {
          padding: 12px 14px;
          border-radius: 16px;
          font-size: 0.88rem;
          line-height: 1.45;
          text-align: left;
        }

        .chat-bubble-row.bot .chat-bubble {
          background: #ffffff;
          color: var(--text-main);
          border: 1px solid var(--border-light);
          border-top-left-radius: 3px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .chat-bubble-row.user .chat-bubble {
          background: linear-gradient(135deg, var(--brand-red) 0%, #be123c 100%);
          color: #ffffff;
          border-top-right-radius: 3px;
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.25);
        }

        .chat-text-content {
          margin: 0;
          white-space: pre-line;
        }

        .chat-subtext-content {
          margin: 6px 0 0 0;
          font-size: 0.82rem;
          color: var(--text-sub);
        }

        .chat-time-stamp {
          font-size: 0.65rem;
          color: #94a3b8;
          align-self: flex-start;
          padding: 0 2px;
        }

        .chat-bubble-row.user .chat-time-stamp {
          align-self: flex-end;
        }

        /* Embedded Cards */
        .chat-embedded-cards {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 10px;
        }

        .chat-embed-card {
          display: flex;
          gap: 10px;
          background: #f8fafc;
          border-radius: var(--radius-sm);
          padding: 8px;
          border: 1px solid var(--border-light);
          align-items: center;
        }

        .chat-embed-thumb {
          width: 64px;
          height: 52px;
          object-fit: cover;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .chat-embed-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .chat-embed-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-heading);
          line-height: 1.2;
          margin: 0;
        }

        .chat-embed-location {
          font-size: 0.72rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 3px;
          margin: 3px 0 4px 0;
        }

        .pin-icon {
          color: var(--brand-red);
        }

        .chat-embed-metrics {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
        }

        .price-tag {
          font-weight: 700;
          color: var(--brand-red);
        }

        .area-tag {
          color: var(--text-sub);
        }

        /* Quick Actions Under Bot Messages */
        .chat-quick-actions-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .chat-action-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: var(--primary);
          font-size: 0.78rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .chat-action-pill:hover {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
          transform: translateY(-1px);
        }

        .chat-action-pill .pill-arrow {
          opacity: 0.7;
          transition: transform 0.2s;
        }

        .chat-action-pill:hover .pill-arrow {
          opacity: 1;
          transform: translateX(2px);
        }

        /* Typing Dots */
        .chat-typing-bubble {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 12px 16px;
          border-radius: 16px;
          border-top-left-radius: 3px;
          display: flex;
          gap: 5px;
          align-items: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }

        .typing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #94a3b8;
          animation: chatBounce 1.4s infinite ease-in-out both;
        }

        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes chatBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }

        /* Input Bar */
        .chat-input-container {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          background: #ffffff;
          border-top: 1px solid var(--border-light);
          flex-shrink: 0;
        }

        .chat-text-field {
          flex: 1;
          height: 42px;
          padding: 0 14px;
          border-radius: var(--radius-full);
          border: 1px solid #cbd5e1;
          font-size: 0.88rem;
          outline: none;
          background: #f8fafc;
          transition: var(--transition);
        }

        .chat-text-field:focus {
          border-color: var(--primary);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(15, 39, 68, 0.1);
        }

        .chat-send-submit-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--brand-red);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          transition: var(--transition);
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(225, 29, 72, 0.3);
        }

        .chat-send-submit-btn:hover:not(:disabled) {
          transform: scale(1.06);
          background: #be123c;
        }

        .chat-send-submit-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* ===================================================
           3. MOBILE VIEW OPTIMIZATIONS (PROPER VIEW)
           =================================================== */
        @media (max-width: 768px) {
          /* Completely hide floating chatbot bubble on mobile view */
          .chatbot-floating-launcher {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
          }

          /* Full-Screen Mobile Window with safe area and smooth scroll */
          .chatbot-viewport-overlay {
            position: fixed;
            inset: 0;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100vh;
            height: 100dvh;
            z-index: 100000;
            background: #f8fafc;
            display: flex;
            flex-direction: column;
            animation: mobileChatSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes mobileChatSlideUp {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .chatbot-window-card {
            width: 100%;
            max-width: 100%;
            height: 100%;
            max-height: 100%;
            border-radius: 0;
            box-shadow: none;
            border: none;
          }

          .chat-modal-header {
            padding: 12px 14px;
            padding-top: max(12px, env(safe-area-inset-top));
          }

          .header-avatar-circle {
            width: 36px;
            height: 36px;
          }

          .header-name {
            font-size: 0.92rem;
          }

          .header-subtitle {
            font-size: 0.7rem;
          }

          .header-action-btn {
            width: 36px;
            height: 36px;
          }

          .chat-conversation-area {
            padding: 14px 12px;
            gap: 12px;
          }

          .chat-bubble-row {
            max-width: 92%;
          }

          .chat-bubble {
            padding: 10px 12px;
            font-size: 0.86rem;
          }

          .chat-input-container {
            padding: 10px 12px;
            padding-bottom: max(10px, env(safe-area-inset-bottom));
          }

          .chat-text-field {
            height: 42px;
            font-size: 0.88rem;
          }

          .chat-send-submit-btn {
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </>
  );
}
