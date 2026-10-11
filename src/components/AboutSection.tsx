import React from 'react';
import { IMAGES, PHILOSOPHY_POINTS } from '../data/salonData';
import { useReveal } from '../hooks/useReveal';
import { CheckIcon } from './Icons';

export const AboutSection: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#FAF6EE] text-[#14100B] reveal-init overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Atmospheric Salon Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden aspect-[4/5] bg-[#241C14] shadow-2xl border-4 border-white">
              <img
                src={IMAGES.salonInterior}
                alt="Johnny Rodriguez The Salon interior atmosphere"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14100B]/50 via-transparent to-transparent" />
            </div>

            {/* Overlapping Detail Accent */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-48 h-48 rounded-sm overflow-hidden border-4 border-[#FAF6EE] shadow-xl bg-[#241C14]">
              <img
                src={IMAGES.salonDetail}
                alt="Johnny Rodriguez Salon atelier detail"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Mission & Craft */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#8A7A63] mb-3">
              <span className="w-5 h-[1px] bg-[#C6A15B]" />
              <span>Philosophy & Mission</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#14100B] tracking-[0.02em] leading-tight mb-6">
              Founded on Faith, Honesty, and Architectural Integrity
            </h2>

            <p className="text-base sm:text-lg text-[#3D332A] font-light leading-relaxed mb-6">
              At Johnny Rodriguez The Salon, hair is approached as an architectural medium. For over 25 years, our team has dedicated itself to continuous education and elevated salon artistry, cultivating genuine relationships with every client who walks through our doors on Lovers Lane.
            </p>

            <p className="text-sm sm:text-base text-[#615447] font-normal leading-relaxed mb-8">
              We never believe in assembly-line appointments. From the welcoming wash ritual to tailored color formulations that grow out gracefully, our standard remains uncompromisingly focused on health, vibrancy, and effortless living.
            </p>

            {/* Checklist of Differentiators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-[#8A7A63]/25">
              {PHILOSOPHY_POINTS.map((point) => (
                <div key={point.title} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#C6A15B] text-[#14100B] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckIcon className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.16em] font-bold text-[#14100B] mb-0.5">
                      {point.title}
                    </h3>
                    <p className="text-xs text-[#615447] leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Secondary location note in passing */}
            <div className="mt-8 text-xs text-[#8A7A63] tracking-wide">
              <span>Serving clients across Dallas at Lovers Lane &bull; Second boutique in Plano at Legacy West</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
