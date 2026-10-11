import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/salonData';
import { useReveal } from '../hooks/useReveal';
import { StarIcon, QuoteIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useReveal<HTMLElement>();

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#14100B] text-[#FAF6EE] border-b border-[#241C14] reveal-init overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-medium text-[#C6A15B] mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span>Guest Voices</span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-[#FAF6EE] tracking-[0.03em] leading-tight mb-4">
            Testimonials & Client Praise
          </h2>
          <p className="text-sm sm:text-base text-[#8A7A63] font-normal leading-relaxed">
            Words from guests who trust Johnny Rodriguez The Salon with their hair journeys.
          </p>
        </div>

        {/* Testimonial Carousel Card */}
        <div className="relative bg-[#241C14] border border-[#C6A15B]/20 rounded-sm p-8 sm:p-14 shadow-2xl">
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Avatar */}
            <div className="shrink-0 relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#C6A15B]/50 shadow-lg bg-[#14100B]">
                <img
                  src={current.avatar}
                  alt={current.clientName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#C6A15B] text-[#14100B] p-2 rounded-full shadow">
                <QuoteIcon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Testimonial Quote Content */}
            <div className="flex-1 text-center md:text-left transition-opacity duration-350 ease-in-out">
              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start space-x-1 text-[#C6A15B] mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-lg sm:text-2xl font-light text-[#FAF6EE] leading-relaxed tracking-wide mb-6 italic">
                “{current.quote}”
              </blockquote>

              {/* Client Info with guaranteed spacing */}
              <div>
                <h3 className="text-base font-semibold tracking-wider text-[#FAF6EE] uppercase text-sm">
                  {current.clientName}
                </h3>
                <p className="text-xs text-[#C6A15B] tracking-wider mt-0.5 font-medium">
                  {current.location}
                </p>
                <p className="text-[11px] text-[#8A7A63] tracking-wide mt-1">
                  {'Service: '}{current.serviceMention}
                </p>
              </div>
            </div>

          </div>

          {/* Navigation Arrows */}
          <div className="mt-8 pt-8 border-t border-[#C6A15B]/15 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center space-x-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-6 bg-[#C6A15B]'
                      : 'w-2 bg-[#8A7A63]/40 hover:bg-[#C6A15B]/50'
                  }`}
                />
              ))}
            </div>

            {/* Left / Right Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="p-2.5 rounded-sm border border-[#C6A15B]/30 text-[#FAF6EE] hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="p-2.5 rounded-sm border border-[#C6A15B]/30 text-[#FAF6EE] hover:text-[#C6A15B] hover:border-[#C6A15B] transition-colors"
              >
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
