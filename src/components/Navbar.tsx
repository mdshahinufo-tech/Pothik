import React, { useState } from 'react';
import { 
  PhoneCall, 
  ShieldCheck, 
  Ship, 
  Building2, 
  QrCode, 
  Menu, 
  X,
  Volume2,
  HardDrive,
  LogOut,
  User as UserIcon,
  ChevronDown,
  Palmtree,
  CheckCircle2
} from 'lucide-react';
import { 
  BRAND_NAME,
  BRAND_NAME_BN,
  BRAND_SLOGAN,
  HOTLINE_PRIMARY, 
  HOTLINE_SECONDARY, 
  HOTLINE_COXS_BAZAR 
} from '../data/travelData';
import { User } from 'firebase/auth';

interface NavbarProps {
  lang: 'bn' | 'en';
  setLang: (lang: 'bn' | 'en') => void;
  onOpenVoiceStudio: () => void;
  onOpenVerifyModal: () => void;
  onOpenBooking: () => void;
  currentUser: User | null;
  onOpenDriveModal: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
  activeTab?: 'ships' | 'resorts' | 'packages' | 'pass';
  onSelectNavTab?: (tab: 'ships' | 'resorts' | 'packages' | 'pass') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  onOpenVoiceStudio,
  onOpenVerifyModal,
  onOpenBooking,
  currentUser,
  onOpenDriveModal,
  onSignIn,
  onSignOut,
  activeTab = 'ships',
  onSelectNavTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);

  const handleNavClick = (tab: 'ships' | 'resorts' | 'packages' | 'pass') => {
    if (onSelectNavTab) {
      onSelectNavTab(tab);
    }
    const el = document.getElementById(tab);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      
      {/* Top Utility Information Strip */}
      <div className="bg-[#00482B] text-emerald-100 text-[11px] sm:text-xs py-1.5 px-4 font-medium border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          {/* Trust Tag */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <span className="text-emerald-50 font-semibold tracking-wide">
              {lang === 'bn' 
                ? '১০০% ভেরিফাইড টিকিট ও সরকারি QR পাস গ্যারান্টি' 
                : '100% Verified Tickets & Official QR Pass Guarantee'}
            </span>
          </div>

          {/* Quick Hotlines & Currency */}
          <div className="flex items-center gap-4 text-xs">
            
            {/* Phone dropdown */}
            <div className="relative">
              <button
                onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)}
                className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{HOTLINE_PRIMARY}</span>
                <ChevronDown className="w-3 h-3 text-emerald-300" />
              </button>

              {phoneDropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl p-3 shadow-2xl z-50 text-xs space-y-2 text-slate-300 animate-in fade-in"
                  onMouseLeave={() => setPhoneDropdownOpen(false)}
                >
                  <div className="font-bold text-white border-b border-slate-800 pb-1.5 flex items-center justify-between">
                    <span>{lang === 'bn' ? 'অফিসিয়াল হেল্পলাইন' : 'Official Helpdesk'}</span>
                    <span className="text-[10px] text-emerald-400 font-normal">২৪/৭ একটিভ</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'সেন্ট্রাল আইপি হটলাইন:' : 'Central IP Hotline:'}</span>
                    <a href={`tel:${HOTLINE_PRIMARY}`} className="text-white hover:text-amber-300 font-bold">{HOTLINE_PRIMARY}</a>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'হোয়াটসঅ্যাপ সাপোর্ট:' : 'WhatsApp Support:'}</span>
                    <a href={`tel:${HOTLINE_SECONDARY}`} className="text-emerald-400 hover:text-emerald-300 font-bold">{HOTLINE_SECONDARY}</a>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'কক্সবাজার নুনিয়ারছড়া জেটি ঘাট:' : "Cox's Bazar Jetty Desk:"}</span>
                    <a href={`tel:${HOTLINE_COXS_BAZAR}`} className="text-slate-200 hover:text-white font-semibold">{HOTLINE_COXS_BAZAR}</a>
                  </div>
                </div>
              )}
            </div>

            <span className="text-emerald-700 hidden sm:inline">|</span>

            <a 
              href={`https://wa.me/8801576466092`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:inline-flex items-center gap-1 text-emerald-200 hover:text-white font-semibold"
            >
              <span>WhatsApp: {HOTLINE_SECONDARY}</span>
            </a>

            <span className="text-emerald-700 hidden md:inline">|</span>

            {/* Currency */}
            <span className="text-emerald-100 font-bold">BDT (৳)</span>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Official Uploaded Image */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-3 group">
              <div className="h-14 w-auto flex items-center justify-center py-1">
                <img 
                  src="/assets/aistudio/POTHIK_Logo_with_Airborne_Road_Emblem_a02d98b0.png" 
                  alt="POTHIK Logo" 
                  className="h-12 w-auto object-contain transition group-hover:scale-105 duration-200" 
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-2xl tracking-tight text-[#005A36]">
                    POTHIK
                  </span>
                  <span className="font-semibold text-sm text-amber-600">
                    পথিক
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium italic -mt-0.5 hidden sm:inline">
                  Every Road Leads Somewhere.
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links (Clean & Direct) */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('ships')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ships'
                  ? 'bg-emerald-50 text-[#005A36] font-bold border border-emerald-200/80 shadow-2xs'
                  : 'hover:text-[#005A36] hover:bg-slate-50'
              }`}
            >
              <Ship className={`w-4 h-4 ${activeTab === 'ships' ? 'text-[#005A36]' : 'text-slate-500'}`} />
              <span>{lang === 'bn' ? 'জাহাজ ও ক্রুজ' : 'Ships & Cruise'}</span>
            </button>

            <button
              onClick={() => handleNavClick('resorts')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'resorts'
                  ? 'bg-emerald-50 text-[#005A36] font-bold border border-emerald-200/80 shadow-2xs'
                  : 'hover:text-[#005A36] hover:bg-slate-50'
              }`}
            >
              <Building2 className={`w-4 h-4 ${activeTab === 'resorts' ? 'text-[#005A36]' : 'text-slate-500'}`} />
              <span>{lang === 'bn' ? 'রিসোর্ট বুকিং' : 'Resorts'}</span>
            </button>

            <button
              onClick={() => handleNavClick('packages')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'packages'
                  ? 'bg-emerald-50 text-[#005A36] font-bold border border-emerald-200/80 shadow-2xs'
                  : 'hover:text-[#005A36] hover:bg-slate-50'
              }`}
            >
              <Palmtree className={`w-4 h-4 ${activeTab === 'packages' ? 'text-[#005A36]' : 'text-slate-500'}`} />
              <span>{lang === 'bn' ? 'ট্যুর প্যাকেজ' : 'Packages'}</span>
            </button>

            <button
              onClick={() => {
                if (onSelectNavTab) onSelectNavTab('pass');
                onOpenVerifyModal();
              }}
              className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'pass'
                  ? 'bg-emerald-50 text-[#005A36] font-bold border border-emerald-200/80 shadow-2xs'
                  : 'hover:text-[#005A36] hover:bg-slate-50'
              }`}
            >
              <QrCode className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'bn' ? 'পাস যাচাই' : 'Verify Pass'}</span>
            </button>
          </nav>

          {/* Tools, Auth & Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Google Drive Passes */}
            <button
              onClick={onOpenDriveModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition border border-slate-200 cursor-pointer whitespace-nowrap"
              title="Google Drive Travel Documents"
            >
              <HardDrive className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden xl:inline">{lang === 'bn' ? 'গুগল ড্রাইভ' : 'Google Drive'}</span>
            </button>

            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition cursor-pointer whitespace-nowrap"
            >
              {lang === 'bn' ? 'English' : 'বাংলা'}
            </button>

            {/* Google Auth Profile or Sign-in */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 transition cursor-pointer"
                >
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Avatar" className="w-6 h-6 rounded-full" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#005A36] text-white flex items-center justify-center text-[10px] font-bold">
                      {currentUser.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-800 max-w-[80px] truncate">
                    {currentUser.displayName?.split(' ')[0] || 'Traveler'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1 animate-in fade-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100">
                      <span className="font-bold text-slate-900 block truncate">{currentUser.displayName}</span>
                      <span className="text-[11px] text-slate-500 truncate block">{currentUser.email}</span>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenDriveModal();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-blue-50 text-slate-700 font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <HardDrive className="w-4 h-4 text-blue-600" />
                      <span>{lang === 'bn' ? 'ড্রাইভ ট্রাভেল পাস' : 'Google Drive Passes'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>{lang === 'bn' ? 'লগআউট' : 'Sign out'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs shadow-2xs transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                title="Sign in with Google to sync Drive passes"
              >
                <UserIcon className="w-3.5 h-3.5 text-blue-600" />
                <span>{lang === 'bn' ? 'সাইন ইন' : 'Sign In'}</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 bg-gradient-to-r from-[#005A36] to-[#00482B] hover:from-[#006E42] hover:to-[#005A36] text-white text-xs font-bold rounded-xl shadow-md transition transform active:scale-95 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 border border-emerald-700"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>{lang === 'bn' ? 'স্লট বুক করুন' : 'Book Slot'}</span>
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">
              {lang === 'bn' ? 'ভাষা নির্বাচন:' : 'Language:'}
            </span>
            <button
              onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
              className="px-3 py-1 text-xs font-bold rounded-lg border border-slate-300 text-slate-700"
            >
              {lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
            </button>
          </div>

          {/* User Status in Mobile */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Avatar" className="w-7 h-7 rounded-full" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#005A36] text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.displayName?.[0] || 'U'}
                  </div>
                )}
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block truncate">{currentUser.displayName}</span>
                  <span className="text-[10px] text-slate-500">Google Drive Connected</span>
                </div>
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="w-full py-2 bg-white border border-slate-300 text-slate-800 text-xs font-bold rounded-lg flex items-center justify-center gap-2"
              >
                <UserIcon className="w-4 h-4 text-blue-600" />
                <span>{lang === 'bn' ? 'Google দিয়ে সাইন ইন করুন' : 'Sign in with Google'}</span>
              </button>
            )}

            {currentUser && (
              <button onClick={onSignOut} className="text-xs text-rose-600 font-semibold p-1">
                {lang === 'bn' ? 'লগআউট' : 'Sign out'}
              </button>
            )}
          </div>

          <button 
            onClick={() => { setMobileMenuOpen(false); handleNavClick('ships'); }}
            className="w-full text-left py-2.5 text-base font-semibold text-slate-800 hover:text-[#005A36] flex items-center gap-2"
          >
            <Ship className="w-5 h-5 text-[#005A36]" />
            <span>{lang === 'bn' ? 'জাহাজ ও ক্রুজ টিকিট' : 'Ship Tickets'}</span>
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); handleNavClick('resorts'); }}
            className="w-full text-left py-2.5 text-base font-semibold text-slate-800 hover:text-[#005A36] flex items-center gap-2"
          >
            <Building2 className="w-5 h-5 text-[#005A36]" />
            <span>{lang === 'bn' ? 'রিসোর্ট বুকিং' : 'Resort Booking'}</span>
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); handleNavClick('packages'); }}
            className="w-full text-left py-2.5 text-base font-semibold text-slate-800 hover:text-[#005A36] flex items-center gap-2"
          >
            <Palmtree className="w-5 h-5 text-[#005A36]" />
            <span>{lang === 'bn' ? 'ট্যুর প্যাকেজ' : 'Tour Packages'}</span>
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenVerifyModal(); }}
            className="w-full text-left py-2.5 text-base font-semibold text-emerald-800 flex items-center gap-2"
          >
            <QrCode className="w-5 h-5 text-[#005A36]" />
            <span>{lang === 'bn' ? 'QR ট্রাভেল পাস ভেরিফাই' : 'Verify QR Travel Pass'}</span>
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenDriveModal(); }}
            className="w-full text-left py-2.5 text-base font-semibold text-blue-700 flex items-center gap-2"
          >
            <HardDrive className="w-5 h-5 text-blue-600" />
            <span>{lang === 'bn' ? 'গুগল ড্রাইভ ট্রিপ পাস' : 'Google Drive Passes'}</span>
          </button>

          <div className="pt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full py-3 bg-gradient-to-r from-[#005A36] to-[#00482B] text-white font-bold rounded-xl text-center shadow"
            >
              {lang === 'bn' ? '১০০% নিশ্চিত স্লট বুক করুন' : 'Confirm Authentic Slot'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
