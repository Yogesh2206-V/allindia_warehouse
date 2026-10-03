// Seed sample data for NoBroker-style All India Warehouse Marketplace
// Realistic warehouse, cold storage, industrial sheds, commercial land, and office spaces

export const SAMPLE_MARKETPLACE_PROPERTIES = [
  {
    id: "aiw-prop-101",
    title: "Grade-A Pre-Engineered Warehouse with 8 Docks",
    type: "Warehouse",
    purpose: "rent",
    city: "Chennai",
    locality: "Sriperumbudur",
    state: "Tamil Nadu",
    area_sqft: 45000,
    price_or_rent_psf: 28, // ₹28/sq ft / month
    deposit: "6 Months",
    status: "Ready to Move",
    availability: "Immediate",
    clear_height: "36 Ft",
    docks: 8,
    power_backup: "100 kVA Dedicated",
    flooring: "FM2 Grade Laser Screed (5 Ton/m²)",
    fire_safety: "NFPA compliant ESFR Sprinklers + Fire Hydrant",
    features: [
      "Loading Docks",
      "Fire Safety",
      "Power Backup",
      "24x7 Security",
      "Truck Access",
      "Rainwater Harvesting",
      "Driver Rest Area"
    ],
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "High-spec modern logistics facility located right on the Bangalore-Chennai Industrial Corridor (NH 48). Features 8 automated hydraulic dock levellers, 12m clear height, ample 40ft container turning radius, and approved industrial sanctions.",
    owner_name: "K. R. Logistic Parks Ltd (Verified Owner)",
    owner_phone: "+91 98840 12341",
    verified: true,
    approved: true,
    created_at: "2026-09-20T10:30:00.000Z"
  },
  {
    id: "aiw-prop-102",
    title: "Multi-Temperature Cold Storage Facility with Blast Freezers",
    type: "Cold Storage",
    purpose: "lease",
    city: "Mumbai",
    locality: "Bhiwandi",
    state: "Maharashtra",
    area_sqft: 25000,
    price_or_rent_psf: 65,
    deposit: "6 Months",
    status: "Ready to Move",
    availability: "Immediate",
    clear_height: "32 Ft",
    docks: 4,
    power_backup: "100% Dual Generator Backup",
    flooring: "Insulated Heavy Duty Polyurethane",
    fire_safety: "Gas Suppression + Fire Hydrant",
    features: [
      "Cold Storage",
      "Loading Docks",
      "Power Backup",
      "24x7 Security",
      "Truck Access",
      "CCTV Surveillance",
      "Temperature Monitoring IoT"
    ],
    images: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "State-of-the-art cold chain hub tailored for pharmaceuticals, dairy, and frozen foods (-25°C to +15°C). 4 dedicated sealed dock chambers ensuring complete cold chain integrity.",
    owner_name: "Maharashtra Agro Warehousing Co.",
    owner_phone: "+91 98840 12341",
    verified: true,
    approved: true,
    created_at: "2026-09-22T14:15:00.000Z"
  },
  {
    id: "aiw-prop-103",
    title: "Heavy Industrial Manufacturing Shed with 15T EOT Crane",
    type: "Industrial Shed",
    purpose: "rent",
    city: "Pune",
    locality: "Chakan MIDC Phase 2",
    state: "Maharashtra",
    area_sqft: 35000,
    price_or_rent_psf: 32,
    deposit: "4 Months",
    status: "Ready to Move",
    availability: "Within 15 Days",
    clear_height: "30 Ft",
    docks: 2,
    power_backup: "500 kVA Transformer Station",
    flooring: "VDF Concrete 8 Ton/m² Capacity",
    fire_safety: "Smoke Detectors & Ring Hydrant",
    features: [
      "Heavy Power",
      "Loading Docks",
      "Crane Provisions",
      "24x7 Security",
      "Truck Access",
      "Office Block Attached"
    ],
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Approved heavy manufacturing setup inside prime auto hub Chakan. Equipped with gantry girder for 15T overhead crane, high industrial power load (500 HP sanction), and separate administrative office block.",
    owner_name: "Apex Auto Infrastructure LLP",
    owner_phone: "+91 98840 12341",
    verified: true,
    approved: true,
    created_at: "2026-09-25T09:00:00.000Z"
  },
  {
    id: "aiw-prop-104",
    title: "100,000 Sq.Ft. Build-to-Suit E-Commerce Fulfillment Center",
    type: "Warehouse",
    purpose: "lease",
    city: "Delhi NCR",
    locality: "Dharuhera / Bilaspur Tauru Road",
    state: "Haryana",
    area_sqft: 100000,
    price_or_rent_psf: 24,
    deposit: "6 Months",
    status: "Build-to-Suit",
    availability: "60-90 Days Delivery",
    clear_height: "40 Ft",
    docks: 16,
    power_backup: "Dedicated Substation 250 kVA",
    flooring: "FM2 Laser Screed Floor (7 Ton/m²)",
    fire_safety: "FM Approved ESFR Fire Sprinkler System",
    features: [
      "Loading Docks",
      "Fire Safety",
      "Power Backup",
      "24x7 Security",
      "Truck Access",
      "Build to Suit"
    ],
    images: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Custom-configured Grade-A logistics space under development near KMP Expressway. Can be tailored to 3PL, FMCG, or Quick Commerce requirements with mezzanine rack setups.",
    owner_name: "Northland Logistics Parks",
    owner_phone: "+91 98840 12341",
    verified: true,
    approved: true,
    created_at: "2026-09-26T11:45:00.000Z"
  },
  {
    id: "aiw-prop-105",
    title: "Prime Industrial Commercial Land (5 Acres) on Highway",
    type: "Land",
    purpose: "sale",
    city: "Bengaluru",
    locality: "Hoskote Industrial Zone",
    state: "Karnataka",
    area_sqft: 217800, // 5 Acres
    price_or_rent_psf: 1850, // Per sq ft outright sale
    deposit: "N/A (Sale)",
    status: "Ready for Construction",
    availability: "Immediate",
    clear_height: "Open Land",
    docks: 0,
    power_backup: "HT Line Available Nearby",
    flooring: "Levelled Hard Red Soil / Compacted",
    fire_safety: "Direct Main Road Access (150 ft Frontage)",
    features: [
      "Truck Access",
      "Clear Title",
      "KIADB Adjacent",
      "Direct Highway Frontage"
    ],
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Freehold clear title industrial converted land located directly on Bengaluru-Tirupati Highway near Narasapura. Ideal for logistics park, factory setup, or commercial yard storage.",
    owner_name: "Venkateshwara Lands & Estates",
    owner_phone: "+91 98840 12341",
    verified: true,
    approved: true,
    created_at: "2026-09-27T16:10:00.000Z"
  },
  {
    id: "aiw-prop-106",
    title: "Air-Conditioned Pharma & Commercial Tech Office Block",
    type: "Commercial Office",
    purpose: "rent",
    city: "Hyderabad",
    locality: "Shamshabad Cargo Corridor",
    state: "Telangana",
    area_sqft: 18000,
    price_or_rent_psf: 45,
    deposit: "6 Months",
    status: "Ready to Move",
    availability: "Immediate",
    clear_height: "12 Ft Office Ceiling",
    docks: 1,
    power_backup: "100% DG Backup with Synchronizer",
    flooring: "Vitrified Tile & Anti-static Carpet",
    fire_safety: "Commercial Smoke Sensors & Hose Reels",
    features: [
      "Power Backup",
      "24x7 Security",
      "Truck Access",
      "High Speed Fiber",
      "Executive Cabins"
    ],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Fully furnished logistics dispatch and admin corporate office situated 5 minutes from Rajiv Gandhi International Airport cargo terminal. Plug-and-play with 140 workstations and conference rooms.",
    owner_name: "Decan Gateway Properties",
    owner_phone: "+91 98840 12341",
    verified: true,
    approved: true,
    created_at: "2026-09-28T13:20:00.000Z"
  },
  {
    id: "aiw-prop-107",
    title: "Modern Logistics Godown with Ample Parking & 6 Docks",
    type: "Warehouse",
    purpose: "rent",
    city: "Ahmedabad",
    locality: "Sanand GIDC",
    state: "Gujarat",
    area_sqft: 52000,
    price_or_rent_psf: 22,
    deposit: "3 Months",
    status: "Ready to Move",
    availability: "Immediate",
    clear_height: "34 Ft",
    docks: 6,
    power_backup: "75 kVA DG",
    flooring: "Heavy Duty Trimix Concrete",
    fire_safety: "Hydrant System with 2 Lakh Liter Reservoir",
    features: [
      "Loading Docks",
      "Fire Safety",
      "Power Backup",
      "24x7 Security",
      "Truck Access"
    ],
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Located within the auto-engineering hub of Sanand, featuring 40-foot container turning yard, automated rolling shutters, and security cabins.",
    owner_name: "Gujarat Industrial Real Estate",
    owner_phone: "+91 98840 12341",
    verified: true,
    approved: true,
    created_at: "2026-09-29T08:30:00.000Z"
  },
  {
    id: "aiw-prop-108",
    title: "Compact Industrial Shed with 3-Phase Power for Workshop",
    type: "Industrial Shed",
    purpose: "rent",
    city: "Chennai",
    locality: "Oragadam Industrial Park",
    state: "Tamil Nadu",
    area_sqft: 12000,
    price_or_rent_psf: 26,
    deposit: "5 Months",
    status: "Ready to Move",
    availability: "Immediate",
    clear_height: "28 Ft",
    docks: 2,
    power_backup: "120 HP Sanctioned Power",
    flooring: "Tremix 5 Ton Capacity",
    fire_safety: "Fire Extinguishers & Exit Signages",
    features: [
      "Heavy Power",
      "Loading Docks",
      "24x7 Security",
      "Truck Access"
    ],
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Ideal for Tier-2 auto ancillary supplier or fabrication workshop. Equipped with industrial water connection, heavy power, and 2 side loading gates.",
    owner_name: "Coromandel Sheds & Warehousing",
    owner_phone: "+91 98840 12341",
    verified: true,
    approved: true,
    created_at: "2026-09-30T10:00:00.000Z"
  },
  {
    id: "aiw-prop-109",
    title: "Prime Distribution Center with Mezzanine Racking",
    type: "Warehouse",
    purpose: "rent",
    city: "Mumbai",
    locality: "Panvel JNPT Port Vicinity",
    state: "Maharashtra",
    area_sqft: 65000,
    price_or_rent_psf: 34,
    deposit: "6 Months",
    status: "Ready to Move",
    availability: "Immediate",
    clear_height: "38 Ft",
    docks: 10,
    power_backup: "150 kVA Backup",
    flooring: "FM2 High Tolerance Superflat Floor",
    fire_safety: "Fully Automatic Sprinklers & Smoke Vents",
    features: [
      "Loading Docks",
      "Fire Safety",
      "Power Backup",
      "24x7 Security",
      "Truck Access",
      "Near Port"
    ],
    images: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Port-connected logistics warehouse directly accessible to JNPT container terminal and Mumbai-Pune Expressway. Heavy payload capacity with 10 dock levelers.",
    owner_name: "Konkan Coastal Warehousing Ltd",
    owner_phone: "+91 98840 12341",
    verified: true,
    approved: true,
    created_at: "2026-10-01T15:00:00.000Z"
  },
  {
    id: "aiw-prop-110",
    title: "Temperature Controlled Agri & FMCG Storage",
    type: "Cold Storage",
    purpose: "rent",
    city: "Delhi NCR",
    locality: "Kundli Sonipat Industrial Area",
    state: "Haryana",
    area_sqft: 30000,
    price_or_rent_psf: 55,
    deposit: "6 Months",
    status: "Ready to Move",
    availability: "Immediate",
    clear_height: "32 Ft",
    docks: 4,
    power_backup: "Dual Diesel Gensets",
    flooring: "Epoxy Coated Food Grade",
    fire_safety: "NFPA Fire Suppression",
    features: [
      "Cold Storage",
      "Loading Docks",
      "Fire Safety",
      "Power Backup",
      "24x7 Security",
      "Truck Access"
    ],
    images: [
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Specialized cold facility on GT Karnal Road offering multi-chamber temperature zones (0°C to +8°C for fruits/vegetables/FMCG) and seamless container docking.",
    owner_name: "Haryana Cold Chain Infrastructures",
    owner_phone: "+91 98840 12341",
    verified: true,
    approved: true,
    created_at: "2026-10-02T11:00:00.000Z"
  }
];

export const CITIES_LIST = [
  "Chennai",
  "Mumbai",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Kolkata",
  "Coimbatore",
  "Jaipur"
];

export const LOCALITIES_BY_CITY = {
  "Chennai": ["Sriperumbudur", "Oragadam", "Redhills", "Madhavaram", "Guindy", "Maraimalai Nagar", "Ambattur", "Poonamallee"],
  "Mumbai": ["Bhiwandi", "Panvel", "Taloja", "Thane", "Vapi Border", "JNPT Port Area", "Vasai-Virar"],
  "Delhi NCR": ["Dharuhera", "Bilaspur Tauru", "Manesar", "Kundli Sonipat", "Faridabad", "Greater Noida", "Ghaziabad"],
  "Bengaluru": ["Hoskote", "Nelamangala", "Bommasandra", "Peenya", "Dobbaspet", "Whitefield Logistics", "Devenahalli"],
  "Hyderabad": ["Shamshabad Cargo", "Medchal", "Patancheru", "Kothur", "Adibatla", "Nacharam"],
  "Pune": ["Chakan MIDC", "Talegaon", "Ranjangaon", "Bhosari", "Hinjawadi Logistics Hub", "Hadapsar"],
  "Ahmedabad": ["Sanand GIDC", "Changodar", "Bavla", "Aslali", "Viramgam", "Naroda"]
};

export const PROPERTY_TYPES = [
  "Warehouse",
  "Cold Storage",
  "Industrial Shed",
  "Land",
  "Commercial Office"
];
