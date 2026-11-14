import React from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Trash2, 
  Compass, 
  Anchor, 
  PhoneCall, 
  MessageSquare
} from 'lucide-react';
import { HOTLINE_PRIMARY, HOTLINE_SECONDARY } from '../data/travelData';
import { IslandWeatherWidget } from './IslandWeatherWidget';

interface AdvisorySectionProps {
  lang: 'bn' | 'en';
  onBookDate?: (dateStr: string) => void;
}

export const AdvisorySection: React.FC<AdvisorySectionProps> = ({ lang, onBookDate }) => {
  const whatsappUrlPrimary = `https://wa.me/8801576466092?text=${encodeURIComponent('Hello POTHIK, I want to book authentic Saint Martin ship tickets and resort.')}`;
  const whatsappUrlSecondary = `https://wa.me/8801576466092?text=${encodeURIComponent('Hello POTHIK, I want to confirm my travel pass.')}`;

  return (
    <section id="weather" className="py-14 sm:py-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading - Clean & Minimal */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === 'bn' ? 'সেন্টমার্টিন আবহাওয়া ও নির্দেশিকা' : 'Island Weather & Guidelines'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            {lang === 'bn'
              ? 'স্যাটেলাইট ডাটা, সি-স্টেট সংকেত ও পরিবেশবান্ধব ভ্রমণ নির্দেশিকা।'
              : 'Satellite weather data, marine sea-state advisories, and eco-guidelines.'}
          </p>
        </div>

        {/* Real-Time Saint Martin Weather & Trip Planning Widget */}
        <div className="mb-14">
          <IslandWeatherWidget lang={lang} onBookDate={onBookDate} />
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">
              {lang === 'bn' ? 'জাতীয় পরিচয়পত্র ও ট্রাভেল পাস' : 'NID & QR Travel Pass'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'ঘাটে ও জাহাজে ওঠার সময় প্রত্যেক প্রাপ্তবয়স্ক যাত্রীর জাতীয় পরিচয়পত্র (NID) অথবা পাসপোর্টের কপি এবং Tripbooking.ai থেকে প্রাপ্ত QR কোডেড ট্রাভেল পাস প্রিন্ট বা মোবাইলে প্রদর্শন বাধ্যতামূলক।'
                : 'Every adult tourist must present valid NID or Passport copy alongside their authentic Tripbooking.ai scannable QR Pass at ship boarding.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">
              {lang === 'bn' ? 'প্লাস্টিক ও কোরাল সুরক্ষা আইন' : 'Zero Plastic & Coral Protection'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'সেন্টমার্টিন একটি প্রতিবেশগত সংকটাপন্ন এলাকা (ECA)। সৈকতে চিপস, পানির বোতল বা প্লাস্টিক ফেলা সম্পূর্ণ নিষিদ্ধ। প্রবাল বা শামুক-ঝিনুক কেনাবেচা ও নিয়ে আসা আইনত অপরাধ।'
                : 'Saint Martin is an ecologically critical zone. Single-use polythenes are prohibited. Extracting or purchasing live coral from Chhera Dwip is strictly illegal.'}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Anchor className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-white">
              {lang === 'bn' ? 'জাহাজ ছাড়ার সময়ানুবর্তিতা' : 'Ship Boarding Timing'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'bn'
                ? 'কক্সবাজার নুনিয়ারছড়া জেটি বা টেকনাফ দমদমিয়া ঘাটে জাহাজ ছাড়ার কমপক্ষে ৪৫ মিনিট পূর্বে উপস্থিত হওয়া বাঞ্ছনীয়। জোয়ার-ভাটার ওপর ভিত্তি করে জাহাজ কর্তৃপক্ষ নির্ধারিত সময় কঠোরভাবে মেনে চলে।'
                : 'Report to Cox’s Bazar or Teknaf jetty at least 45 minutes prior to scheduled departure. Island cruise schedules are strictly tide-dependent.'}
            </p>
          </div>

        </div>

        {/* Immediate Call / Contact Action Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-cyan-900 to-slate-900 border border-teal-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
              {lang === 'bn' ? 'কোনো সংশয় বা বিশেষ কাস্টম প্যাকেজ প্রয়োজন?' : 'Have Questions or Need Group Deals?'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'bn' ? 'আজই আপনার সেন্টমার্টিন ট্রিপ কনফার্ম করুন' : 'Confirm Your Saint Martin Trip Today'}
            </h3>
            <p className="text-xs text-slate-300">
              {lang === 'bn' ? 'সরাসরি আমাদের ট্রাভেল স্পেশালিস্টদের সাথে কথা বলুন' : 'Speak directly with our island travel specialists'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${HOTLINE_PRIMARY}`}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-slate-950" />
              <span>{HOTLINE_PRIMARY}</span>
            </a>

            <a
              href={`tel:${HOTLINE_SECONDARY}`}
              className="px-5 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-sm transition shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>{HOTLINE_SECONDARY}</span>
            </a>

            <a
              href={whatsappUrlSecondary}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 font-bold text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
