import React, { useState } from 'react';
import { 
  Plane, 
  Building2, 
  Palmtree, 
  Search, 
  Calendar, 
  Users, 
  MapPin, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  FileCheck, 
  Headphones, 
  HeartHandshake, 
  Compass, 
  Globe2, 
  Send,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  BRAND, 
  POPULAR_DESTINATIONS, 
  TOUR_PACKAGES, 
  VISA_GUIDES, 
  TESTIMONIALS, 
  BLOG_POSTS 
} from '../../data/pothikData';
import { Destination, TourPackage, PageView } from '../../types/pothik';

interface HomePageProps {
  lang: 'en' | 'bn';
  onNavigate: (page: PageView) => void;
  onSelectDestination: (dest: Destination) => void;
  onSelectPackage: (pkg: TourPackage) => void;
  onOpenEnquiry: (serviceType?: string, destination?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  onSelectDestination,
  onSelectPackage,
  onOpenEnquiry,
}) => {
  // Search Panel State
  const [activeSearchTab, setActiveSearchTab] = useState<'flights' | 'hotels' | 'packages'>('packages');
  
  // Flight Search inputs
  const [flightFrom, setFlightFrom] = useState('Dhaka (DAC)');
  const [flightTo, setFlightTo] = useState('Cox\'s Bazar (CXB)');
  const [flightDep, setFlightDep] = useState('');
  const [flightRet, setFlightRet] = useState('');
  const [flightPassengers, setFlightPassengers] = useState(2);

  // Hotel Search inputs
  const [hotelDest, setHotelDest] = useState('Saint Martin\'s Island');
  const [hotelCheckIn, setHotelCheckIn] = useState('');
  const [hotelCheckOut, setHotelCheckOut] = useState('');
  const [hotelGuests, setHotelGuests] = useState(2);

  // Package Search inputs
  const [pkgDest, setPkgDest] = useState('All Destinations');
  const [pkgMonth, setPkgMonth] = useState('Next Month');
  const [pkgTravelers, setPkgTravelers] = useState(2);
  const [pkgType, setPkgType] = useState('All');

  // Destination category filter
  const [destFilter, setDestFilter] = useState<'all' | 'international' | 'domestic'>('all');

  const filteredDestinations = POPULAR_DESTINATIONS.filter((d) => {
    if (destFilter === 'all') return true;
    return d.type === destFilter;
  });

  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenEnquiry('Flight', `${flightFrom} to ${flightTo}`);
  };

  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenEnquiry('Hotel', hotelDest);
  };

  const handlePackageSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenEnquiry('Package', pkgDest === 'All Destinations' ? 'Recommended Tours' : pkgDest);
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* SECTION 01 — HERO BANNER */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center text-white overflow-hidden">
        {/* Full-width cinematic destination photography */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85" 
            alt="POTHIK Hero Destination" 
            className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000"
          />
          {/* Subtle dark luxury overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#25332D]/90 via-[#25332D]/70 to-[#176B52]/50"></div>
          <div className="absolute inset-0 bg-radial-at-c from-transparent to-[#25332D]/80"></div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
          
          <div className="max-w-2xl space-y-6">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#E6B94F]/40 text-[#E6B94F] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#E6B94F]" />
              <span>{BRAND.name} ({BRAND.nameBn}) — {BRAND.tagline}</span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[#E6B94F]/60" />
              <span className="hidden sm:inline-block text-white/90 font-medium">
                {lang === 'bn' ? 'স্মার্ট এআই ট্রাভেল কনসিয়ার্জ' : 'AI Travel Concierge Active'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold font-heading tracking-tight leading-[1.15] text-white">
              {lang === 'bn' ? (
                <>
                  জগৎ হাতছানি দিচ্ছে।{' '}
                  <span className="text-[#E6B94F]">চলুন বেরিয়ে পড়া যাক।</span>
                </>
              ) : (
                <>
                  The World Is Waiting.{' '}
                  <span className="text-[#E6B94F]">Let's Go.</span>
                </>
              )}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal max-w-xl">
              {lang === 'bn'
                ? 'অসাধারণ সব গন্তব্য আবিষ্কার করুন, আকর্ষণীয় ট্রাভেল প্যাকেজ অন্বেষণ করুন এবং পথিকের বিশ্বস্ত সহায়তায় পরিকল্পনা করুন আপনার অবিস্মরণীয় ভ্রমণ।'
                : 'Discover extraordinary destinations, explore exciting travel packages and plan your next unforgettable journey with POTHIK.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('destinations')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#E6B94F] hover:bg-[#DDAA38] text-[#25332D] font-extrabold text-sm sm:text-base shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 font-heading"
              >
                <span>{lang === 'bn' ? 'গন্তব্য অন্বেষণ করুন' : 'Explore Destinations'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenEnquiry()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md font-bold text-sm sm:text-base transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#E6B94F]" />
                <span>{lang === 'bn' ? 'আপনার ট্রিপ প্ল্যান করুন' : 'Plan Your Trip'}</span>
              </button>
            </div>

          </div>

          {/* Quick Stats Capsule */}
          <div className="hidden lg:grid grid-cols-2 gap-4 w-72 text-left bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20">
            <div className="space-y-1">
              <span className="text-2xl font-extrabold text-[#E6B94F] font-heading">150+</span>
              <span className="text-xs text-white/80 block leading-tight">
                {lang === 'bn' ? 'যাচাইকৃত গন্তব্য ও রুট' : 'Verified Routes & Stays'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-extrabold text-[#E6B94F] font-heading">100%</span>
              <span className="text-xs text-white/80 block leading-tight">
                {lang === 'bn' ? 'গ্যারান্টিড শিপ ও রিসোর্ট' : 'Guaranteed PNR & QR Pass'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-extrabold text-[#E6B94F] font-heading">4.9★</span>
              <span className="text-xs text-white/80 block leading-tight">
                {lang === 'bn' ? 'কাস্টমার সন্তুষ্টি' : 'Customer Satisfaction'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-extrabold text-[#E6B94F] font-heading">24/7</span>
              <span className="text-xs text-white/80 block leading-tight">
                {lang === 'bn' ? 'হটলাইন ও সহায়তা' : 'Concierge Desk Active'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 02 — TRAVEL SEARCH PANEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 lg:-mt-24 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-[#F6F1E6]/70 p-2 gap-2 overflow-x-auto">
            
            <button
              onClick={() => setActiveSearchTab('packages')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                activeSearchTab === 'packages'
                  ? 'bg-white text-[#176B52] shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palmtree className={`w-4 h-4 ${activeSearchTab === 'packages' ? 'text-[#176B52]' : 'text-slate-400'}`} />
              <span>{lang === 'bn' ? 'ট্যুর প্যাকেজ' : 'Tour Packages'}</span>
            </button>

            <button
              onClick={() => setActiveSearchTab('flights')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                activeSearchTab === 'flights'
                  ? 'bg-white text-[#176B52] shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plane className={`w-4 h-4 ${activeSearchTab === 'flights' ? 'text-[#176B52]' : 'text-slate-400'}`} />
              <span>{lang === 'bn' ? 'ফ্লাইট টিকিট' : 'Flights'}</span>
            </button>

            <button
              onClick={() => setActiveSearchTab('hotels')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                activeSearchTab === 'hotels'
                  ? 'bg-white text-[#176B52] shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className={`w-4 h-4 ${activeSearchTab === 'hotels' ? 'text-[#176B52]' : 'text-slate-400'}`} />
              <span>{lang === 'bn' ? 'হোটেল ও রিসোর্ট' : 'Hotels'}</span>
            </button>

          </div>

          {/* Tab Form Panels */}
          <div className="p-6 sm:p-8">
            
            {/* Tour Packages Tab */}
            {activeSearchTab === 'packages' && (
              <form onSubmit={handlePackageSearch} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      {lang === 'bn' ? 'গন্তব্য (Destination)' : 'Destination'}
                    </label>
                    <select
                      value={pkgDest}
                      onChange={(e) => setPkgDest(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-[#176B52]"
                    >
                      <option value="All Destinations">{lang === 'bn' ? 'সকল গন্তব্য' : 'All Destinations'}</option>
                      <option value="Saint Martin's Island">Saint Martin (সেন্টমার্টিন)</option>
                      <option value="Cox's Bazar">Cox's Bazar (কক্সবাজার)</option>
                      <option value="Sajek Valley">Sajek Valley (সাজেক ভ্যালি)</option>
                      <option value="Maldives">Maldives (মালদ্বীপ)</option>
                      <option value="Thailand">Thailand (থাইল্যান্ড)</option>
                      <option value="Dubai">Dubai & UAE (দুবাই)</option>
                      <option value="Bali">Bali (বালি)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      {lang === 'bn' ? 'ভ্রমণের মাস' : 'Travel Month'}
                    </label>
                    <select
                      value={pkgMonth}
                      onChange={(e) => setPkgMonth(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-[#176B52]"
                    >
                      <option value="This Month">{lang === 'bn' ? 'চলতি মাস' : 'This Month'}</option>
                      <option value="Next Month">{lang === 'bn' ? 'পরবর্তী মাস' : 'Next Month'}</option>
                      <option value="Eid Vacation">{lang === 'bn' ? 'ঈদের ছুটি' : 'Eid Vacation'}</option>
                      <option value="Winter Holiday">{lang === 'bn' ? 'শীতকালীন ছুটি' : 'Winter Holiday'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      {lang === 'bn' ? 'ভ্রমণকারী সংখ্যা' : 'Number of Travelers'}
                    </label>
                    <div className="flex items-center p-3 rounded-xl border border-slate-200 bg-slate-50">
                      <Users className="w-4 h-4 text-slate-400 mr-2" />
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={pkgTravelers}
                        onChange={(e) => setPkgTravelers(parseInt(e.target.value) || 1)}
                        className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      {lang === 'bn' ? 'ট্যুর ক্যাটাগরি' : 'Tour Type'}
                    </label>
                    <select
                      value={pkgType}
                      onChange={(e) => setPkgType(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none focus:ring-2 focus:ring-[#176B52]"
                    >
                      <option value="All">{lang === 'bn' ? 'সকল ধরন' : 'All Categories'}</option>
                      <option value="Honeymoon">{lang === 'bn' ? 'হানিমুন স্পেশাল' : 'Honeymoon'}</option>
                      <option value="Family">{lang === 'bn' ? 'ফ্যামিলি ট্রিপ' : 'Family Vacation'}</option>
                      <option value="Adventure">{lang === 'bn' ? 'অ্যাডভেঞ্চার' : 'Adventure'}</option>
                      <option value="Luxury">{lang === 'bn' ? 'লাক্সারি ও প্রিমিয়াম' : 'Luxury'}</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    {lang === 'bn' 
                      ? '💡 শতভাগ নির্ভরযোগ্য সহায়তা ও স্বচ্ছ মূল্যে ট্রিপ কনফার্মেশন।' 
                      : '💡 Transparent pricing, official supplier vouchers, and personalized advisory.'}
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#176B52] hover:bg-[#104C3A] text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer font-heading"
                  >
                    <Search className="w-4 h-4 text-[#E6B94F]" />
                    <span>{lang === 'bn' ? 'প্যাকেজ অনুসন্ধান করুন' : 'Explore Packages'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Flights Tab */}
            {activeSearchTab === 'flights' && (
              <form onSubmit={handleFlightSearch} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">From</label>
                    <input
                      type="text"
                      value={flightFrom}
                      onChange={(e) => setFlightFrom(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">To</label>
                    <input
                      type="text"
                      value={flightTo}
                      onChange={(e) => setFlightTo(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Departure</label>
                    <input
                      type="date"
                      value={flightDep}
                      onChange={(e) => setFlightDep(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Return</label>
                    <input
                      type="date"
                      value={flightRet}
                      onChange={(e) => setFlightRet(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Passengers</label>
                    <input
                      type="number"
                      min="1"
                      value={flightPassengers}
                      onChange={(e) => setFlightPassengers(parseInt(e.target.value) || 1)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    {lang === 'bn'
                      ? '✈️ দেশি ও আন্তর্জাতিক সকল এয়ারলাইন্সের অফিশিয়াল টিকিট এনকোয়ারি ও রিজার্ভেশন।'
                      : '✈️ Official ticketing & assisted fare matching with IATA licensed airlines.'}
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#176B52] hover:bg-[#104C3A] text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer font-heading"
                  >
                    <Plane className="w-4 h-4 text-[#E6B94F]" />
                    <span>{lang === 'bn' ? 'ফ্লাইট টিকিট খুঁজুন' : 'Search Flights'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Hotels Tab */}
            {activeSearchTab === 'hotels' && (
              <form onSubmit={handleHotelSearch} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Destination / Hotel</label>
                    <input
                      type="text"
                      value={hotelDest}
                      onChange={(e) => setHotelDest(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Check-in</label>
                    <input
                      type="date"
                      value={hotelCheckIn}
                      onChange={(e) => setHotelCheckIn(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Check-out</label>
                    <input
                      type="date"
                      value={hotelCheckOut}
                      onChange={(e) => setHotelCheckOut(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Guests</label>
                    <input
                      type="number"
                      min="1"
                      value={hotelGuests}
                      onChange={(e) => setHotelGuests(parseInt(e.target.value) || 1)}
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    {lang === 'bn'
                      ? '🏨 সরাসরি ভেরিফায়েড বিচফ্রন্ট রিসোর্ট ও প্রিমিয়াম হোটেল বুকিং।'
                      : '🏨 Pre-confirmed vouchers, authentic beachfront rooms with zero booking hassle.'}
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#176B52] hover:bg-[#104C3A] text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer font-heading"
                  >
                    <Building2 className="w-4 h-4 text-[#E6B94F]" />
                    <span>{lang === 'bn' ? 'হোটেল খুঁজুন' : 'Search Hotels'}</span>
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </section>

      {/* SECTION 03 — POPULAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block mb-1">
              {lang === 'bn' ? 'শীর্ষ গন্তব্যসমূহ' : 'Curated Exploration'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#25332D]">
              {lang === 'bn' ? 'জনপ্রিয় ভ্রমণ গন্তব্য' : 'Popular Destinations'}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-[#F6F1E6] p-1.5 rounded-2xl text-xs font-semibold">
            <button
              onClick={() => setDestFilter('all')}
              className={`px-4 py-1.5 rounded-xl transition cursor-pointer ${
                destFilter === 'all' ? 'bg-[#176B52] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'bn' ? 'সকল গন্তব্য' : 'All'}
            </button>
            <button
              onClick={() => setDestFilter('domestic')}
              className={`px-4 py-1.5 rounded-xl transition cursor-pointer ${
                destFilter === 'domestic' ? 'bg-[#176B52] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'bn' ? 'বাংলাদেশ (Bangladesh)' : 'Bangladesh'}
            </button>
            <button
              onClick={() => setDestFilter('international')}
              className={`px-4 py-1.5 rounded-xl transition cursor-pointer ${
                destFilter === 'international' ? 'bg-[#176B52] text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'bn' ? 'আন্তর্জাতিক (International)' : 'International'}
            </button>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.slice(0, 6).map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#176B52]/40 transition duration-300 flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#25332D] text-[11px] font-bold shadow-xs">
                  {lang === 'bn' ? dest.categoryBn : dest.category}
                </span>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] text-[#E6B94F] font-semibold block">
                    {lang === 'bn' ? dest.countryBn : dest.country}
                  </span>
                  <h3 className="text-xl font-extrabold font-heading">
                    {lang === 'bn' ? dest.nameBn : dest.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {lang === 'bn' ? dest.shortDescBn : dest.shortDesc}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">
                      {lang === 'bn' ? 'শুরু মূল্য' : 'Starting From'}
                    </span>
                    <span className="text-base font-extrabold text-[#176B52] font-heading">
                      ৳{dest.startingPriceBDT.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectDestination(dest)}
                    className="px-4 py-2 rounded-xl bg-[#F6F1E6] hover:bg-[#176B52] text-[#176B52] hover:text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer font-heading"
                  >
                    <span>{lang === 'bn' ? 'বিস্তারিত' : 'Explore'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('destinations')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#176B52] text-[#176B52] hover:bg-[#176B52] hover:text-white font-bold text-xs sm:text-sm transition cursor-pointer"
          >
            <span>{lang === 'bn' ? 'সকল গন্তব্য দেখুন' : 'View All Destinations'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SECTION 04 — FEATURED TOUR PACKAGES */}
      <section className="bg-[#F6F1E6] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block mb-1">
                {lang === 'bn' ? 'বিশেষ ট্যুর প্যাকেজ' : 'Handpicked Holidays'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#25332D]">
                {lang === 'bn' ? 'ফিচার্ড ট্রাভেল প্যাকেজ' : 'Featured Tour Packages'}
              </h2>
            </div>

            <button
              onClick={() => onNavigate('packages')}
              className="text-xs sm:text-sm font-bold text-[#176B52] hover:underline flex items-center gap-1"
            >
              <span>{lang === 'bn' ? 'সকল প্যাকেজ দেখুন' : 'Browse All Packages'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOUR_PACKAGES.slice(0, 6).map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#176B52]/40 transition duration-300 flex flex-col justify-between"
              >
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#E6B94F] text-[#25332D] text-[10px] font-extrabold uppercase tracking-wider">
                      {lang === 'bn' ? pkg.typeBn : pkg.type}
                    </span>
                  </div>

                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#E6B94F]" />
                    <span>{lang === 'bn' ? pkg.durationBn : pkg.duration}</span>
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 text-[11px] text-[#176B52] font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? pkg.destinationNameBn : pkg.destinationName}</span>
                    </div>

                    <h3 className="font-extrabold text-base sm:text-lg text-[#25332D] font-heading line-clamp-2 leading-snug">
                      {lang === 'bn' ? pkg.titleBn : pkg.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
                      {lang === 'bn' ? pkg.shortDescBn : pkg.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">
                        {lang === 'bn' ? 'মূল্য (জনপ্রতি)' : 'Per Person'}
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-extrabold text-[#176B52] font-heading">
                          ৳{pkg.priceBDT.toLocaleString('en-IN')}
                        </span>
                        {pkg.originalPriceBDT && (
                          <span className="text-[11px] text-slate-400 line-through">
                            ৳{pkg.originalPriceBDT.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="px-4 py-2.5 rounded-xl bg-[#176B52] hover:bg-[#104C3A] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm font-heading"
                    >
                      <span>{lang === 'bn' ? 'বিস্তারিত' : 'View Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E6B94F]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05 — WHY CHOOSE POTHIK (4 Benefit Cards with Minimal Line Icons) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block">
            {lang === 'bn' ? 'কেন আমরা আলাদা' : 'The POTHIK Standard'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#25332D]">
            {lang === 'bn' ? 'কেন বেছে নেবেন পথিক?' : 'Why Choose POTHIK'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === 'bn'
              ? 'আন্তর্জাতিক মানের সেবা ও স্থানীয় গভীর অভিজ্ঞতার সমন্বয়ে প্রতিটি ট্রিপকে আমরা করি ঝামেলাহীন।'
              : 'Combining international travel technology with deep local expertise for seamless journeys.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="p-6 rounded-3xl border border-slate-200/80 bg-white hover:border-[#176B52] hover:shadow-lg transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6F1E6] text-[#176B52] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-extrabold text-base text-[#25332D] font-heading">
              {lang === 'bn' ? 'বিশ্বস্ত ট্রাভেল সাপোর্ট' : 'Trusted Travel Support'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'বিআইডব্লিউটিএ অনুমোদিত ভেসেল টিকিট, এটিএবি সদস্যপদ এবং ১০০% নিশ্চিত রিজার্ভেশন।'
                : 'Direct partnerships with registered ocean vessels, certified resorts, and verified vouchers.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl border border-slate-200/80 bg-white hover:border-[#176B52] hover:shadow-lg transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6F1E6] text-[#176B52] flex items-center justify-center">
              <FileCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-extrabold text-base text-[#25332D] font-heading">
              {lang === 'bn' ? 'স্বচ্ছ ও স্পষ্ট মূল্য' : 'Transparent Pricing'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'কোনো গোপন বা অপ্রত্যাশিত চার্জ নেই। প্যাকেজে যা অন্তর্ভুক্ত তা আগেই স্পষ্ট জানানো হয়।'
                : 'Zero hidden fees. Clear breakdown of port taxes, government green fees, and meals.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl border border-slate-200/80 bg-white hover:border-[#176B52] hover:shadow-lg transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6F1E6] text-[#176B52] flex items-center justify-center">
              <Compass className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-extrabold text-base text-[#25332D] font-heading">
              {lang === 'bn' ? 'ব্যক্তিগত ট্রাভেল প্ল্যানিং' : 'Personalized Travel Planning'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'পরিবার, কাপল বা কর্পোরেট দলের সময় ও বাজেটের সাথে মানানসই বিশেষ ভ্রমণসূচি।'
                : 'Bespoke itineraries tailored to your pace, dietary preferences, and travel style.'}
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-3xl border border-slate-200/80 bg-white hover:border-[#176B52] hover:shadow-lg transition duration-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F6F1E6] text-[#176B52] flex items-center justify-center">
              <Headphones className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-extrabold text-base text-[#25332D] font-heading">
              {lang === 'bn' ? 'সার্বক্ষণিক গ্রাহক সহায়তা' : 'Dedicated Customer Assistance'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'কক্সবাজার ঘাট, সেন্টমার্টিন জেটি ও ঢাকায় ২৪/৭ সার্বক্ষণিক গ্রাউন্ড প্রতিনিধি সাপোর্ট।'
                : '24/7 hotline and physical jetty concierges in Cox\'s Bazar and Saint Martin Island.'}
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 06 — VISA ASSISTANCE */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#176B52] to-[#104C3A] text-white flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#E6B94F] text-xs font-bold uppercase tracking-wider">
                {lang === 'bn' ? 'ভিসা কনস্যুলার ডেস্ক' : 'Visa Assistance & Documentation'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
                {lang === 'bn' 
                  ? 'আন্তর্জাতিক ভ্রমণের নির্ভরযোগ্য ভিসা গাইডেন্স' 
                  : 'Hassle-Free Visa Processing & Document Guidance'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {lang === 'bn'
                  ? 'থাইল্যান্ড, মালয়েশিয়া, দুবাই, সিঙ্গাপুর এবং ইউরোপের শেনজেন ভিসার ফাইল যাচাই, অ্যাপয়েন্টমেন্ট এবং পেশাদার কনস্যুলার সহায়তা।'
                  : 'Complete file scrutiny, bank solvency guidance, authorized submissions, and travel insurance for Dubai, Thailand, Singapore, Malaysia & Schengen.'}
              </p>
              <div className="p-3 bg-white/10 rounded-xl text-[11px] text-white/80 border border-white/10">
                <span className="font-bold text-[#E6B94F]">
                  {lang === 'bn' ? 'সতর্কীকরণ:' : 'Legal Disclaimer:'}
                </span>{' '}
                {lang === 'bn'
                  ? 'ভিসা অনুমোদনের চূড়ান্ত সিদ্ধান্ত সংশ্লিষ্ট সার্বভৌম দূতাবাসের এখতিয়ারভুক্ত।'
                  : 'Visa decisions are made exclusively by the respective sovereign embassies. Approval is not guaranteed.'}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={() => onNavigate('visa')}
                className="px-8 py-3.5 rounded-xl bg-[#E6B94F] hover:bg-[#DDAA38] text-[#25332D] font-extrabold text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer font-heading"
              >
                <span>{lang === 'bn' ? 'ভিসা নির্দেশিকা দেখুন' : 'Explore Visa Directory'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenEnquiry('Visa')}
                className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#E6B94F]" />
                <span>{lang === 'bn' ? 'ভিসা অনুসন্ধান জমা দিন' : 'Visa Enquiry'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07 — CUSTOMIZED TRAVEL EXPERIENCE ("Your Journey. Your Way.") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block">
            {lang === 'bn' ? 'আপনার ইচ্ছেমতো ভ্রমণ' : 'Tailored Holidays'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#25332D]">
            {lang === 'bn' ? '"আপনার যাত্রা। আপনার মতো করে।"' : '"Your Journey. Your Way."'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === 'bn'
              ? 'আপনার প্রয়োজন অনুযায়ী যেকোনো বিশেষ ভ্রমণের ব্যবস্থা করতে পথিক প্রস্তুত।'
              : 'Choose your travel style and let our specialists build your dream itinerary.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'Family Holidays', titleBn: 'ফ্যামিলি ট্যুর', icon: '👨‍👩‍👧‍👦', desc: 'Child-friendly resorts & relaxed pacing' },
            { title: 'Honeymoon', titleBn: 'হানিমুন প্যাকেজ', icon: '💍', desc: 'Private water villas & candlelit dining' },
            { title: 'Group Tours', titleBn: 'গ্রুপ ভ্রমণ', icon: '🚌', desc: 'Friends & corporate group adventures' },
            { title: 'Adventure Travel', titleBn: 'রোমাঞ্চকর ভ্রমণ', icon: '🧗', desc: 'Trekking, scuba & jeep safaris' },
            { title: 'Corporate MICE', titleBn: 'কর্পোরেট ইভেন্ট', icon: '💼', desc: 'Conferences, retreats & incentives' },
            { title: 'Custom Private', titleBn: 'প্রাইভেট ট্যুর', icon: '✨', desc: '100% customized to your schedule' },
          ].map((cat, i) => (
            <button
              key={i}
              onClick={() => onOpenEnquiry('Custom Tour', cat.title)}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-[#176B52] hover:shadow-md transition text-left group cursor-pointer flex flex-col justify-between"
            >
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-[#25332D] group-hover:text-[#176B52] font-heading">
                  {lang === 'bn' ? cat.titleBn : cat.title}
                </h4>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  {cat.desc}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 08 — CUSTOMER TESTIMONIALS */}
      <section className="bg-[#F6F1E6] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block">
              {lang === 'bn' ? 'যাত্রীদের মতামত' : 'Verified Traveler Stories'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#25332D]">
              {lang === 'bn' ? 'যাত্রীরা যা বলছেন' : 'What Travelers Say'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E6B94F] text-[#E6B94F]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{lang === 'bn' ? t.textBn : t.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-xs text-[#25332D] block">
                        {lang === 'bn' ? t.authorBn : t.author}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {lang === 'bn' ? t.tourBn : t.tour}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 09 — TRAVEL INSPIRATION (Editorial Travel Blog) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block mb-1">
              {lang === 'bn' ? 'ভ্রমণ ব্লগ ও টিপস' : 'Travel Stories & Inspiration'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#25332D]">
              {lang === 'bn' ? 'পথিক ট্রাভেল গাইড' : 'Travel Inspiration'}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="text-xs sm:text-sm font-bold text-[#176B52] hover:underline flex items-center gap-1"
          >
            <span>{lang === 'bn' ? 'সব লেখা পড়ুন' : 'Read All Stories'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate('blog')}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#176B52]/40 transition duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[#25332D] text-[10px] font-bold shadow-xs">
                  {lang === 'bn' ? post.categoryBn : post.category}
                </span>
              </div>

              <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium mb-1">
                    {post.date} · {post.readTime}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#25332D] font-heading group-hover:text-[#176B52] transition line-clamp-2">
                    {lang === 'bn' ? post.titleBn : post.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {lang === 'bn' ? post.excerptBn : post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-[#176B52]">
                  <span>{lang === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read Article'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
