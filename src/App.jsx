import React, { useState } from 'react';
import { RoyalGateOverlay } from './components/OpeningExperience/RoyalGateOverlay';
import { HeroSection } from './components/Hero/HeroSection';
import { CountdownSection } from './components/Countdown/CountdownSection';
import { EventTimelineSection } from './components/Events/EventTimelineSection';
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
      {/* Fullscreen Royal Gate Opening Experience */}
      <RoyalGateOverlay onOpen={handleGateOpen} />

      {/* Main Invitation Page Content */}
      <main className="relative w-full overflow-hidden">
        <HeroSection />
        <CountdownSection />
        <EventTimelineSection />
        <VenueSection />
        <GallerySection />
        <GuestWishesSection />
        <FooterSection />
      </main>

      {/* Floating Music Control Component */}
      <MusicControl autoPlayTriggered={gateOpened} />
    </div>
  );
}
