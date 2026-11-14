import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Globe,
  Anchor,
  Building,
  Facebook,
  Instagram,
  Linkedin,
  MessageSquare
} from 'lucide-react';
import { BRAND } from '../../data/pothikData';
import { PageView } from '../../types/pothik';
import { PWAInstallButton } from './PWAInstallPrompt';

interface GlobalFooterProps {
  lang: 'en' | 'bn';
  onNavigate: (page: PageView) => void;
}

export const GlobalFooter: React.FC<GlobalFooterProps> = ({
  lang,
  onNavigate,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(true);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterConsent) return;
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="bg-[#25332D] text-slate-300 text-xs border-t border-[#176B52]/30">
      
      {/* Newsletter Strip */}
      <div className="bg-[#176B52] py-10 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[#E6B94F] font-bold text-xs uppercase tracking-widest block mb-1">
              {lang === 'bn' ? 'সংযুক্ত থাকুন' : 'Stay Connected'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {lang === 'bn' ? 'আপনার পরবর্তী ভ্রমণের অনুপ্রেরণা নিন' : 'Get Inspired for Your Next Journey.'}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm mt-1.5">
              {lang === 'bn'
                ? 'বিশেষ ট্রাভেল অফার, নতুন গন্তব্য এবং মৌসুমী ছাড়ে আপডেট পেতে আমাদের নিউজলেটারে যুক্ত হোন।'
                : 'Receive exclusive holiday packages, visa advisory updates, and private flight fares straight to your inbox.'}
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 text-[#E6B94F] font-bold text-sm border border-[#E6B94F]/40">
                <CheckCircle2 className="w-5 h-5 text-[#E6B94F]" />
                <span>
                  {lang === 'bn' 
                    ? 'ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।' 
                    : 'Thank you! You are now subscribed to POTHIK Inspires.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    placeholder={lang === 'bn' ? 'আপনার ইমেইল অ্যাড্রেস...' : 'Enter your work or personal email...'}
                    className="w-full sm:w-72 px-4 py-3 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#E6B94F]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E6B94F] hover:bg-[#DDAA38] text-[#25332D] font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'সাবস্ক্রাইব করুন' : 'Subscribe'}</span>
                  </button>
                </div>
                <label className="flex items-center gap-2 text-[11px] text-white/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletterConsent}
                    onChange={(e) => setNewsletterConsent(e.target.checked)}
                    className="rounded text-[#E6B94F] focus:ring-[#E6B94F]"
                  />
                  <span>
                    {lang === 'bn' 
                      ? 'আমি ভ্রমণ সংক্রান্ত তথ্য ও নীতিমালার সাথে একমত।' 
                      : 'I agree to receive travel ideas and agree with POTHIK Privacy Policy.'}
                  </span>
                </label>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Directory Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/aistudio/POTHIK_Logo_with_Airborne_Road_Emblem_a02d98b0.png" 
                alt="POTHIK Logo" 
                className="h-12 w-auto object-contain bg-white rounded-lg p-1" 
              />
              <div>
                <span className="font-extrabold text-2xl text-white tracking-tight font-heading block">
                  POTHIK <span className="text-[#E6B94F]">পথিক</span>
                </span>
                <span className="text-[11px] text-slate-400 italic">
                  Every Road Leads Somewhere.
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              {lang === 'bn'
                ? 'পথিক ভ্রমণকারীদের একটি বিশ্বস্ত সহযোগী। কক্সবাজার ও সেন্টমার্টিন থেকে শুরু করে মালদ্বীপ, বালি, দুবাই ও ইউরোপের নিখুঁত ভ্রমণ পরিকল্পনা ও সহায়তায় আমরা আছি আপনার সাথে।'
                : 'POTHIK connects passionate travelers with extraordinary destinations worldwide. Offering seamless flight booking, verified hotel vouchers, curated packages and expert visa facilitation.'}
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#E6B94F] shrink-0" />
                <span className="text-slate-400">{lang === 'bn' ? 'হটলাইন ও হোয়াটসঅ্যাপ:' : 'Hotline & WhatsApp:'}</span>
                <a href="tel:01576466092" className="hover:text-white font-bold text-white tracking-wide">
                  01576466092
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a>
              </div>

              <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-400">
                <Building className="w-3.5 h-3.5 text-[#E6B94F] shrink-0 mt-0.5" />
                <span>{lang === 'bn' ? BRAND.addressDhakaBn : BRAND.addressDhaka}</span>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-slate-400">
                <Anchor className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{lang === 'bn' ? BRAND.addressCoxsBazarBn : BRAND.addressCoxsBazar}</span>
              </div>

              <div className="pt-2">
                <PWAInstallButton lang={lang} variant="footer" />
              </div>
            </div>
          </div>

          {/* Col 2: Travel Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              {lang === 'bn' ? 'ভ্রমণ সেবাসমূহ' : 'Travel Services'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'ট্যুর প্যাকেজ' : 'Holiday Tour Packages'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('flights')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'ফ্লাইট বুকিং ও এনকোয়ারি' : 'Flight Tickets & Booking'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hotels')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'হোটেল ও রিসোর্ট বুকিং' : 'Hotels & Luxury Resorts'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visa')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'ভিসা প্রসেসিং ও কনস্যুলার' : 'Visa Assistance & Checklist'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('enquiry')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'কাস্টমাইজড ট্রিপ প্ল্যান' : 'Custom Tailored Tours'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Destinations */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              {lang === 'bn' ? 'জনপ্রিয় গন্তব্য' : 'Top Destinations'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'সেন্টমার্টিন দ্বীপ ও ক্রুজ' : 'Saint Martin Island Cruise'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'মালদ্বীপ ওভারওয়াটার ভিলা' : 'Maldives Lagoon Escape'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'বালি ও নুসা পেনিদা' : 'Bali & Nusa Penida'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'দুবাই ও আবুধাবি' : 'Dubai & Abu Dhabi Safari'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'সাজেক ভ্যালি ও মেঘের রাজ্য' : 'Sajek Valley Cloud Peaks'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'কক্সবাজার সমুদ্র সৈকত' : 'Cox\'s Bazar Marine Drive'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-heading">
              {lang === 'bn' ? 'কোম্পানি ও নীতিমালা' : 'Company & Legal'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About POTHIK'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'যোগাযোগ ও সাপোর্ট' : 'Contact Us & Desks'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'ট্রাভেল গাইড ও ব্লগ' : 'Travel Guide & Inspiration'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'সাধারণ জিজ্ঞাসা (FAQ)' : 'Frequently Asked Questions'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'গোপনীয়তা নীতিমালা' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'শর্তাবলী ও নিয়মাবলী' : 'Terms & Conditions'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('refund')} className="hover:text-white transition cursor-pointer">
                  {lang === 'bn' ? 'বাতিল ও রিফান্ড নীতি' : 'Cancellation & Refund Policy'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Accreditations & Payment Methods */}
        <div className="pt-8 border-t border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="font-bold uppercase tracking-wider text-slate-500">
              {lang === 'bn' ? 'পেমেন্ট পার্টনার:' : 'Payment Partners:'}
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md font-bold text-pink-400">bKash</span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md font-bold text-orange-400">Nagad</span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md font-bold text-blue-400">VISA</span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md font-bold text-amber-400">Mastercard</span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md font-bold text-emerald-400">0% EMI Available</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400">
            <span className="inline-flex items-center gap-1 text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{BRAND.license}</span>
            </span>
            <span>•</span>
            <span>ATAB Member</span>
            <span>•</span>
            <span>BIWTA Authorized</span>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="pt-6 mt-6 border-t border-slate-800 text-center text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} POTHIK (পথিক). All rights reserved.
          </div>
          <div className="font-medium text-slate-400 italic">
            "POTHIK — Every Road Leads Somewhere."
          </div>
        </div>

      </div>

    </footer>
  );
};
