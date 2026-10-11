import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { StylistsSection } from './components/StylistsSection';
import { BookingSection } from './components/BookingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VisitHoursSection } from './components/VisitHoursSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [selectedStylistId, setSelectedStylistId] = useState<string | undefined>();

  const scrollToBooking = () => {
    // Defer so React commits any pending state updates first; scrolling to an
    // element mid-remount gets cancelled when the old DOM node is removed.
    setTimeout(() => {
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    scrollToBooking();
  };

  const handleBookWithStylist = (stylistId: string) => {
    setSelectedStylistId(stylistId);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#14100B] text-[#FAF6EE] flex flex-col font-sans selection:bg-[#C6A15B]/30 selection:text-[#FAF6EE] overflow-x-hidden">
      {/* 1. Fixed Navbar */}
      <Navbar onBookClick={scrollToBooking} />

      <main className="flex-1">
        {/* 2. Hero Section (#home) */}
        <Hero
          onBookClick={scrollToBooking}
          onExploreServices={scrollToServices}
        />

        {/* 3. Stats Strip with Animated Counters */}
        <StatsStrip />

        {/* 4. Services Section with Tabs & Jump-to-Book (#services) */}
        <ServicesSection onBookService={handleBookService} />

        {/* 5. About / Philosophy Strip (#about) */}
        <AboutSection />

        {/* 6. Stylists Showcase (#stylists) */}
        <StylistsSection onBookWithStylist={handleBookWithStylist} />

        {/* 7. Multi-Step Online Booking Suite (#booking) */}
        <BookingSection
          initialServiceId={selectedServiceId}
          initialStylistId={selectedStylistId}
        />

        {/* 8. Testimonials Carousel (#reviews) */}
        <TestimonialsSection />

        {/* 9. Hours & Location with Google Map (#visit) */}
        <VisitHoursSection />

        {/* 10. Contact Form & Info Cards (#contact) */}
        <ContactSection />
      </main>

      {/* 11. Footer with 4 Columns & Required Disclaimer */}
      <Footer onBookClick={scrollToBooking} />
    </div>
  );
}
