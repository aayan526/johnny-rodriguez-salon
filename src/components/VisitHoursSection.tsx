import React from 'react';
import { DALLAS_HOURS, BUSINESS_INFO } from '../data/salonData';
import { useReveal } from '../hooks/useReveal';
import { ClockIcon, PinIcon, PhoneIcon, MailIcon, ArrowRightIcon } from './Icons';

export const VisitHoursSection: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

  // Determine today's day name to highlight the row
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();
  const todayName = dayNames[todayIndex];

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#FAF6EE] text-[#14100B] reveal-init border-b border-[#241C14]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#8A7A63] mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span>Visit The Atelier</span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-[#14100B] tracking-[0.03em] leading-tight mb-4">
            Hours & Location
          </h2>
          <p className="text-sm sm:text-base text-[#615447] font-normal leading-relaxed">
            Conveniently nestled on Lovers Lane in Dallas with hassle-free boutique parking.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column (5 cols): Hours Table & Contact Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Hours Table Card */}
            <div className="bg-white rounded-sm border border-[#E0D8CB] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D5] mb-6">
                <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-bold text-[#14100B]">
                  <ClockIcon className="w-4 h-4 text-[#C6A15B]" />
                  <span>Dallas Salon Schedule</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#8A7A63]">
                  Lovers Lane
                </span>
              </div>

              <div className="space-y-2.5">
                {DALLAS_HOURS.map((item) => {
                  const isToday = item.day === todayName;
                  const displayValue = item.hoursDisplay || item.hours || (item.isClosed ? 'Closed' : '');
                  return (
                    <div
                      key={item.day}
                      data-day={item.day}
                      className={`flex items-center justify-between py-2 px-3 rounded-sm text-xs sm:text-sm transition-colors ${
                        isToday
                          ? 'bg-[#14100B] text-[#FAF6EE] font-semibold'
                          : 'text-[#3D332A] hover:bg-[#FAF6EE]'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#C6A15B]" />}
                        <span className="font-medium">{item.day}</span>
                        {isToday && (
                          <span className="text-[10px] uppercase tracking-wider text-[#C6A15B] font-bold ml-1">
                            (Today)
                          </span>
                        )}
                      </div>
                      <span className={`tracking-wider font-medium ${isToday ? 'text-[#FAF6EE]' : item.isClosed ? 'text-[#8A7A63]' : 'text-[#14100B]'}`}>
                        {displayValue}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-white rounded-sm border border-[#E0D8CB] p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="w-9 h-9 rounded-full bg-[#FAF6EE] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5">
                  <PinIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7A63] font-bold block mb-0.5">
                    Dallas Atelier Address
                  </span>
                  <p className="text-sm font-semibold text-[#14100B]">
                    {BUSINESS_INFO.address}
                  </p>
                  <p className="text-xs text-[#615447] mt-0.5">
                    Lovers Lane District · Complimentary Front & Rear Parking
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 pt-3 border-t border-[#EAE2D5]">
                <div className="w-9 h-9 rounded-full bg-[#FAF6EE] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5">
                  <PhoneIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7A63] font-bold block mb-0.5">
                    Telephone Reception
                  </span>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneClean}`}
                    className="text-sm font-semibold text-[#14100B] hover:text-[#C6A15B] transition-colors"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 pt-3 border-t border-[#EAE2D5]">
                <div className="w-9 h-9 rounded-full bg-[#FAF6EE] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5">
                  <MailIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7A63] font-bold block mb-0.5">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${BUSINESS_INFO.email}`}
                    className="text-sm font-semibold text-[#14100B] hover:text-[#C6A15B] transition-colors"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (7 cols): Embedded Google Map & Directions */}
          <div className="lg:col-span-7 bg-[#241C14] text-[#FAF6EE] rounded-sm p-4 sm:p-6 shadow-xl flex flex-col justify-between border border-[#C6A15B]/20">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#C6A15B]/15 mb-4 px-2">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] font-bold block">
                  Interactive Map
                </span>
                <h3 className="text-base sm:text-lg font-light text-[#FAF6EE]">
                  5403 W Lovers Ln, Dallas, TX 75209
                </h3>
              </div>

              <a
                href="https://maps.google.com/?q=5403+W+Lovers+Ln,+Dallas,+TX+75209"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#14100B] bg-[#C6A15B] hover:bg-[#D4B36D] rounded-sm transition-colors"
              >
                <span>Get Directions</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded Google Map iframe */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-sm overflow-hidden border border-[#C6A15B]/30 bg-[#14100B]">
              <iframe
                title="Google Map - Johnny Rodriguez The Salon Dallas"
                src="https://www.google.com/maps?q=5403+W+Lovers+Ln,+Dallas,+TX+75209&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Neighborhood guide */}
            <div className="mt-4 pt-4 border-t border-[#C6A15B]/15 px-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8A7A63]">
              <span>Inwood Village & Devonshire District</span>
              <span>&bull;</span>
              <span>6 min from Highland Park</span>
              <span>&bull;</span>
              <span>7 min from Preston Hollow</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
