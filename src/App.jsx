import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBrands from './components/TrustedBrands';
import PropertyListings from './components/PropertyListings';
import CostEstimatorCalculator from './components/CostEstimatorCalculator';
import LocationsHub from './components/LocationsHub';
import RequirementForm from './components/RequirementForm';
import Footer from './components/Footer';
import FloatingActionBar from './components/FloatingActionBar';
import IndustrialChatbot from './components/IndustrialChatbot';
import CookieConsent from './components/CookieConsent';

export default function App() {
  const [reqModalState, setReqModalState] = useState({
    isOpen: false,
    mode: 'need', // 'need' | 'post'
    prefill: null
  });
  const [searchFilters, setSearchFilters] = useState(null);

  const handleOpenRequirement = (mode = 'need', prefill = null) => {
    setReqModalState({
      isOpen: true,
      mode,
      prefill
    });
  };

  const handleCloseRequirement = () => {
    setReqModalState({
      isOpen: false,
      mode: 'need',
      prefill: null
    });
  };

  const handleSearchFilters = (filters) => {
    setSearchFilters(filters);
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (category) => {
    setSearchFilters({ category });
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCityFilter = (city) => {
    setSearchFilters({ city });
  };

  const handleNavigateSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="app-root">
      {/* 1. Simplified Navigation Header */}
      <Navbar 
        onOpenRequirement={handleOpenRequirement}
        onNavigateSection={handleNavigateSection}
      />

      {/* 2. Hero Section with 1-Step Search & Trust Badges */}
      <Hero 
        activeFilters={searchFilters}
        onSearchFilters={handleSearchFilters}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Trusted Clients & Brands */}
      <TrustedBrands />

      {/* 4. Verified Warehouse Listings */}
      <PropertyListings 
        externalFilters={searchFilters}
        onResetFilters={() => setSearchFilters(null)}
        onOpenInquiry={handleOpenRequirement}
      />

      {/* 6. Simple Rent & Space Estimator */}
      <CostEstimatorCalculator 
        onOpenInquiry={handleOpenRequirement}
      />

      {/* 7. Strategic Warehousing Hubs */}
      <LocationsHub 
        onSelectCityFilter={handleSelectCityFilter}
      />

      {/* 8. Direct Requirement / Post Property Form */}
      <RequirementForm />

      {/* 9. Clean Footer */}
      <Footer 
        onOpenRequirement={handleOpenRequirement}
        onNavigateSection={handleNavigateSection}
      />

      {/* 10. Floating WhatsApp & Call Widget */}
      <FloatingActionBar 
        onOpenRequirement={handleOpenRequirement}
        onNavigateSection={handleNavigateSection}
      />

      {/* 11. AI Industrial Chatbot (Hides on Scroll & Desktop Widget) */}
      <IndustrialChatbot 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenRequirement={handleOpenRequirement}
      />

      {/* 12. First-Time Visitor Cookie Consent Banner */}
      <CookieConsent />

      {/* Requirement Modal Popup (when triggered from CTAs) */}
      {reqModalState.isOpen && (
        <RequirementForm 
          isModal={true}
          initialMode={reqModalState.mode}
          prefillData={reqModalState.prefill}
          onClose={handleCloseRequirement}
        />
      )}
    </div>
  );
}
