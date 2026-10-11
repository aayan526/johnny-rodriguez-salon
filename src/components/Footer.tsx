import React from 'react';
import { BUSINESS_INFO, DALLAS_HOURS } from '../data/salonData';
import { InstagramIcon, FacebookIcon, PinterestIcon, PinIcon, PhoneIcon, MailIcon } from './Icons';

interface FooterProps {
  onBookClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookClick }) => {
  return (
    <footer className="bg-[#0E0B08] text-[#FAF6EE] border-t border-[#241C14] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#241C14]">
          
          {/* Column 1: Brand & Blurb (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-light tracking-[0.2em] text-[#FAF6EE] uppercase">
                Johnny Rodriguez
              </span>
              <span className="text-[10px] tracking-[0.32em] text-[#C6A15B] uppercase font-semibold mt-1">
                The Salon · Dallas Atelier
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#8A7A63] leading-relaxed font-light max-w-sm">
              Over 25 years of devotion to precision architectural hair design, French balayage, and transformative hair care on Lovers Lane in Dallas.
            </p>

            <p className="text-xs text-[#8A7A63]/80 leading-relaxed font-light">
              Dallas Flagship Atelier · Also serving North Texas with our sister boutique in {BUSINESS_INFO.secondLocation}.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Johnny Rodriguez Salon on Instagram"
                className="w-9 h-9 rounded-full bg-[#18120C] border border-[#C6A15B]/30 flex items-center justify-center text-[#FAF6EE] hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Johnny Rodriguez Salon on Facebook"
                className="w-9 h-9 rounded-full bg-[#18120C] border border-[#C6A15B]/30 flex items-center justify-center text-[#FAF6EE] hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>

              <a
                href={BUSINESS_INFO.social.pinterest}
                target="_blank"
                rel="noreferrer"
                aria-label="Johnny Rodriguez Salon on Pinterest"
                className="w-9 h-9 rounded-full bg-[#18120C] border border-[#C6A15B]/30 flex items-center justify-center text-[#FAF6EE] hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
              >
                <PinterestIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C6A15B] block">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs text-[#8A7A63]">
              <li>
                <a href="#services" className="hover:text-[#FAF6EE] transition-colors">
                  Services & Pricing
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FAF6EE] transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#stylists" className="hover:text-[#FAF6EE] transition-colors">
                  Master Stylists
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#FAF6EE] transition-colors">
                  Online Booking
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#FAF6EE] transition-colors">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#FAF6EE] transition-colors">
                  Hours & Directions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FAF6EE] transition-colors">
                  Contact Reception
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours Summary (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C6A15B] block">
              Dallas Hours
            </span>
            <div className="space-y-2 text-xs text-[#8A7A63]">
              {DALLAS_HOURS.map((h) => {
                const displayValue =
                  h.day === 'Saturday'
                    ? '8am – 5pm'
                    : h.day === 'Monday'
                    ? 'Closed'
                    : h.hours || h.hoursDisplay || (h.isClosed ? 'Closed' : '');
                return (
                  <div key={h.day} className="flex justify-between items-baseline" data-day={h.day}>
                    <span>{`${h.day}: `}</span>
                    <span className={`tracking-wider font-medium ${h.isClosed ? 'text-[#8A7A63]' : 'text-[#FAF6EE]'}`}>
                      {displayValue}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3">
              <button
                onClick={onBookClick}
                className="w-full py-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#14100B] bg-[#C6A15B] hover:bg-[#D4B36D] rounded-sm transition-colors text-center"
              >
                BOOK APPOINTMENT
              </button>
            </div>
          </div>

          {/* Column 4: Contact & Concierge (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#C6A15B] block">
              Concierge
            </span>

            <div className="space-y-3 text-xs text-[#8A7A63]">
              <div className="flex items-start space-x-2.5">
                <PinIcon className="w-3.5 h-3.5 text-[#C6A15B] shrink-0 mt-0.5" />
                <span className="text-[#FAF6EE]">{BUSINESS_INFO.address}</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <PhoneIcon className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <a
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="text-[#FAF6EE] hover:text-[#C6A15B] transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <MailIcon className="w-3.5 h-3.5 text-[#C6A15B] shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-[#FAF6EE] hover:text-[#C6A15B] transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <p className="text-[11px] text-[#8A7A63]/80 leading-relaxed pt-2 border-t border-[#241C14]">
              Complimentary parking available in front and rear of the Lovers Lane boutique.
            </p>
          </div>

        </div>

        {/* Disclaimer Line Required By Prompt */}
        <div className="my-8 py-4 px-6 rounded-sm bg-[#18120C] border border-[#241C14] text-center">
          <p className="text-xs text-[#8A7A63] tracking-wide">
            {BUSINESS_INFO.footerDisclaimer}
          </p>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7A63]">
          <p>{`© ${new Date().getFullYear()} Johnny Rodriguez The Salon. All rights reserved.`}</p>
          <div className="flex items-center space-x-6 text-xs text-[#8A7A63]">
            <span>Dallas, TX · Lovers Lane</span>
            <span>&bull;</span>
            <span>(214) 987-1919</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
