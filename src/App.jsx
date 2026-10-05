import React, { useState } from 'react';
import { RoyalGateOverlay } from './components/OpeningExperience/RoyalGateOverlay';
import { HeroSection } from './components/Hero/HeroSection';
import { CountdownSection } from './components/Countdown/CountdownSection';
import { EventTimelineSection } from './components/Events/EventTimelineSection';
import { FamilyDetailsSection } from './components/Family/FamilyDetailsSection';
import { VenueSection } from './components/Venue/VenueSection';
import { GallerySection } from './components/Gallery/GallerySection';
import { GuestWishesSection } from './components/Wishes/GuestWishesSection';
import { MusicControl } from './components/Audio/MusicControl';
import { FooterSection } from './components/Footer/FooterSection';

export default function App() {
  const [gateOpened, setGateOpened] = useState(false);

  const handleGateOpen = () => {
    setGateOpened(true);
  };

  return (
    <div className="relative min-h-screen bg-maroon-800 text-cream selection:bg-gold selection:text-maroon-950 font-sans antialiased overflow-x-hidden">
      {/* Fullscreen Royal Gate 3D Opening Experience */}
      <RoyalGateOverlay onOpen={handleGateOpen} />

      {/* Main Invitation Page Content (Fades in post opening) */}
      <main className="relative w-full overflow-hidden">
        {/* 1. Bismillah & 2. Couple Names */}
        <HeroSection />
        
        {/* 3. Live Countdown Timer */}
        <CountdownSection />
        
        {/* 4. Nikah Event & 5. Walima Event */}
        <EventTimelineSection />
        
        {/* 6. Family Details & Honor Roll */}
        <FamilyDetailsSection />
        
        {/* 7. Venue Section & 8. Google Maps */}
        <VenueSection />
        
        {/* 9. Swiper Royal Gallery */}
        <GallerySection />
        
        {/* 10. Guest Wishes & RSVP */}
        <GuestWishesSection />
        
        {/* 11. Footer */}
        <FooterSection />
      </main>

      {/* Floating Gold Music Control Component */}
      <MusicControl autoPlayTriggered={gateOpened} />
    </div>
  );
}
