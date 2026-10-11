import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/salonData';
import { useReveal } from '../hooks/useReveal';
import { PhoneIcon, MailIcon, PinIcon, CheckIcon, ArrowRightIcon } from './Icons';

export const ContactSection: React.FC = () => {
  const sectionRef = useReveal<HTMLElement>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Please provide your name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (phone && cleanPhone.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number.';
    }
    if (!message.trim()) newErrors.message = 'Please provide your inquiry message.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 sm:py-32 bg-[#14100B] text-[#FAF6EE] border-b border-[#241C14] reveal-init"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] font-medium text-[#C6A15B] mb-3">
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
            <span>Connect With Us</span>
            <span className="w-5 h-[1px] bg-[#C6A15B]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-[#FAF6EE] tracking-[0.03em] leading-tight mb-4">
            Contact & Inquiries
          </h2>
          <p className="text-sm sm:text-base text-[#8A7A63] font-normal leading-relaxed">
            Have questions regarding wedding bookings, corrective color consultations, or general inquiries? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#241C14] border border-[#C6A15B]/20 rounded-sm p-6 sm:p-8">
              <h3 className="text-xl font-light text-[#FAF6EE] tracking-wide mb-6">
                Salon Reception
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#14100B] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5">
                    <PhoneIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A7A63] block mb-0.5">
                      Call Front Desk
                    </span>
                    <a
                      href={`tel:${BUSINESS_INFO.phoneClean}`}
                      className="text-base font-semibold text-[#FAF6EE] hover:text-[#C6A15B] transition-colors"
                    >
                      {BUSINESS_INFO.phone}
                    </a>
                    <p className="text-xs text-[#8A7A63] mt-0.5">
                      Direct appointments & urgent queries
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pt-4 border-t border-[#C6A15B]/15">
                  <div className="w-10 h-10 rounded-full bg-[#14100B] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5">
                    <MailIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A7A63] block mb-0.5">
                      Email Concierge
                    </span>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="text-base font-semibold text-[#FAF6EE] hover:text-[#C6A15B] transition-colors"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                    <p className="text-xs text-[#8A7A63] mt-0.5">
                      Bridal parties, events & press
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pt-4 border-t border-[#C6A15B]/15">
                  <div className="w-10 h-10 rounded-full bg-[#14100B] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] shrink-0 mt-0.5">
                    <PinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8A7A63] block mb-0.5">
                      Dallas Address
                    </span>
                    <p className="text-sm font-semibold text-[#FAF6EE]">
                      {BUSINESS_INFO.address}
                    </p>
                    <p className="text-xs text-[#8A7A63] mt-0.5">
                      Lovers Lane, Dallas TX
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#241C14] border border-[#C6A15B]/15 rounded-sm text-xs text-[#8A7A63] leading-relaxed">
              <span className="text-[#C6A15B] font-semibold uppercase tracking-wider block mb-1">
                Consultation Advisory:
              </span>
              Detailed color corrections and extensive bridal party packages require advance notice. Please call directly at (214) 987-1919 for group scheduling.
            </div>
          </div>

          {/* Contact Form with Validation & Success State (7 cols) */}
          <div className="lg:col-span-7 bg-[#241C14] border border-[#C6A15B]/20 rounded-sm p-6 sm:p-10 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#14100B] border border-[#C6A15B] text-[#C6A15B] flex items-center justify-center mx-auto mb-4">
                  <CheckIcon className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-light text-[#FAF6EE]">
                  Message Received
                </h3>
                <p className="text-xs sm:text-sm text-[#8A7A63] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Johnny Rodriguez The Salon. Our concierge team will review your message and reply via email or phone within 1 business day.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#14100B] bg-[#C6A15B] hover:bg-[#D4B36D] rounded-sm transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#C6A15B]/15 pb-4 mb-2">
                  <h3 className="text-xl font-light text-[#FAF6EE] tracking-wide">
                    Send An Inquiry
                  </h3>
                  <p className="text-xs text-[#8A7A63] mt-1">
                    Fill out the form below and we will get back to you promptly.
                  </p>
                </div>

                <div>
                  <label htmlFor="contact-name" className="text-xs uppercase tracking-wider text-[#FAF6EE] block mb-1 font-medium">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rachel Adams"
                    className="w-full px-4 py-3 rounded-sm bg-[#14100B] border border-[#C6A15B]/20 text-[#FAF6EE] placeholder-[#8A7A63] text-sm focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]"
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="text-xs uppercase tracking-wider text-[#FAF6EE] block mb-1 font-medium">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rachel@example.com"
                      className="w-full px-4 py-3 rounded-sm bg-[#14100B] border border-[#C6A15B]/20 text-[#FAF6EE] placeholder-[#8A7A63] text-sm focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]"
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="text-xs uppercase tracking-wider text-[#FAF6EE] block mb-1 font-medium">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(214) 555-0123"
                      className="w-full px-4 py-3 rounded-sm bg-[#14100B] border border-[#C6A15B]/20 text-[#FAF6EE] placeholder-[#8A7A63] text-sm focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]"
                    />
                    {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="text-xs uppercase tracking-wider text-[#FAF6EE] block mb-1 font-medium">
                    Message / Service Inquiry *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you with your hair goals?"
                    className="w-full px-4 py-3 rounded-sm bg-[#14100B] border border-[#C6A15B]/20 text-[#FAF6EE] placeholder-[#8A7A63] text-sm focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]"
                  />
                  {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs uppercase tracking-[0.22em] font-semibold text-[#14100B] bg-[#C6A15B] hover:bg-[#D4B36D] rounded-sm transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>Submit Inquiry</span>
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
