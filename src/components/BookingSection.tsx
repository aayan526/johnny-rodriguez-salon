import React, { useState, useEffect } from 'react';
import { SALON_SERVICES, STYLISTS, DALLAS_HOURS, BUSINESS_INFO } from '../data/salonData';
import { useReveal } from '../hooks/useReveal';
import { CheckIcon, CalendarIcon, ClockIcon, UserIcon, PhoneIcon, MailIcon, ArrowRightIcon, ArrowLeftIcon, SparkleIcon } from './Icons';

interface BookingSectionProps {
  initialServiceId?: string;
  initialStylistId?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialServiceId,
  initialStylistId,
}) => {
  const sectionRef = useReveal<HTMLElement>();

  // Current Step: 1 = Service, 2 = Stylist, 3 = Date & Time, 4 = Guest Details, 5 = Confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || SALON_SERVICES[0].id
  );
  const [selectedStylistId, setSelectedStylistId] = useState<string>(
    initialStylistId || 'first-available'
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Per-step error messages
  const [stepError, setStepError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Generated Confirmation
  const [confirmationNumber, setConfirmationNumber] = useState<string>('');

  // Sync external pre-selections
  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  useEffect(() => {
    if (initialStylistId) {
      setSelectedStylistId(initialStylistId);
    }
  }, [initialStylistId]);

  // Generate 30 days starting tomorrow
  const availableDates = React.useMemo(() => {
    const dates: { dateStr: string; dayName: string; formatted: string; isClosed: boolean }[] = [];
    const baseDate = new Date();

    for (let i = 1; i <= 30; i++) {
      const d = new Date();
      d.setDate(baseDate.getDate() + i);
      const dayIndex = d.getDay(); // 0 = Sun, 1 = Mon
      const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex];
      const isClosed = dayIndex === 0 || dayIndex === 1;

      const dateStr = d.toISOString().split('T')[0];
      const formatted = d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      dates.push({ dateStr, dayName, formatted, isClosed });
    }
    return dates;
  }, []);

  // Set default available date once on load if empty
  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      const firstOpen = availableDates.find((d) => !d.isClosed);
      if (firstOpen) {
        setSelectedDate(firstOpen.dateStr);
      }
    }
  }, [availableDates, selectedDate]);

  // Generate time slots based on the selected date's real Dallas hours:
  // Tue: 9am-7pm, Wed: 8am-3pm, Thu: 8am-5pm, Fri: 8am-7pm, Sat: 8am-5pm, Sun/Mon: Closed
  const availableTimeSlots = React.useMemo(() => {
    if (!selectedDate) return [];
    const dateObj = new Date(selectedDate + 'T00:00:00');
    const dayIndex = dateObj.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dayIndex];
    const schedule = DALLAS_HOURS.find((h) => h.day === dayName);

    if (!schedule || schedule.isClosed || !schedule.openHour || !schedule.closeHour) {
      return [];
    }

    const slots: string[] = [];
    for (let h = schedule.openHour; h < schedule.closeHour; h++) {
      const hour12 = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? 'PM' : 'AM';
      slots.push(`${hour12}:00 ${ampm}`);
      // Add half-hour slot
      slots.push(`${hour12}:30 ${ampm}`);
    }
    return slots;
  }, [selectedDate]);

  // Set default time slot when slots change
  useEffect(() => {
    if (availableTimeSlots.length > 0) {
      if (!availableTimeSlots.includes(selectedTime)) {
        setSelectedTime(availableTimeSlots[0]);
      }
    } else {
      setSelectedTime('');
    }
  }, [availableTimeSlots, selectedTime]);

  const currentService = SALON_SERVICES.find((s) => s.id === selectedServiceId) || SALON_SERVICES[0];
  const currentStylist =
    selectedStylistId === 'first-available'
      ? { id: 'first-available', name: 'First Available Master Stylist', role: 'Any master team member on schedule' }
      : STYLISTS.find((s) => s.id === selectedStylistId) || STYLISTS[0];

  // Navigation handlers
  const handleNext = () => {
    setStepError('');
    setFieldErrors({});

    if (currentStep === 1) {
      if (!selectedServiceId) {
        setStepError('Please select a service to proceed.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedStylistId) {
        setStepError('Please select a preferred stylist or choose first available.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!selectedDate) {
        setStepError('Please select an appointment date.');
        return;
      }
      if (!selectedTime) {
        setStepError('Please select an available time slot for the selected date.');
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Validate Details
      const errors: { [key: string]: string } = {};

      if (!fullName.trim()) {
        errors.fullName = 'Full name is required.';
      }

      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        errors.phone = 'Please enter a valid 10-digit phone number.';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.email = 'Please enter a valid email address.';
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }

      // Generate booking reference & transition to step 5
      const randomCode = Math.floor(100000 + Math.random() * 900000);
      setConfirmationNumber(`JR-DAL-${randomCode}`);
      setCurrentStep(5);
    }
  };

  const handleBack = () => {
    setStepError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedServiceId(SALON_SERVICES[0].id);
    setSelectedStylistId('first-available');
    setFullName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setConfirmationNumber('');
    setFieldErrors({});
    setStepError('');
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#1C160F] text-[#FAF6EE] border-b border-[#241C14] reveal-init"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-medium text-[#C6A15B] mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span>Online Concierge</span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-[#FAF6EE] tracking-[0.03em] leading-tight mb-4">
            Reserve Your Appointment
          </h2>
          <p className="text-sm sm:text-base text-[#8A7A63] font-normal leading-relaxed">
            Direct online reservations for our 5403 W Lovers Lane salon in Dallas.
          </p>
        </div>

        {/* Step Progress Indicator (Hidden on Confirmation Step 5) */}
        {currentStep < 5 && (
          <div className="mb-12">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {[
                { num: 1, label: 'Service' },
                { num: 2, label: 'Stylist' },
                { num: 3, label: 'Date & Time' },
                { num: 4, label: 'Guest Info' },
              ].map((step) => {
                const isPassed = currentStep > step.num;
                const isCurrent = currentStep === step.num;
                return (
                  <div key={step.num} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold mb-2 transition-all ${
                        isCurrent
                          ? 'bg-[#C6A15B] text-[#14100B] ring-4 ring-[#C6A15B]/20'
                          : isPassed
                          ? 'bg-[#FAF6EE] text-[#14100B]'
                          : 'bg-[#241C14] text-[#8A7A63] border border-[#C6A15B]/20'
                      }`}
                    >
                      {isPassed ? <CheckIcon className="w-4 h-4" /> : step.num}
                    </div>
                    <span
                      className={`text-[11px] uppercase tracking-[0.16em] font-medium ${
                        isCurrent ? 'text-[#C6A15B]' : isPassed ? 'text-[#FAF6EE]' : 'text-[#8A7A63]'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Progress line */}
            <div className="w-full bg-[#241C14] h-[2px] mt-4 relative">
              <div
                className="bg-[#C6A15B] h-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error message banner */}
        {stepError && (
          <div className="mb-6 p-4 rounded-sm bg-red-950/60 border border-red-500/40 text-red-200 text-xs text-center font-medium">
            {stepError}
          </div>
        )}

        {/* ================= STEP 1: SERVICE SELECTION ================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#C6A15B]/20">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF6EE]">
                Step 1: Choose Your Signature Service
              </span>
              <span className="text-xs text-[#8A7A63]">
                15 services available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
              {SALON_SERVICES.map((srv) => {
                const isSelected = selectedServiceId === srv.id;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`text-left p-4 rounded-sm border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#2A2016] border-[#C6A15B] shadow-lg ring-1 ring-[#C6A15B]'
                        : 'bg-[#241C14] border-[#C6A15B]/15 hover:border-[#C6A15B]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-[0.16em] text-[#C6A15B] font-semibold">
                          {srv.category}
                        </span>
                        {isSelected && <CheckIcon className="w-3.5 h-3.5 text-[#C6A15B]" />}
                      </div>
                      <h4 className="text-sm font-medium text-[#FAF6EE] mb-2 leading-snug">
                        {srv.name}
                      </h4>
                      <p className="text-[11px] text-[#8A7A63] line-clamp-2 leading-relaxed mb-3">
                        {srv.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#C6A15B]/10 text-xs">
                      <span className="text-[#C6A15B] font-semibold">
                        {srv.priceDisplay}
                      </span>
                      <span className="text-[#8A7A63]">
                        {srv.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 2: STYLIST SELECTION ================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#C6A15B]/20">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF6EE]">
                Step 2: Choose Your Stylist
              </span>
              <span className="text-xs text-[#8A7A63]">
                Selected: {currentService.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Option: First Available */}
              <button
                type="button"
                onClick={() => setSelectedStylistId('first-available')}
                className={`p-6 rounded-sm border text-left flex flex-col justify-between transition-all ${
                  selectedStylistId === 'first-available'
                    ? 'bg-[#2A2016] border-[#C6A15B] ring-1 ring-[#C6A15B]'
                    : 'bg-[#241C14] border-[#C6A15B]/15 hover:border-[#C6A15B]/50'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#14100B] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] mb-4">
                    <SparkleIcon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-medium text-[#FAF6EE] mb-1">
                    First Available Master Artist
                  </h4>
                  <p className="text-xs text-[#8A7A63] leading-relaxed">
                    Greatest scheduling flexibility with any available master colorist or precision stylist on duty.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#C6A15B]/10 flex items-center justify-between text-xs text-[#C6A15B]">
                  <span>Fastest Availability</span>
                  {selectedStylistId === 'first-available' && <CheckIcon className="w-4 h-4" />}
                </div>
              </button>

              {/* Stylists from data */}
              {STYLISTS.map((stylist) => {
                const isSelected = selectedStylistId === stylist.id;
                return (
                  <button
                    key={stylist.id}
                    type="button"
                    onClick={() => setSelectedStylistId(stylist.id)}
                    className={`p-6 rounded-sm border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'bg-[#2A2016] border-[#C6A15B] ring-1 ring-[#C6A15B]'
                        : 'bg-[#241C14] border-[#C6A15B]/15 hover:border-[#C6A15B]/50'
                    }`}
                  >
                    <div>
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-[#C6A15B]/30 mb-4 bg-[#14100B]">
                        <img
                          src={stylist.image}
                          alt={stylist.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <h4 className="text-base font-medium text-[#FAF6EE] mb-0.5">
                        {stylist.name}
                      </h4>
                      <p className="text-xs text-[#C6A15B] uppercase tracking-wider mb-2 font-medium">
                        {stylist.role}
                      </p>
                      <p className="text-xs text-[#8A7A63] line-clamp-3 leading-relaxed">
                        {stylist.bio}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-[#C6A15B]/10 flex items-center justify-between text-xs text-[#C6A15B]">
                      <span>{stylist.experience}</span>
                      {isSelected && <CheckIcon className="w-4 h-4" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 3: DATE & TIME ================= */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#C6A15B]/20">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF6EE]">
                Step 3: Select Date & Dallas Salon Time
              </span>
              <span className="text-xs text-[#8A7A63]">
                Tue 9-7 · Wed 8-3 · Thu 8-5 · Fri 8-7 · Sat 8-5 (Sun/Mon Closed)
              </span>
            </div>

            {/* 30-Day Horizontal Date Strip */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#FAF6EE]/80 block mb-3 font-medium">
                Select Date (Next 30 Days):
              </label>
              <div className="flex items-center space-x-3 overflow-x-auto pb-4 no-scrollbar">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.dateStr;
                  if (item.isClosed) {
                    return (
                      <div
                        key={item.dateStr}
                        className="p-3 rounded-sm bg-[#18130E] border border-[#241C14] opacity-40 cursor-not-allowed shrink-0 w-24 text-center"
                        title="Salon is closed on Sundays and Mondays"
                      >
                        <span className="text-[10px] uppercase text-[#8A7A63] block font-semibold">
                          {item.dayName.slice(0, 3)}
                        </span>
                        <span className="text-sm font-medium text-[#FAF6EE]/60 block my-1">
                          {item.formatted.split(' ')[1]} {item.formatted.split(' ')[2]}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-red-400 block font-semibold">
                          Closed
                        </span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(item.dateStr)}
                      className={`p-3 rounded-sm border shrink-0 w-24 text-center transition-all ${
                        isSelected
                          ? 'bg-[#C6A15B] text-[#14100B] border-[#C6A15B] shadow-md'
                          : 'bg-[#241C14] text-[#FAF6EE] border-[#C6A15B]/20 hover:border-[#C6A15B]'
                      }`}
                    >
                      <span className={`text-[10px] uppercase block font-semibold ${isSelected ? 'text-[#14100B]' : 'text-[#C6A15B]'}`}>
                        {item.dayName.slice(0, 3)}
                      </span>
                      <span className="text-sm font-medium block my-1">
                        {item.formatted.split(' ')[1]} {item.formatted.split(' ')[2]}
                      </span>
                      <span className={`text-[9px] uppercase tracking-wider block font-medium ${isSelected ? 'text-[#14100B]/80' : 'text-[#8A7A63]'}`}>
                        Open
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots based on exact weekday hours */}
            <div className="pt-4 border-t border-[#C6A15B]/15">
              <label className="text-xs uppercase tracking-wider text-[#FAF6EE]/80 block mb-3 font-medium">
                Select Appointment Slot:
              </label>

              {availableTimeSlots.length === 0 ? (
                <div className="p-6 bg-[#241C14] text-center text-xs text-[#8A7A63] rounded-sm">
                  The salon is closed on this selected day. Please select a Tuesday through Saturday date above.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                  {availableTimeSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 px-3 rounded-sm text-xs font-semibold tracking-wider transition-all ${
                          isSelected
                            ? 'bg-[#C6A15B] text-[#14100B] shadow-md ring-1 ring-[#C6A15B]'
                            : 'bg-[#241C14] text-[#FAF6EE] border border-[#C6A15B]/15 hover:border-[#C6A15B]'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= STEP 4: GUEST DETAILS ================= */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#C6A15B]/20">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF6EE]">
                Step 4: Guest Contact Details
              </span>
              <span className="text-xs text-[#8A7A63]">
                SMS & email confirmation
              </span>
            </div>

            {/* Current Selection Recap Strip */}
            <div className="p-4 rounded-sm bg-[#241C14] border border-[#C6A15B]/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#8A7A63]">
              <div>
                <span className="text-[#C6A15B] font-semibold uppercase tracking-wider block mb-0.5">Service:</span>
                <span className="text-[#FAF6EE] font-medium">{currentService.name}</span>
              </div>
              <div>
                <span className="text-[#C6A15B] font-semibold uppercase tracking-wider block mb-0.5">Artist:</span>
                <span className="text-[#FAF6EE] font-medium">{currentStylist.name}</span>
              </div>
              <div>
                <span className="text-[#C6A15B] font-semibold uppercase tracking-wider block mb-0.5">Scheduled:</span>
                <span className="text-[#FAF6EE] font-medium">{`${selectedDate} · ${selectedTime}`}</span>
              </div>
            </div>

            {/* Contact Form Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="booking-name" className="text-xs uppercase tracking-wider text-[#FAF6EE] block mb-1.5 font-medium">
                  Full Name *
                </label>
                <input
                  id="booking-name"
                  type="text"
                  placeholder="e.g. Katherine Sterling"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm bg-[#241C14] border border-[#C6A15B]/20 text-[#FAF6EE] placeholder-[#8A7A63] text-sm focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]"
                />
                {fieldErrors.fullName && (
                  <p className="text-xs text-red-400 mt-1 font-medium">{fieldErrors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="booking-phone" className="text-xs uppercase tracking-wider text-[#FAF6EE] block mb-1.5 font-medium">
                    Phone Number (for SMS confirmation) *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    placeholder="(214) 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-sm bg-[#241C14] border border-[#C6A15B]/20 text-[#FAF6EE] placeholder-[#8A7A63] text-sm focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]"
                  />
                  {fieldErrors.phone && (
                    <p className="text-xs text-red-400 mt-1 font-medium">{fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="booking-email" className="text-xs uppercase tracking-wider text-[#FAF6EE] block mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    placeholder="katherine@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-sm bg-[#241C14] border border-[#C6A15B]/20 text-[#FAF6EE] placeholder-[#8A7A63] text-sm focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]"
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-400 mt-1 font-medium">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="booking-notes" className="text-xs uppercase tracking-wider text-[#FAF6EE] block mb-1.5 font-medium">
                  Special Notes, Desired Aesthetic, or Color Goals (Optional)
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  placeholder="e.g. Seeking subtle caramel balayage dimension; interested in root shadow blending."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-sm bg-[#241C14] border border-[#C6A15B]/20 text-[#FAF6EE] placeholder-[#8A7A63] text-sm focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 5: CONFIRMATION SCREEN ================= */}
        {currentStep === 5 && (
          <div className="bg-[#241C14] border border-[#C6A15B]/40 rounded-sm p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[#14100B] border border-[#C6A15B] text-[#C6A15B] flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckIcon className="w-8 h-8 stroke-[2.5]" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C6A15B] block mb-1">
              Reservation Confirmed
            </span>

            <h3 className="text-3xl font-light text-[#FAF6EE] mb-2 tracking-wide">
              We Look Forward to Seeing You
            </h3>

            <p className="text-xs text-[#8A7A63] mb-8 font-mono">
              {'Booking Reference: '}<span className="text-[#C6A15B] font-bold">{confirmationNumber}</span>
            </p>

            {/* Complete Summary Card */}
            <div className="bg-[#14100B] border border-[#C6A15B]/20 rounded-sm p-6 text-left space-y-3.5 mb-8 text-xs sm:text-sm">
              <div className="flex justify-between items-baseline border-b border-[#241C14] pb-2">
                <span className="text-[#8A7A63] uppercase tracking-wider text-xs">Service:</span>
                <span className="text-[#FAF6EE] font-medium text-right">{currentService.name}</span>
              </div>

              <div className="flex justify-between items-baseline border-b border-[#241C14] pb-2">
                <span className="text-[#8A7A63] uppercase tracking-wider text-xs">STYLIST:</span>
                <span className="text-[#FAF6EE] font-medium text-right">
                  {selectedStylistId === 'first-available' ? 'First Available' : currentStylist.name}
                </span>
              </div>

              <div className="flex justify-between items-baseline border-b border-[#241C14] pb-2">
                <span className="text-[#8A7A63] uppercase tracking-wider text-xs">Date & Time:</span>
                <span className="text-[#FAF6EE] font-medium text-right">{`${selectedDate} · ${selectedTime}`}</span>
              </div>

              <div className="flex justify-between items-baseline border-b border-[#241C14] pb-2">
                <span className="text-[#8A7A63] uppercase tracking-wider text-xs">Duration & Estimate:</span>
                <span className="text-[#C6A15B] font-semibold text-right">
                  {`${currentService.duration} · ${currentService.priceDisplay}`}
                </span>
              </div>

              <div className="flex justify-between items-baseline border-b border-[#241C14] pb-2">
                <span className="text-[#8A7A63] uppercase tracking-wider text-xs">Guest:</span>
                <span className="text-[#FAF6EE] font-medium text-right">{fullName}</span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-[#8A7A63] uppercase tracking-wider text-xs">Location:</span>
                <span className="text-[#FAF6EE] font-medium text-right">5403 W Lovers Ln, Dallas, TX 75209</span>
              </div>
            </div>

            <p className="text-xs text-[#8A7A63] mb-8 leading-relaxed max-w-md mx-auto">
              A text and email confirmation will be sent to <span className="text-[#FAF6EE] font-medium">{phone}</span>. Please arrive 10 minutes prior to enjoy our complimentary espresso or sparkling beverage service.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#14100B] bg-[#C6A15B] hover:bg-[#D4B36D] rounded-sm transition-colors"
              >
                Book Another Appointment
              </button>

              <a
                href="#home"
                className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF6EE] border border-[#C6A15B]/30 hover:border-[#C6A15B] rounded-sm transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        )}

        {/* Multi-step Footer Navigation (Back / Continue Buttons) */}
        {currentStep < 5 && (
          <div className="mt-10 pt-6 border-t border-[#C6A15B]/15 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF6EE] hover:text-[#C6A15B] px-4 py-2.5 border border-[#C6A15B]/30 rounded-sm transition-colors"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.22em] font-semibold text-[#14100B] bg-[#C6A15B] hover:bg-[#D4B36D] px-6 py-3 rounded-sm transition-colors shadow-md hover:shadow-[#C6A15B]/20"
            >
              <span>{currentStep === 4 ? 'Confirm Reservation' : 'Continue'}</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
