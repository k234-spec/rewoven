'use client';

import { useState } from 'react';
import { SOCIAL_LINKS } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  requirements: string;
}

const INITIAL_STATE: FormData = {
  name: '',
  email: '',
  phone: '',
  enquiryType: 'Custom Tailoring & Stitching',
  requirements: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg('Please provide your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please provide a valid phone or WhatsApp number.');
      return;
    }
    if (!formData.requirements.trim()) {
      setErrorMsg('Please describe your requirements.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  // Generate WhatsApp message with their pre-filled requirements
  const getWhatsAppShareUrl = () => {
    const text = encodeURIComponent(
      `Hello Madamcutie Atelier,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nEnquiry Type: ${formData.enquiryType}\nRequirements: ${formData.requirements}`
    );
    return `https://api.whatsapp.com/send/?phone=919911852113&text=${text}&type=phone_number&app_absent=0&wame_ctl=1`;
  };

  if (isSubmitted) {
    return (
      <div className="bg-ivory border border-hairline p-8 sm:p-10 text-center animate-in fade-in duration-300">
        <div className="w-14 h-14 bg-emerald/10 text-emerald rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald/30">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h3 className="font-display text-2xl text-noir font-normal mb-2">
          Thank You, {formData.name}
        </h3>
        <p className="text-sm text-noir/70 max-w-md mx-auto leading-relaxed mb-6">
          Your requirements have been received by our atelier concierge. A master
          stylist will review your request and get back to you within 24 hours.
        </p>

        {/* WhatsApp fast-track option */}
        <div className="p-4 bg-white border border-hairline/80 max-w-md mx-auto mb-6 rounded text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-noir">
              Need faster assistance?
            </span>
          </div>
          <p className="text-xs text-noir/60 mb-3">
            Forward these requirements directly to our master artisan team on WhatsApp.
          </p>
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald text-white text-xs font-semibold uppercase tracking-wider hover:bg-emerald/90 transition-colors"
          >
            Send via WhatsApp ↗
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setFormData(INITIAL_STATE);
          }}
          className="text-xs uppercase tracking-widest text-noir/60 underline hover:text-noir"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-hairline p-6 sm:p-10 shadow-sm"
      noValidate
    >
      <div className="mb-6">
        <h2 className="font-display text-xl sm:text-2xl font-normal text-noir">
          Share Your Requirements
        </h2>
        <p className="text-xs sm:text-sm text-noir/60 mt-1">
          Whether you need bespoke bridal blouse sizing, fabric customizations, or
          wholesale queries — our atelier is at your service.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3 bg-pink-accent/10 border border-pink-accent text-pink-accent text-xs font-medium rounded">
          {errorMsg}
        </div>
      )}

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs uppercase tracking-[0.14em] font-semibold text-noir mb-1.5"
          >
            Full Name <span className="text-pink-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="e.g. Radhika Sharma"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 text-xs sm:text-sm bg-ivory border border-hairline focus:border-noir focus:outline-none transition-colors text-noir placeholder:text-noir/30"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-[0.14em] font-semibold text-noir mb-1.5"
            >
              Email Address <span className="text-pink-accent">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="e.g. radhika@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-xs sm:text-sm bg-ivory border border-hairline focus:border-noir focus:outline-none transition-colors text-noir placeholder:text-noir/30"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs uppercase tracking-[0.14em] font-semibold text-noir mb-1.5"
            >
              Phone / WhatsApp <span className="text-pink-accent">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 text-xs sm:text-sm bg-ivory border border-hairline focus:border-noir focus:outline-none transition-colors text-noir placeholder:text-noir/30"
            />
          </div>
        </div>

        {/* Enquiry Type */}
        <div>
          <label
            htmlFor="enquiryType"
            className="block text-xs uppercase tracking-[0.14em] font-semibold text-noir mb-1.5"
          >
            Enquiry Purpose
          </label>
          <select
            id="enquiryType"
            name="enquiryType"
            value={formData.enquiryType}
            onChange={handleChange}
            className="w-full px-4 py-3 text-xs sm:text-sm bg-ivory border border-hairline focus:border-noir focus:outline-none transition-colors text-noir cursor-pointer"
          >
            <option value="Custom Tailoring & Stitching">
              Custom Tailoring &amp; Stitching (Bespoke Size)
            </option>
            <option value="Bridal & Festive Styling">
              Bridal &amp; Festive Styling Consultation
            </option>
            <option value="Wholesale & Bulk Boutique Orders">
              Wholesale &amp; Bulk Boutique Orders
            </option>
            <option value="Existing Order Status">
              Existing Order Status &amp; Tracking
            </option>
            <option value="Returns & Alterations">
              Returns &amp; Alteration Request
            </option>
            <option value="Other">Other Inquiries</option>
          </select>
        </div>

        {/* Requirements Box */}
        <div>
          <label
            htmlFor="requirements"
            className="block text-xs uppercase tracking-[0.14em] font-semibold text-noir mb-1.5"
          >
            Description of Requirements <span className="text-pink-accent">*</span>
          </label>
          <textarea
            id="requirements"
            name="requirements"
            rows={5}
            required
            placeholder="Tell us about your event date, bust/waist measurements, desired embroidery style (mirror work, sequin, pearl), alteration queries, or wholesale quantity..."
            value={formData.requirements}
            onChange={handleChange}
            className="w-full px-4 py-3 text-xs sm:text-sm bg-ivory border border-hairline focus:border-noir focus:outline-none transition-colors text-noir placeholder:text-noir/30 resize-y"
          />
        </div>

        {/* Inner margin guarantee note */}
        <div className="p-3 bg-ivory/60 rounded text-[11px] text-noir/70 flex items-start gap-2 border border-hairline/50">
          <svg
            className="w-4 h-4 text-gold shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Every Madamcutie garment comes with <strong>2 inches of alteration margin</strong>.
            Our master karigars can customize neckline depth, sleeve length, and cups upon request.
          </span>
        </div>

        {/* Submit Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3.5 px-6 bg-noir text-white text-xs uppercase tracking-[0.16em] font-semibold hover:bg-noir/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting Requirements...' : 'Submit Requirements'}
          </button>

          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:w-auto py-3.5 px-6 bg-white border border-noir text-noir text-xs uppercase tracking-[0.16em] font-semibold hover:bg-ivory transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4 text-emerald"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              />
            </svg>
            Quick WhatsApp
          </a>
        </div>
      </div>
    </form>
  );
}
