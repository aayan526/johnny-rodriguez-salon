import React, { useEffect, useState, useRef } from 'react';

export const StatsStrip: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [years, setYears] = useState(0);
  const [servicesCount, setServicesCount] = useState(0);
  const [locations, setLocations] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            observer.disconnect();

            // Animate counters over 1.2s
            const duration = 1200;
            const startTime = performance.now();

            const targetYears = 25;
            const targetServices = 15;
            const targetLocations = 2;

            const updateCounters = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out quadratic
              const easeOut = 1 - (1 - progress) * (1 - progress);

              setYears(Math.floor(easeOut * targetYears));
              setServicesCount(Math.floor(easeOut * targetServices));
              setLocations(Math.floor(easeOut * targetLocations));

              if (progress < 1) {
                requestAnimationFrame(updateCounters);
              } else {
                setYears(targetYears);
                setServicesCount(targetServices);
                setLocations(targetLocations);
              }
            };

            requestAnimationFrame(updateCounters);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      className="bg-[#241C14] border-y border-[#C6A15B]/20 py-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#C6A15B]/15">
          {/* Stat 1: 25+ Years */}
          <div className="pt-4 md:pt-0">
            <div className="text-4xl sm:text-5xl font-light text-[#C6A15B] tracking-tight mb-1">
              {years}+
            </div>
            <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#FAF6EE]/80">
              Years of Artistry
            </div>
          </div>

          {/* Stat 2: 15 Services */}
          <div className="pt-4 md:pt-0">
            <div className="text-4xl sm:text-5xl font-light text-[#C6A15B] tracking-tight mb-1">
              {servicesCount}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#FAF6EE]/80">
              Signature Services
            </div>
          </div>

          {/* Stat 3: 2 Locations */}
          <div className="pt-4 md:pt-0">
            <div className="text-4xl sm:text-5xl font-light text-[#C6A15B] tracking-tight mb-1">
              {locations}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#FAF6EE]/80">
              Texas Locations
            </div>
            <span className="text-[10px] text-[#8A7A63] tracking-wider mt-0.5 block">
              Dallas & Plano
            </span>
          </div>

          {/* Stat 4: 1 Uncompromising Standard */}
          <div className="pt-4 md:pt-0">
            <div className="text-4xl sm:text-5xl font-light text-[#C6A15B] tracking-tight mb-1">
              1
            </div>
            <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#FAF6EE]/80">
              Uncompromising Standard
            </div>
            <span className="text-[10px] text-[#8A7A63] tracking-wider mt-0.5 block">
              Bespoke Hair Health
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
