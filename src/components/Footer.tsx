import React from 'react';
import { 
  Compass, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Heart, 
  Volume2, 
  QrCode,
  HardDrive,
  CreditCard,
  Building,
  Anchor
} from 'lucide-react';
import { 
  HOTLINE_PRIMARY, 
  HOTLINE_SECONDARY, 
  HOTLINE_COXS_BAZAR, 
  HOTLINE_ST_MARTIN, 
  SUPPORT_EMAIL, 
  OFFICIAL_LICENSE 
} from '../data/travelData';

interface FooterProps {
  lang: 'bn' | 'en';
  onOpenVoiceStudio: () => void;
  onOpenVerifyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenVoiceStudio,
  onOpenVerifyModal,
}) => {
  return (
    <footer className="bg-[#07162C] text-slate-400 text-xs border-t border-slate-800">
      
      {/* Payment Methods & Accreditations Banner (ShareTrip & Wego style) */}
      <div className="border-b border-slate-800/80 bg-[#051122] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-300">
            <span className="text-[11px] font-bold uppercase text-slate-500 mr-1">
              {lang === 'bn' ? 'অনুমোদিত পেমেন্ট পার্টনার:' : 'We Accept:'}
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-bold text-pink-400 text-xs">
              bKash
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-bold text-orange-400 text-xs">
              Nagad
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-bold text-blue-400 text-xs">
              VISA
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-bold text-amber-400 text-xs">
              Mastercard
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-bold text-cyan-400 text-xs">
              AMEX
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg font-bold text-emerald-400 text-xs">
              0% EMI
            </span>
          </div>

          {/* Regulatory Accreditation */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>BIWTA Authorized</span>
            </span>
            <span>•</span>
            <span>Bangladesh Tourism Board Certified</span>
            <span>•</span>
            <span>ATAB Member</span>
          </div>

        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info & Hotlines */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-emerald-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-2xl text-white tracking-tight">
                  Tripbooking<span className="text-cyan-400">.ai</span>
                </span>
                <span className="ml-2 text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {OFFICIAL_LICENSE}
                </span>
              </div>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed text-xs">
              {lang === 'bn'
                ? '🌊 প্ল্যানিং থেকে বুকিং—আপনার ট্রিপ হ্যাসেল-ফ্রি করতে পাশে আছে TripBooking। কক্সবাজার ও সেন্টমার্টিনের ১০০% অথেনটিক শিপ ও রিসোর্ট বুকিং সেবা।'
                : '🌊 From planning to boarding—TripBooking makes your holiday hassle-free. Authentic St. Martin ship tickets & confirmed beachfront resort reservations.'}
            </p>

            {/* Authentic Hotline Directory */}
            <div className="space-y-3 pt-3 border-t border-slate-800 text-slate-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    {lang === 'bn' ? 'কেন্দ্রীয় ২৪/৭ আইপি হটলাইন:' : '24/7 IP Phone Hotline:'}
                  </span>
                  <a href={`tel:${HOTLINE_PRIMARY}`} className="text-white hover:text-cyan-400 font-extrabold text-sm flex items-center gap-1.5 mt-0.5">
                    <PhoneCall className="w-4 h-4 text-cyan-400" />
                    <span>{HOTLINE_PRIMARY}</span>
                  </a>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    {lang === 'bn' ? 'হোয়াটসঅ্যাপ ডিরেক্ট সাপোর্ট:' : 'Direct WhatsApp Desk:'}
                  </span>
                  <a href={`https://wa.me/8801576466092`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-extrabold text-sm flex items-center gap-1.5 mt-0.5">
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                    <span>{HOTLINE_SECONDARY}</span>
                  </a>
                </div>
              </div>

              {/* Physical Desks */}
              <div className="text-[11px] text-slate-400 pt-1 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>কক্সবাজার ঘাট: নুনিয়ারছড়া বিআইডব্লিউটিএ প্যাসেঞ্জার টার্মিনাল ({HOTLINE_COXS_BAZAR})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Anchor className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>সেন্টমার্টিন পয়েন্ট: প্রধান কোরাল জেটি ঘাট ও পূর্ব বিচ ডেস্ক ({HOTLINE_ST_MARTIN})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>হেড অফিস: সিলভার টাওয়ার, লেভেল ৮, গুলশান ১, ঢাকা-১২১২</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-cyan-400">{SUPPORT_EMAIL}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              {lang === 'bn' ? 'সেবাসমূহ ও বুকিং' : 'Services & Booking'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#ships" className="hover:text-cyan-400 transition">
                  {lang === 'bn' ? 'এমভি বে ওয়ান ও কর্ণফুলী এক্সপ্রেস' : 'MV Bay One & Karnafuly Cruise'}
                </a>
              </li>
              <li>
                <a href="#resorts" className="hover:text-cyan-400 transition">
                  {lang === 'bn' ? 'কোরাল ভিউ ও প্রাসাদ প্যারাডাইস' : 'Beachfront Verified Resorts'}
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-cyan-400 transition">
                  {lang === 'bn' ? 'অল-ইনক্লুসিভ কাপল ও ফ্যামিলি প্যাকেজ' : 'All-Inclusive Island Packages'}
                </a>
              </li>
              <li>
                <a href="#weather" className="hover:text-cyan-400 transition">
                  {lang === 'bn' ? 'সেন্টমার্টিন লাইভ আবহাওয়া ও সংকেত' : 'Real-Time Island Marine Weather'}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenVerifyModal}
                  className="hover:text-emerald-400 transition flex items-center gap-1 cursor-pointer"
                >
                  <QrCode className="w-3 h-3 text-emerald-400" />
                  <span>{lang === 'bn' ? 'QR ট্রাভেল পাস ভেরিফাই' : 'Verify QR Travel Pass'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Technology & Integrations */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              {lang === 'bn' ? 'প্রযুক্তি ও ইন্টিগ্রেশন' : 'Technology & Cloud'}
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {lang === 'bn'
                ? 'ক্লাউড ফায়ারস্টোর ডাটাবেজ, গুগল ড্রাইভ স্টোরেজ এবং রিয়েল-টাইম Gemini 3.8 Flash TTS ভয়েস ইঞ্জিন দ্বারা সুরক্ষিত।'
                : 'Backed by Cloud Firestore, Google Drive storage integration, and Gemini 3.8 Flash TTS speech generation.'}
            </p>
            <div className="space-y-2">
              <button
                onClick={onOpenVoiceStudio}
                className="w-full inline-flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-slate-850 transition text-xs font-semibold cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>gemini-3.8-flash-tts</span>
                </div>
                <span className="text-[10px] text-slate-500">24kHz Audio</span>
              </button>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Google Drive Workspace Enabled</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px]">
          <div>
            © {new Date().getFullYear()} Tripbooking.ai • {OFFICIAL_LICENSE} • All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-500">
            <span>১০০% অথেনটিক ডিল</span>
            <span>•</span>
            <span>BIWTA অনুমোদিত ঘাট সার্ভিস</span>
            <span>•</span>
            <span>Google Drive & Firebase Secured</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
