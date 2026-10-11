import React, { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../data/salonData';
import { PhoneIcon, MenuIcon, CloseIcon, CalendarIcon } from './Icons';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Stylists', href: '#stylists' },
    { label: 'Booking', href: '#booking' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Visit', href: '#visit' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#14100B]/95 backdrop-blur-md border-b border-[#C6A15B]/20 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-[#14100B]/90 via-[#14100B]/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Wordmark: Johnny Rodriguez / THE SALON - DALLAS */}
            <a
              href="#home"
              className="flex flex-col group focus:outline-none"
              aria-label="Johnny Rodriguez The Salon - Return to top"
            >
              <span className="text-xl sm:text-2xl font-light tracking-[0.18em] text-[#FAF6EE] group-hover:text-[#C6A15B] transition-colors leading-none uppercase">
                Johnny Rodriguez
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.32em] text-[#C6A15B] uppercase font-semibold mt-1">
                The Salon · Dallas
              </span>
            </a>

            {/* Desktop Navigation (>= 1024px only, lg:flex, hidden below) */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.2em] font-medium text-[#FAF6EE]/80 hover:text-[#C6A15B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#C6A15B] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Right Actions (>= 1024px) */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-5 shrink-0">
              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                className="flex items-center space-x-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#FAF6EE]/90 hover:text-[#C6A15B] transition-colors px-4 py-2 border border-[#C6A15B]/30 hover:border-[#C6A15B] rounded-sm whitespace-nowrap shrink-0"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <span className="whitespace-nowrap">{BUSINESS_INFO.phone}</span>
              </a>

              <button
                onClick={onBookClick}
                className="px-5 py-2.5 text-xs uppercase tracking-[0.22em] font-semibold text-[#14100B] bg-[#C6A15B] hover:bg-[#D4B36D] active:bg-[#B89249] rounded-sm shadow-md transition-all hover:shadow-[#C6A15B]/20 whitespace-nowrap shrink-0"
              >
                Book Now
              </button>
            </div>

            {/* Mobile / Tablet Header Controls (< 1024px ONLY) */}
            <div className="flex lg:hidden items-center space-x-3">
              <a
                href={`tel:${BUSINESS_INFO.phoneClean}`}
                aria-label="Call salon"
                className="p-2 text-[#C6A15B] border border-[#C6A15B]/40 rounded-sm hover:bg-[#C6A15B]/10 transition-colors"
              >
                <PhoneIcon className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="p-2 text-[#FAF6EE] hover:text-[#C6A15B] transition-colors focus:outline-none"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#14100B] flex flex-col justify-between px-6 py-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-[#241C14]">
            <div className="flex flex-col">
              <span className="text-lg font-light tracking-[0.2em] text-[#FAF6EE] uppercase">
                Johnny Rodriguez
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#C6A15B] uppercase font-semibold">
                The Salon · Dallas
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-[#FAF6EE] hover:text-[#C6A15B] transition-colors"
            >
              <CloseIcon className="w-7 h-7" />
            </button>
          </div>

          {/* Staggered Links */}
          <nav className="flex flex-col justify-center space-y-6 my-auto py-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                style={{ animationDelay: `${idx * 40}ms` }}
                className="text-2xl sm:text-3xl font-light tracking-[0.16em] uppercase text-[#FAF6EE] hover:text-[#C6A15B] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#241C14] space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full py-3.5 text-center text-xs uppercase tracking-[0.22em] font-semibold text-[#14100B] bg-[#C6A15B] hover:bg-[#D4B36D] rounded-sm transition-colors flex items-center justify-center space-x-2"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Book Appointment Online</span>
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="w-full py-3 text-center text-xs uppercase tracking-[0.2em] font-medium text-[#FAF6EE] border border-[#C6A15B]/40 rounded-sm flex items-center justify-center space-x-2 hover:bg-[#FAF6EE]/5 transition-colors"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Call (214) 987-1919</span>
            </a>

            <p className="text-center text-[11px] text-[#8A7A63] tracking-wider pt-2">
              5403 W Lovers Ln, Dallas, TX 75209
            </p>
          </div>
        </div>
      )}
    </>
  );
};
