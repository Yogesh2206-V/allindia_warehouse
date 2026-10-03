# All India Warehouse — NoBroker-Style Marketplace Feature

This module adds a complete NoBroker-inspired warehouse, industrial shed, cold storage, and commercial land marketplace to **allindiawarehouse.in** without deleting or altering any existing core features.

---

## 🌟 Key Features Added

1. **Search Bar with Smart Tabs & Auto-suggest (`/marketplace`)**:
   * **Tabs**: Rent Warehouse | Long-Term Lease | Buy / Land Sale
   * **Fields**: City/State -> Locality/Corridor -> Property Type -> Min Area (Sq.Ft.) -> [Search]
   * **Quick Hub Chips**: Chennai, Mumbai, Delhi NCR, Bengaluru, Hyderabad, Pune, Ahmedabad.

2. **Verified Listings Page (`#/properties`)**:
   * **Filters Sidebar & Mobile Sheet**: City, Property Type, Availability Status (Ready-to-move vs Build-to-Suit), Area Range, Rent/Price Range, Infrastructure checkboxes (Loading docks, Fire safety, Power backup, Cold storage, etc.).
   * **Sort**: Newest, Price (Low to High / High to Low), Area (Small to Large / Large to Small).
   * **Property Cards**: High-res photo, Title, Verified badge ("Verified by our team"), Area (Sq.Ft.), Rate/psf, Specs, [Contact Owner], and [Save Shortlist].
   * Pagination ("Load More") and friendly empty state.

3. **Property Detail Page (`#/property/:id`)**:
   * Photo gallery with interactive thumbnails.
   * Comprehensive specifications table (Area, Rate, Estimated monthly rent, Security deposit, Clear height, Docks, Power, Flooring, Fire compliance, Status).
   * Detailed descriptions, infrastructure badges, strategic connectivity map preview.
   * Sticky contact box with direct callback request and WhatsApp chat.
   * Similar property recommendations in the same city.

4. **Lead Unlock Flow with OTP Verification**:
   * Direct owner contact unlock modal (Name + Mobile number).
   * 4-digit verification code with 30s resend timer (Demo code: `1234`).
   * Saves lead records in database and dispatches notifications to `care@allindiawarehouse.in`.
   * Unlocks owner contact with instant 1-hour callback guarantee.

5. **Post Your Property (Free for Owners) (`#/post-property`)**:
   * 4-step wizard with real-time progress bar:
     1. Basic Info (Purpose, Title, Type, City, Locality)
     2. Specs & Photos (Area, Clear height, Docks, Power, Photo URL, Amenities)
     3. Price & Terms (Rate psf, Deposit, Status, Description)
     4. Contact & OTP (Owner details & verification)
   * Submissions go to "Pending Review" status for admin approval.

6. **Comprehensive Industrial Services Section**:
   * Build-to-Suit (BTS) Warehouses
   * Industrial Real Estate Consultancy
   * Forklifts & Material Handling Equipment Fleet
   * Lease Agreement & Legal Drafting

7. **Trust Strip & 3-Step How It Works**:
   * Metrics: 100+ Verified Spaces | 10+ Major Corridors | 2.5M+ Sq.Ft. Network | 100% Free Owner Listing
   * 3-Step Process: Search & Filter -> Contact Directly -> Site Visit & Lease
   * Interactive FAQ block with plain-language answers.

8. **Password-Protected Admin Panel (`#/admin`)**:
   * Passkey: `admin123` or `aiw@2026`
   * Manage properties (Approve owner listings, Delete).
   * View all customer leads with timestamps and notification status.
   * **Export Leads to CSV** button for CRM sync.

---

## 📁 File Structure (Completely Isolated in `/marketplace`)

```
src/marketplace/
├── MarketplaceApp.jsx                # Main Marketplace router & shell
├── marketplace.css                  # Scoped styling matching AIW theme
├── components/
│   ├── MarketplaceSearchBar.jsx      # Top Search Bar
│   ├── MarketplaceListingPage.jsx    # Listings layout with drawer & sort
│   ├── MarketplaceFilterDrawer.jsx   # Filter sidebar and mobile sheet
│   ├── MarketplacePropertyCard.jsx   # Verified property card
│   ├── MarketplacePropertyDetail.jsx # Full detail view with specs & sticky box
│   ├── MarketplaceLeadUnlockModal.jsx# OTP lead unlock modal
│   ├── MarketplacePostPropertyWizard.jsx # 4-step Post Property wizard
│   ├── MarketplaceServicesSection.jsx# 4 service cards
│   ├── MarketplaceTrustAndHowItWorks.jsx # Trust strip, 3 steps, FAQs
│   └── MarketplaceAdminPanel.jsx     # Admin panel & CSV export
├── data/
│   └── sampleMarketplaceProperties.js# 10 realistic seed properties across India
└── services/
    └── marketplaceApi.js             # API client with hybrid offline fallback

server/
├── models/
│   ├── MarketplaceProperty.js
│   └── MarketplaceLead.js
└── routes/
    └── marketplaceRoutes.js
```

---

## 🚀 How to Run

```bash
# Start Vite frontend and Express server concurrently:
npm run dev

# Frontend URL: http://localhost:5173/
# Backend API:  http://localhost:5000/
```

Direct URLs:
* Marketplace Listings: [http://localhost:5173/#/properties](http://localhost:5173/#/properties)
* Post Property: [http://localhost:5173/#/post-property](http://localhost:5173/#/post-property)
* Admin Panel: [http://localhost:5173/#/admin](http://localhost:5173/#/admin)

---

## 🗑️ How to Remove the Marketplace Folder in One Step

If you ever wish to completely remove the marketplace feature:
1. Delete the folder `src/marketplace/` and backend files `server/routes/marketplaceRoutes.js`, `server/models/MarketplaceProperty.js`, `server/models/MarketplaceLead.js`.
2. Remove the 2 lines in `server/server.js` (`import marketplaceRoutes...` and `app.use('/api/marketplace'...)`).
3. Remove the `import MarketplaceApp...` line in `src/App.jsx`.
