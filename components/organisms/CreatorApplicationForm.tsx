'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  platform: string;
  followers: string;
  niche: string;
  city: string;
  pitch: string;
}

export default function CreatorApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    platform: 'Instagram',
    followers: '10K - 50K',
    niche: 'Bridal & Festive Glam',
    city: '',
    pitch: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateWhatsAppMessage = () => {
    return encodeURIComponent(
      `*Madamcutie Creator Collaboration Application*\n\n` +
      `👤 *Name:* ${formData.name || 'Not provided'}\n` +
      `📸 *Social Handle:* ${formData.instagram || 'Not provided'}\n` +
      `🌐 *Primary Platform:* ${formData.platform}\n` +
      `👥 *Followers:* ${formData.followers}\n` +
      `✨ *Content Niche:* ${formData.niche}\n` +
      `📍 *City:* ${formData.city || 'Not provided'}\n` +
      `📱 *Phone:* ${formData.phone || 'Not provided'}\n` +
      `✉️ *Email:* ${formData.email || 'Not provided'}\n\n` +
      `💬 *Creative Pitch:* ${formData.pitch || 'Looking forward to collaborating!'}`
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleDirectWhatsApp = () => {
    const text = generateWhatsAppMessage();
    const url = `https://api.whatsapp.com/send/?phone=919911852113&text=${text}&type=phone_number&app_absent=0&wame_ctl=1`;
    window.open(url, '_blank');
  };

  return (
    <div id="apply-form" className="w-full max-w-3xl mx-auto bg-white border border-hairline p-6 sm:p-10 lg:p-12 shadow-sm">
      {submitted ? (
        <div className="text-center py-12 px-4">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-ivory border border-gold flex items-center justify-center text-gold">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-noir mb-3">
            Application Received, Queen!
          </h3>
          <p className="text-noir/70 max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Thank you for reaching out to Madamcutie. Our PR & Creative Collaborations team will review your profile and get back to you within 24–48 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleDirectWhatsApp}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald text-white text-xs font-semibold uppercase tracking-[0.16em] hover:bg-emerald/90 transition-colors shadow-sm inline-flex items-center justify-center gap-2"
            >
              <span>Instant Chat on WhatsApp</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full sm:w-auto px-6 py-3.5 border border-hairline text-noir text-xs font-semibold uppercase tracking-[0.16em] hover:border-noir transition-colors"
            >
              Submit Another Profile
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="border-b border-hairline pb-4 mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gold mb-2">
              Official PR Form
            </p>
            <h3 className="font-display text-2xl sm:text-3xl text-noir">
              Creator Application
            </h3>
            <p className="text-xs sm:text-sm text-noir/60 mt-1">
              Share your details or send an instant pitch via WhatsApp
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-noir mb-2">
                Full Name <span className="text-pink-accent">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Radhika Sharma"
                className="w-full px-4 py-3 bg-ivory/50 border border-hairline focus:border-noir focus:bg-white focus:outline-none text-sm text-noir transition-colors"
              />
            </div>

            {/* Instagram / Social Handle */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-noir mb-2">
                Social Handle <span className="text-pink-accent">*</span>
              </label>
              <input
                type="text"
                name="instagram"
                required
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@yourhandle"
                className="w-full px-4 py-3 bg-ivory/50 border border-hairline focus:border-noir focus:bg-white focus:outline-none text-sm text-noir transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-noir mb-2">
                Email Address <span className="text-pink-accent">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="radhika@example.com"
                className="w-full px-4 py-3 bg-ivory/50 border border-hairline focus:border-noir focus:bg-white focus:outline-none text-sm text-noir transition-colors"
              />
            </div>

            {/* Phone / WhatsApp */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-noir mb-2">
                WhatsApp Number <span className="text-pink-accent">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 bg-ivory/50 border border-hairline focus:border-noir focus:bg-white focus:outline-none text-sm text-noir transition-colors"
              />
            </div>

            {/* Primary Platform */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-noir mb-2">
                Primary Platform
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-ivory/50 border border-hairline focus:border-noir focus:bg-white focus:outline-none text-sm text-noir transition-colors"
              >
                <option value="Instagram">Instagram (Reels & Posts)</option>
                <option value="YouTube">YouTube (Shorts & Longform)</option>
                <option value="TikTok">TikTok</option>
                <option value="Pinterest">Pinterest / Fashion Blog</option>
              </select>
            </div>

            {/* Follower Range */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-noir mb-2">
                Follower Count
              </label>
              <select
                name="followers"
                value={formData.followers}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-ivory/50 border border-hairline focus:border-noir focus:bg-white focus:outline-none text-sm text-noir transition-colors"
              >
                <option value="Under 10K (Micro-creator)">Under 10K (Micro-creator)</option>
                <option value="10K - 50K">10K - 50K</option>
                <option value="50K - 100K">50K - 100K</option>
                <option value="100K - 500K">100K - 500K</option>
                <option value="500K+">500K+</option>
              </select>
            </div>

            {/* Content Niche */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-noir mb-2">
                Content Niche
              </label>
              <select
                name="niche"
                value={formData.niche}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-ivory/50 border border-hairline focus:border-noir focus:bg-white focus:outline-none text-sm text-noir transition-colors"
              >
                <option value="Bridal & Festive Glam">Bridal & Festive Glam</option>
                <option value="GRWM & OOTD Styling">GRWM & OOTD Styling</option>
                <option value="Indo-Western Fusion">Indo-Western Fusion</option>
                <option value="Luxury Fashion & Editorial">Luxury Fashion & Editorial</option>
                <option value="Wedding Guest Looks">Wedding Guest Looks</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-noir mb-2">
                City / Location <span className="text-pink-accent">*</span>
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Delhi NCR, Mumbai, Bangalore"
                className="w-full px-4 py-3 bg-ivory/50 border border-hairline focus:border-noir focus:bg-white focus:outline-none text-sm text-noir transition-colors"
              />
            </div>
          </div>

          {/* Creative Pitch / Message */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-noir mb-2">
              Creative Vision or Links to Recent Content
            </label>
            <textarea
              name="pitch"
              rows={3}
              value={formData.pitch}
              onChange={handleChange}
              placeholder="Tell us why you love Madamcutie and share links to your favorite styling reels..."
              className="w-full px-4 py-3 bg-ivory/50 border border-hairline focus:border-noir focus:bg-white focus:outline-none text-sm text-noir transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 py-4 bg-noir text-white text-xs font-semibold uppercase tracking-[0.18em] hover:bg-noir/85 transition-all duration-300 shadow-md disabled:opacity-50"
            >
              {loading ? 'Submitting Application...' : 'Submit Application'}
            </button>

            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="w-full sm:w-auto px-6 py-4 bg-white text-noir border border-noir text-xs font-semibold uppercase tracking-[0.16em] hover:bg-noir hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald group-hover:bg-white transition-colors" />
              <span>DM on WhatsApp</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
