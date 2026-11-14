import React from 'react';
import { 
  Compass, 
  ShieldCheck, 
  Heart, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Award,
  Users,
  Anchor
} from 'lucide-react';
import { BRAND } from '../../data/pothikData';

interface AboutPageProps {
  lang: 'en' | 'bn';
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  lang,
  onOpenEnquiry,
}) => {
  return (
    <div className="py-10 sm:py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Brand Hero Story */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F1E6] text-[#176B52] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#E6B94F]" />
          <span>{BRAND.tagline}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#25332D]">
          {lang === 'bn' ? 'পথিকের গল্প ও আদর্শ' : 'The Story Behind POTHIK'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {lang === 'bn'
            ? 'পথিক মানে এক পরিব্রাজক বা ভ্রমণপিপাসু। আমরা বিশ্বাস করি প্রতিটি যাত্রাই একটি নতুন গল্পের জন্ম দেয়, প্রতিটি গন্তব্য তৈরি করে নতুন স্মৃতি, আর প্রতিটি ভ্রমণকারী প্রাপ্য নির্ভরতার পূর্ণ নিরাপত্তা।'
            : 'POTHIK represents a traveler or wanderer. We believe every journey creates a story, every destination offers an experience, and every traveler deserves reliable support.'}
        </p>
      </div>

      {/* Brand Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-[#F6F1E6] border border-[#E6B94F]/30 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#176B52] text-[#E6B94F] flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-[#25332D]">
            {lang === 'bn' ? 'আমাদের লক্ষ্য (Mission)' : 'Our Mission'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {lang === 'bn'
              ? 'নির্ভরযোগ্য ট্রাভেল সেবা এবং ব্যক্তিগত সহায়তার মাধ্যমে ভ্রমণকে আরও সহজ, সুলভ ও অর্থপূর্ণ করে তোলা।'
              : 'Make travel easier, more accessible and more meaningful through reliable travel services and personalized support.'}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#176B52] text-white space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E6B94F] text-[#25332D] flex items-center justify-center font-bold">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            {lang === 'bn' ? 'আমাদের রূপকল্প (Vision)' : 'Our Vision'}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            {lang === 'bn'
              ? 'একটি বিশ্বস্ত ট্রাভেল সঙ্গী হিসেবে বাংলাদেশকে বিশ্বের নান্দনিক সব গন্তব্যের সাথে সংযুক্ত করা।'
              : 'Become a trusted travel companion connecting Bangladesh with destinations around the world.'}
          </p>
        </div>
      </div>

      {/* Brand Personality Values */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block mb-1">
            {lang === 'bn' ? 'আমাদের মূলনীতি' : 'Core Values'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#25332D]">
            {lang === 'bn' ? 'যে মূলনীতিতে আমরা অবিচল' : 'The Pillars of POTHIK'}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          {[
            { title: 'Trustworthy', titleBn: 'বিশ্বস্ততা', desc: 'Verified suppliers only' },
            { title: 'Professional', titleBn: 'পেশাদারিত্ব', desc: 'Expert travel consultants' },
            { title: 'Adventurous', titleBn: 'অ্যাডভেঞ্চার', desc: 'Exploring hidden trails' },
            { title: 'Friendly', titleBn: 'আন্তরিকতা', desc: 'Welcoming support' },
            { title: 'Modern', titleBn: 'আধুনিক প্রযুক্তি', desc: 'Digital passes & QR' },
            { title: 'Customer-focused', titleBn: 'গ্রাহককেন্দ্রিক', desc: 'Your comfort first' },
          ].map((val, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
              <span className="font-extrabold text-sm text-[#176B52] font-heading block">
                {lang === 'bn' ? val.titleBn : val.title}
              </span>
              <span className="text-[11px] text-slate-500 block leading-tight">
                {val.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Physical Concierge Desks & Licenses */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <span className="text-xs font-bold text-[#176B52] uppercase tracking-wider block mb-1">
            {lang === 'bn' ? 'লাইসেন্স ও অনুমোদন' : 'Accreditations'}
          </span>
          <h4 className="font-extrabold text-base text-[#25332D]">
            ATAB & BIWTA Registered
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {BRAND.license} • {BRAND.biwtaLicense}
          </p>
        </div>

        <div>
          <span className="text-xs font-bold text-[#176B52] uppercase tracking-wider block mb-1">
            {lang === 'bn' ? 'হেড অফিস ঢাকা' : 'Dhaka Headquarters'}
          </span>
          <h4 className="font-extrabold text-base text-[#25332D]">
            Gulshan 1, Dhaka
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'bn' ? BRAND.addressDhakaBn : BRAND.addressDhaka}
          </p>
        </div>

        <div>
          <span className="text-xs font-bold text-[#176B52] uppercase tracking-wider block mb-1">
            {lang === 'bn' ? 'কক্সবাজার ঘাট অফিস' : 'Marine Jetty Desk'}
          </span>
          <h4 className="font-extrabold text-base text-[#25332D]">
            Nuniar Chhara BIWTA Terminal
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Direct vessel boarding support for Saint Martin ships.
          </p>
        </div>
      </div>

    </div>
  );
};
