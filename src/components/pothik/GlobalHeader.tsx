import React, { useState } from 'react';
import { 
  PhoneCall, 
  Menu, 
  X, 
  Globe, 
  Send, 
  ShieldCheck, 
  Compass, 
  Plane, 
  Building2, 
  Palmtree, 
  FileText, 
  HelpCircle, 
  User, 
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { BRAND } from '../../data/pothikData';
import { PageView } from '../../types/pothik';
import { PWAInstallButton } from './PWAInstallPrompt';

interface GlobalHeaderProps {
  lang: 'en' | 'bn';
  setLang: (lang: 'en' | 'bn') => void;
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenEnquiry: (serviceType?: string, destination?: string) => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  lang,
  setLang,
  currentPage,
  onNavigate,
  onOpenEnquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageView; labelEn: string; labelBn: string }[] = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম' },
    { id: 'destinations', labelEn: 'Destinations', labelBn: 'গন্তব্য' },
    { id: 'packages', labelEn: 'Tour Packages', labelBn: 'ট্যুর প্যাকেজ' },
    { id: 'flights', labelEn: 'Flights', labelBn: 'ফ্লাইট' },
    { id: 'hotels', labelEn: 'Hotels', labelBn: 'হোটেল' },
    { id: 'visa', labelEn: 'Visa Assistance', labelBn: 'ভিসা সেবা' },
    { id: 'blog', labelEn: 'Travel Guide', labelBn: 'ভ্রমণ গাইড' },
    { id: 'about', labelEn: 'About Us', labelBn: 'আমাদের সম্পর্কে' },
    { id: 'contact', labelEn: 'Contact', labelBn: 'যোগাযোগ' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F6F1E6] shadow-xs">
      
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#176B52] text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Trust guarantee */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E6B94F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E6B94F]"></span>
            </span>
            <span className="font-medium tracking-wide">
              {lang === 'bn' 
                ? 'পথিক (POTHIK) — বিশ্বস্ত ট্রাভেল পার্টনার · সরকারি লাইসেন্সপ্রাপ্ত' 
                : 'POTHIK — Certified International & Domestic Travel Concierge'}
            </span>
          </div>

          {/* Single Unified Contact Number */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <a 
                href="tel:01576466092"
                className="inline-flex items-center gap-1.5 text-white/95 hover:text-[#E6B94F] transition font-bold"
                title="Call 01576466092"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#E6B94F]" />
                <span>01576466092</span>
              </a>
              <a 
                href="https://wa.me/8801576466092"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[10px] font-bold bg-[#25D366]/20 text-emerald-300 hover:bg-[#25D366]/30 px-1.5 py-0.5 rounded border border-emerald-400/30"
                title="WhatsApp 01576466092"
              >
                WhatsApp
              </a>
            </div>

            <span className="text-white/30 hidden md:inline">|</span>

            {/* Admin Dashboard shortcut */}
            <button
              onClick={() => onNavigate('admin')}
              className={`hidden md:inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded transition ${
                currentPage === 'admin' 
                  ? 'bg-[#E6B94F] text-[#25332D] font-bold' 
                  : 'text-white/80 hover:text-white'
              }`}
              title="Admin Portal"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin'}</span>
            </button>

            <span className="text-white/30">|</span>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] transition cursor-pointer"
            >
              <Globe className="w-3 h-3 text-[#E6B94F]" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Brand Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Supplied Emblem Asset */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <img 
                src="/assets/aistudio/POTHIK_Logo_with_Airborne_Road_Emblem_a02d98b0.png" 
                alt="POTHIK Logo" 
                className="h-12 w-auto object-contain transition group-hover:scale-105 duration-200" 
              />
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-2xl tracking-tight text-[#176B52] font-heading">
                    POTHIK
                  </span>
                  <span className="font-semibold text-sm text-[#E6B94F]">
                    পথিক
                  </span>
                </div>
                <span className="text-[11px] text-[#25332D]/70 font-medium italic -mt-0.5 hidden sm:inline">
                  Every Road Leads Somewhere.
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold text-[#25332D]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-2 rounded-xl transition cursor-pointer ${
                  currentPage === link.id
                    ? 'text-[#176B52] font-bold bg-[#F6F1E6]'
                    : 'hover:text-[#176B52] hover:bg-slate-50'
                }`}
              >
                {lang === 'bn' ? link.labelBn : link.labelEn}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-5 py-2.5 bg-[#176B52] hover:bg-[#104C3A] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition transform active:scale-95 cursor-pointer flex items-center gap-2 border border-[#176B52]"
            >
              <Send className="w-3.5 h-3.5 text-[#E6B94F]" />
              <span>{lang === 'bn' ? 'ট্রিপ প্ল্যান করুন' : 'Plan Your Trip'}</span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-3 py-1.5 bg-[#176B52] text-white rounded-lg text-xs font-bold sm:hidden"
            >
              {lang === 'bn' ? 'প্ল্যান করুন' : 'Plan'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#25332D] hover:bg-slate-100 rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#F6F1E6] bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in fade-in">
          <div className="flex justify-between items-center py-2 border-b border-slate-100 mb-2">
            <span className="text-xs text-slate-500 font-medium">
              {lang === 'bn' ? 'ভাষা পরিবর্তন:' : 'Language:'}
            </span>
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="px-3 py-1 text-xs font-bold rounded-lg border border-slate-300 text-[#176B52]"
            >
              {lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1 py-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 text-sm font-semibold rounded-lg transition ${
                  currentPage === link.id
                    ? 'bg-[#F6F1E6] text-[#176B52] font-bold'
                    : 'text-[#25332D] hover:bg-slate-50'
                }`}
              >
                {lang === 'bn' ? link.labelBn : link.labelEn}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <PWAInstallButton lang={lang} variant="header" />

            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4 text-[#176B52]" />
              <span>{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3 bg-[#176B52] hover:bg-[#104C3A] text-white font-bold rounded-xl text-center shadow flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#E6B94F]" />
              <span>{lang === 'bn' ? 'আপনার ট্রিপ প্ল্যান করুন' : 'Plan Your Trip'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
