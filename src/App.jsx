import React, { useState, useEffect } from 'react';
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
import AuthModal from './components/AuthModal';

export default function App() {
  const [reqModalState, setReqModalState] = useState({
    isOpen: false,
    mode: 'need', // 'need' | 'post'
    prefill: null
  });
  const [searchFilters, setSearchFilters] = useState(null);
  const [authModalState, setAuthModalState] = useState({
    isOpen: false,
    initialTab: 'login' // 'login' | 'register'
  });
  const [currentUser, setCurrentUser] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Initialize logged in user from localStorage if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aiw_auth_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading stored user:', e);
    }
  }, []);

  const handleOpenAuth = (initialTab = 'login') => {
    setAuthModalState({
      isOpen: true,
      initialTab
    });
  };

  const handleCloseAuth = () => {
    setAuthModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    handleCloseAuth();
  };

  const handleLogout = () => {
    localStorage.removeItem('aiw_auth_user');
    setCurrentUser(null);
  };

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

  return (
    <div className="app-root">
      {/* 1. Navigation Header with Website View Menu & Top Actions */}
      <Navbar 
        onOpenRequirement={handleOpenRequirement}
        onNavigateSection={handleNavigateSection}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
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

      {/* 5. Simple Rent & Space Estimator */}
      <CostEstimatorCalculator 
        onOpenInquiry={handleOpenRequirement}
      />

      {/* 6. Strategic Warehousing Hubs */}
      <LocationsHub 
        onSelectCityFilter={handleSelectCityFilter}
      />

      {/* 7. Direct Requirement / Post Property Form */}
      <RequirementForm />

      {/* 8. Clean Footer */}
      <Footer 
        onOpenRequirement={handleOpenRequirement}
        onNavigateSection={handleNavigateSection}
      />

      {/* 9. Floating WhatsApp & Call Widget */}
      <FloatingActionBar 
        onOpenRequirement={handleOpenRequirement}
        onNavigateSection={handleNavigateSection}
      />

      {/* 10. AI Industrial Chatbot (Hides on Scroll & Desktop Widget) */}
      <IndustrialChatbot 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenRequirement={handleOpenRequirement}
      />

      {/* 11. First-Time Visitor Cookie Consent Banner */}
      <CookieConsent />

      {/* 12. Requirement Modal Popup */}
      {reqModalState.isOpen && (
        <RequirementForm 
          isModal={true}
          initialMode={reqModalState.mode}
          prefillData={reqModalState.prefill}
          onClose={handleCloseRequirement}
        />
      )}

      {/* 13. Login / Sign Up Authentication Modal */}
      {authModalState.isOpen && (
        <AuthModal 
          isOpen={true}
          initialTab={authModalState.initialTab}
          onClose={handleCloseAuth}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
