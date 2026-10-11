import React, { useEffect, useState, useRef } from 'react';
import { IMAGES } from '../data/salonData';
import { ArrowRightIcon, CalendarIcon } from './Icons';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreServices }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reveal content on initial render
    const timer = setTimeout(() => setIsLoaded(true), 50);

    // Parallax scroll listener at 0.35x scroll speed via requestAnimationFrame
    let animationFrameId: number;
    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#14100B]"
    >
      {/* Parallax Background Image with 0.35x speed */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
        }}
      >
        <img
          src={IMAGES.hero}
          alt="Johnny Rodriguez The Salon - Luxury interior styling station"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Editorial Multi-Stop Luxury Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14100B] via-[#14100B]/70 to-[#14100B]/40" />
        <div className="absolute inset-0 bg-[#14100B]/35" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
        <div
          className={`transition-all duration-700 ease-out transform ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs uppercase tracking-[0.3em] font-medium text-[#C6A15B] mb-6">
            <span className="w-6 h-[1px] bg-[#C6A15B]" />
            <span>Dallas, Texas — Lovers Lane</span>
            <span className="w-6 h-[1px] bg-[#C6A15B]" />
          </div>

          {/* Headline with wide letter-spacing accents & Raleway elegance */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-[#FAF6EE] tracking-[0.04em] leading-[1.12] mb-6 max-w-4xl mx-auto">
            Where Precision Meets{' '}
            <span className="font-normal italic tracking-normal text-[#C6A15B]">
              Effortless Beauty
            </span>
          </h1>

          {/* Subcopy */}
          <p className="text-base sm:text-lg md:text-xl text-[#FAF6EE]/80 font-light max-w-2xl mx-auto leading-relaxed mb-10">
            Dallas’s sanctuary for master precision cuts, lived-in French balayage, and transformative hair care. Led by founder Johnny Rodriguez with over 25 years of devotion to the craft.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold text-[#14100B] bg-[#C6A15B] hover:bg-[#D4B36D] active:bg-[#B89249] rounded-sm transition-all shadow-lg hover:shadow-[#C6A15B]/25 flex items-center justify-center space-x-2.5"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>

            <button
              onClick={onExploreServices}
              className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-[0.22em] font-semibold text-[#FAF6EE] hover:text-[#C6A15B] border border-[#C6A15B]/50 hover:border-[#C6A15B] bg-[#14100B]/40 hover:bg-[#14100B]/70 rounded-sm transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore Services</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none opacity-70">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-medium mb-2">
          Scroll Down
        </span>
        <div className="w-5 h-8 rounded-full border border-[#C6A15B]/50 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#C6A15B] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
