import React, { useState } from 'react';
import { SALON_SERVICES, BUSINESS_INFO } from '../data/salonData';
import { ServiceCategory } from '../types/salon';
import { useReveal } from '../hooks/useReveal';
import { ArrowRightIcon, ClockIcon } from './Icons';

interface ServicesSectionProps {
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const sectionRef = useReveal<HTMLElement>();

  const categoryTabs: { key: ServiceCategory; label: string }[] = [
    { key: 'all', label: 'All Services' },
    { key: 'cuts', label: 'Cuts' },
    { key: 'color', label: 'Color' },
    { key: 'treatments', label: 'Treatments' },
    { key: 'styling', label: 'Styling' },
    { key: 'bridal-lashes', label: 'Bridal & Lashes' },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? SALON_SERVICES
      : SALON_SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#14100B] text-[#FAF6EE] border-b border-[#241C14] reveal-init"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-medium text-[#C6A15B] mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span>Curated Menu</span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-[#FAF6EE] tracking-[0.03em] leading-tight mb-4">
            Services & Transparent Pricing
          </h2>
          <p className="text-sm sm:text-base text-[#8A7A63] font-normal leading-relaxed">
            Every session begins with an individualized aesthetic analysis. Tailored to hair density, bone architecture, and lifestyle.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 no-scrollbar gap-2 sm:gap-3">
          {categoryTabs.map((tab) => {
            const isActive = selectedCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-semibold rounded-sm whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-[#C6A15B] text-[#14100B] shadow-md shadow-[#C6A15B]/20'
                    : 'bg-[#241C14] text-[#FAF6EE]/80 hover:text-[#C6A15B] hover:bg-[#2C2219] border border-[#C6A15B]/15'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid (3-col desktop / 2-col tablet / 1-col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-[#241C14] border border-[#C6A15B]/15 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#C6A15B]/40"
            >
              <div>
                {/* Service Image with smooth scale hover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#14100B]">
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#241C14] via-transparent to-transparent opacity-80" />
                  
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#FAF6EE] bg-[#14100B]/80 backdrop-blur-sm px-2.5 py-1 border border-[#C6A15B]/30 rounded-sm">
                    {service.category.replace('-', ' ')}
                  </span>
                </div>

                {/* Service Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-medium text-[#FAF6EE] tracking-wide group-hover:text-[#C6A15B] transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  {/* Price & Duration line */}
                  <div className="flex items-center space-x-3 text-xs mb-3 font-medium">
                    <span className="text-[#C6A15B] tracking-wider text-sm font-semibold">
                      {service.priceDisplay}
                    </span>
                    <span className="text-[#8A7A63]">·</span>
                    <span className="text-[#8A7A63] flex items-center space-x-1">
                      <ClockIcon className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{service.duration}</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#8A7A63] leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Book this service action */}
              <div className="px-6 pb-6 pt-2 border-t border-[#C6A15B]/10 flex items-center justify-between">
                <span className="text-[11px] text-[#8A7A63] tracking-wider">
                  Bespoke Consultation
                </span>
                <button
                  onClick={() => onBookService(service.id)}
                  className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#C6A15B] hover:text-[#FAF6EE] transition-colors py-1"
                >
                  <span>Book this service</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Exact note under services */}
        <div className="mt-14 text-center">
          <p className="text-xs sm:text-sm text-[#8A7A63] tracking-wide max-w-2xl mx-auto italic border-t border-[#C6A15B]/15 pt-6">
            "{BUSINESS_INFO.noteUnderServices}"
          </p>
        </div>

      </div>
    </section>
  );
};
