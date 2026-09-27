import React from 'react';
import HeroSearch from '../components/HeroSearch';
import ServiceCards from '../components/ServiceCards';
import PopularDestinations from '../components/PopularDestinations';
import SpecialOffers from '../components/SpecialOffers';
import VisaPromo from '../components/VisaPromo';
import LatestOffersRow from '../components/LatestOffersRow';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Hero with Tabbed Search Engine & Airplane Background */}
      <HeroSearch />

      {/* 2. 7 Quick Service Cards with Rounded Colored Icons */}
      <ServiceCards />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        
        {/* 3. Popular Destinations (Dubai, Singapore, Bangkok, Cox's Bazar) */}
        <PopularDestinations />

        {/* 4. Special Offers (Maldives Escape + Trust Badges) */}
        <SpecialOffers />

        {/* 5. Visa Assistance Promo Banner */}
        <VisaPromo />

        {/* 6. Latest Travel Offers (Hotel, Tour, Flight deals) */}
        <LatestOffersRow />

      </div>
    </div>
  );
}
