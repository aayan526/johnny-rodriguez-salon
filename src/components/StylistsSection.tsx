import React from 'react';
import { STYLISTS } from '../data/salonData';
import { useReveal } from '../hooks/useReveal';
import { CalendarIcon, ScissorsIcon } from './Icons';

interface StylistsSectionProps {
  onBookWithStylist: (stylistId: string) => void;
}

export const StylistsSection: React.FC<StylistsSectionProps> = ({ onBookWithStylist }) => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="stylists"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#14100B] text-[#FAF6EE] border-b border-[#241C14] reveal-init"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-medium text-[#C6A15B] mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span>Master Craftsmen</span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-[#FAF6EE] tracking-[0.03em] leading-tight mb-4">
            Meet Our Stylists
          </h2>
          <p className="text-sm sm:text-base text-[#8A7A63] font-normal leading-relaxed">
            Decades of industry mastery combined with relentless artistic discipline and attentive Dallas hospitality.
          </p>
        </div>

        {/* 2-Column Stylists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {STYLISTS.map((stylist) => (
            <div
              key={stylist.id}
              className="group bg-[#241C14] border border-[#C6A15B]/20 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#C6A15B] hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <div>
                {/* Stylist Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#14100B]">
                  <img
                    src={stylist.image}
                    alt={stylist.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241C14] via-[#241C14]/30 to-transparent" />
                  
                  <div className="absolute bottom-4 left-6">
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C6A15B] bg-[#14100B]/85 px-3 py-1 rounded-sm border border-[#C6A15B]/30">
                      {stylist.role}
                    </span>
                  </div>
                </div>

                {/* Stylist Info */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-2xl font-light text-[#FAF6EE] tracking-wide">
                      {stylist.name}
                    </h3>
                  </div>

                  <p className="text-xs uppercase tracking-[0.15em] font-medium text-[#C6A15B] mb-4">
                    {stylist.experience}
                  </p>

                  <p className="text-xs sm:text-sm text-[#8A7A63] leading-relaxed font-light mb-6">
                    {stylist.bio}
                  </p>

                  {/* Specialties */}
                  <div className="border-t border-[#C6A15B]/15 pt-4">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#FAF6EE]/70 block mb-2">
                      Specialties:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {stylist.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="text-[11px] font-medium text-[#FAF6EE] bg-[#14100B] px-3 py-1 rounded-sm border border-[#C6A15B]/20"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Book With Stylist Button */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => onBookWithStylist(stylist.id)}
                  className="w-full py-3.5 text-xs uppercase tracking-[0.22em] font-semibold text-[#14100B] bg-[#C6A15B] hover:bg-[#D4B36D] active:bg-[#B89249] rounded-sm transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-[#C6A15B]/20"
                >
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>Book with {stylist.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
