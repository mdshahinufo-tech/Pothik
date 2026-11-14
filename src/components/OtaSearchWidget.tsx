import React, { useState } from 'react';
import { 
  Ship, 
  Building2, 
  Palmtree, 
  QrCode, 
  ArrowLeftRight, 
  Calendar, 
  Users, 
  Search, 
  ChevronDown, 
  Check, 
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { OtaSearchQuery } from '../types';

interface OtaSearchWidgetProps {
  lang: 'bn' | 'en';
  activeTab?: 'ships' | 'resorts' | 'packages' | 'pass';
  onTabChange?: (tab: 'ships' | 'resorts' | 'packages' | 'pass') => void;
  onSearch: (query: OtaSearchQuery) => void;
  onOpenPassVerify?: () => void;
}

export const OtaSearchWidget: React.FC<OtaSearchWidgetProps> = ({
  lang,
  activeTab: controlledTab,
  onTabChange,
  onSearch,
  onOpenPassVerify,
}) => {
  const [internalTab, setInternalTab] = useState<'ships' | 'resorts' | 'packages' | 'pass'>('ships');
  const activeTab = controlledTab ?? internalTab;

  const handleTabClick = (tab: 'ships' | 'resorts' | 'packages' | 'pass') => {
    setInternalTab(tab);
    if (onTabChange) onTabChange(tab);
  };
  const [tripType, setTripType] = useState<'roundTrip' | 'oneWay'>('roundTrip');
  
  // Locations
  const [fromCity, setFromCity] = useState("Cox's Bazar (Nunia Chhara Jetty)");
  const [fromCode, setFromCode] = useState("CXB");
  const [toCity, setToCity] = useState("Saint Martin Coral Jetty");
  const [toCode, setToCode] = useState("SMD");
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);

  // Dates
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
  const returnDef = new Date(Date.now() + 9 * 86400000).toISOString().split('T')[0];

  const [departureDate, setDepartureDate] = useState(nextWeek);
  const [returnDate, setReturnDate] = useState(returnDef);

  // Travelers & Class
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState('Executive AC');
  const [travelersOpen, setTravelersOpen] = useState(false);

  // Fare category
  const [fareType, setFareType] = useState<'regular' | 'student' | 'defense'>('regular');

  // Departure origins
  const originOptions = [
    { city: "Cox's Bazar (Nunia Chhara Jetty)", cityBn: "কক্সবাজার (নুনিয়ারছড়া বিআইডব্লিউটিএ ঘাট)", code: "CXB", desc: "MV Bay One & Karnafuly" },
    { city: "Teknaf (Damdamia Pier)", cityBn: "টেকনাফ (দমদমিয়া ঘাট)", code: "TEK", desc: "Keari Sindbad & Speed Cruises" },
    { city: "Dhaka (Flight + Marine Connect)", cityBn: "ঢাকা (ফ্লাইট + সি কানেক্ট)", code: "DAC", desc: "All-in-one Flight + Ship Transfer" },
  ];

  // Destinations
  const destinationOptions = [
    { city: "Saint Martin Coral Jetty", cityBn: "সেন্টমার্টিন প্রধান কোরাল জেটি", code: "SMD", desc: "Main Pier, East & West Beach Resorts" },
    { city: "Chhera Dwip Eco Coast", cityBn: "ছেঁড়াদ্বীপ ও দক্ষিণ কোস্ট", code: "CRD", desc: "Southern Coral Reef & Speedboat Point" },
  ];

  const handleSwapRoute = () => {
    const tempCity = fromCity;
    const tempCode = fromCode;
    setFromCity(toCity);
    setFromCode(toCode);
    setToCity(tempCity);
    setToCode(tempCode);
  };

  const handleExecuteSearch = () => {
    if (activeTab === 'pass' && onOpenPassVerify) {
      onOpenPassVerify();
      return;
    }

    onSearch({
      tab: activeTab,
      tripType,
      fromCity,
      fromCode,
      toCity,
      toCode,
      departureDate,
      returnDate,
      adults,
      children,
      cabinClass,
      fareType,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-visible text-slate-800 transition-all">
      
      {/* Top Service Tabs (ShareTrip & Wego Signature Style) */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar bg-slate-50/70 rounded-t-3xl p-1.5 gap-1.5">
        
        <button
          onClick={() => handleTabClick('ships')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'ships'
              ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
          }`}
        >
          <Ship className={`w-4 h-4 ${activeTab === 'ships' ? 'text-emerald-700' : 'text-slate-400'}`} />
          <span>{lang === 'bn' ? 'জাহাজ ও ক্রুজ টিকিট' : 'Ships & Cruise'}</span>
          <span className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
            {lang === 'bn' ? 'গ্যারান্টিড' : 'Guaranteed'}
          </span>
        </button>

        <button
          onClick={() => handleTabClick('resorts')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'resorts'
              ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
          }`}
        >
          <Building2 className={`w-4 h-4 ${activeTab === 'resorts' ? 'text-emerald-700' : 'text-slate-400'}`} />
          <span>{lang === 'bn' ? 'সৈকত রিসোর্ট ও হোটেল' : 'Beach Resorts'}</span>
        </button>

        <button
          onClick={() => handleTabClick('packages')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'packages'
              ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
          }`}
        >
          <Palmtree className={`w-4 h-4 ${activeTab === 'packages' ? 'text-emerald-700' : 'text-slate-400'}`} />
          <span>{lang === 'bn' ? 'হলিডে ট্যুর প্যাকেজ' : 'Tour Packages'}</span>
        </button>

        <button
          onClick={() => handleTabClick('pass')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'pass'
              ? 'bg-white text-emerald-900 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
          }`}
        >
          <QrCode className={`w-4 h-4 ${activeTab === 'pass' ? 'text-emerald-700' : 'text-slate-400'}`} />
          <span>{lang === 'bn' ? 'QR ট্রাভেল পাস' : 'E-Travel Pass'}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-bold border border-purple-200">
            Govt
          </span>
        </button>

      </div>

      {/* Main Search Panel Body */}
      <div className="p-5 sm:p-7 space-y-5">
        
        {/* Sub-header: Trip Type Radios & Quick Fare Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'roundTrip'}
                onChange={() => setTripType('roundTrip')}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500 border-slate-300"
              />
              <span className={tripType === 'roundTrip' ? 'text-slate-900 font-bold' : 'text-slate-500'}>
                {lang === 'bn' ? 'যাতায়াত উভয়মুখী (Round Trip)' : 'Round Trip'}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="radio"
                name="tripType"
                checked={tripType === 'oneWay'}
                onChange={() => setTripType('oneWay')}
                className="w-4 h-4 text-cyan-600 focus:ring-cyan-500 border-slate-300"
              />
              <span className={tripType === 'oneWay' ? 'text-slate-900 font-bold' : 'text-slate-500'}>
                {lang === 'bn' ? 'একমুখী (One Way)' : 'One Way'}
              </span>
            </label>
          </div>

          {/* Fare category tags (ShareTrip feature) */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFareType('regular')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                fareType === 'regular' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'bn' ? 'রেগুলার ভাড়া' : 'Regular Fare'}
            </button>
            <button
              onClick={() => setFareType('student')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                fareType === 'student' ? 'bg-white text-cyan-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'bn' ? 'শিক্ষার্থী ছাড় (-১০%)' : 'Student (-10%)'}
            </button>
            <button
              onClick={() => setFareType('defense')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                fareType === 'defense' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'bn' ? 'সরকারি / ডিফেন্স' : 'Govt / Defense'}
            </button>
          </div>

        </div>

        {/* Input Grid: From / To / Departure / Return / Travelers */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 relative">
          
          {/* FROM Destination Box */}
          <div className="md:col-span-3 relative">
            <div 
              onClick={() => setFromDropdownOpen(!fromDropdownOpen)}
              className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 cursor-pointer transition h-full flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {lang === 'bn' ? 'যাত্রা শুরু (FROM)' : 'FROM (ORIGIN)'}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-100/60 px-1.5 py-0.5 rounded">
                  {fromCode}
                </span>
              </div>
              <div className="mt-1">
                <div className="text-sm font-bold text-slate-900 truncate">{fromCity}</div>
                <div className="text-[11px] text-slate-500 truncate">
                  {fromCode === 'CXB' ? 'Nuniar Chhara Ghat' : fromCode === 'TEK' ? 'Damdamia Pier' : 'Hazrat Shahjalal'}
                </div>
              </div>
            </div>

            {/* Dropdown Options */}
            {fromDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 space-y-1 animate-in fade-in"
                onMouseLeave={() => setFromDropdownOpen(false)}
              >
                <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase">
                  {lang === 'bn' ? 'ঘাট ও শহর নির্বাচন করুন' : 'Select Departure Jetty'}
                </div>
                {originOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setFromCity(opt.city);
                      setFromCode(opt.code);
                      setFromDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between cursor-pointer ${
                      fromCode === opt.code ? 'bg-cyan-50 text-cyan-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{lang === 'bn' ? opt.cityBn : opt.city}</div>
                      <div className="text-[10px] text-slate-400">{opt.desc}</div>
                    </div>
                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">
                      {opt.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button (floating or inline) */}
          <div className="hidden md:flex md:col-span-1 items-center justify-center -mx-3 z-10">
            <button
              onClick={handleSwapRoute}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md text-cyan-700 hover:text-cyan-800 hover:scale-110 active:scale-95 flex items-center justify-center transition cursor-pointer"
              title="Swap route"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TO Destination Box */}
          <div className="md:col-span-3 relative">
            <div 
              onClick={() => setToDropdownOpen(!toDropdownOpen)}
              className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 cursor-pointer transition h-full flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {lang === 'bn' ? 'গন্তব্য (TO)' : 'TO (DESTINATION)'}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                  {toCode}
                </span>
              </div>
              <div className="mt-1">
                <div className="text-sm font-bold text-slate-900 truncate">{toCity}</div>
                <div className="text-[11px] text-slate-500 truncate">
                  {toCode === 'SMD' ? 'East/West Beach Access' : 'Speedboat & Coral Reef'}
                </div>
              </div>
            </div>

            {/* Dropdown Options */}
            {toDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 space-y-1 animate-in fade-in"
                onMouseLeave={() => setToDropdownOpen(false)}
              >
                <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase">
                  {lang === 'bn' ? 'গন্তব্য পয়েন্ট নির্বাচন করুন' : 'Select Destination'}
                </div>
                {destinationOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setToCity(opt.city);
                      setToCode(opt.code);
                      setToDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between cursor-pointer ${
                      toCode === opt.code ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{lang === 'bn' ? opt.cityBn : opt.city}</div>
                      <div className="text-[10px] text-slate-400">{opt.desc}</div>
                    </div>
                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">
                      {opt.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DATES: Journey & Return */}
          <div className="md:col-span-3 grid grid-cols-2 gap-2">
            
            {/* Departure Date */}
            <div className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 transition flex flex-col justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <Calendar className="w-3 h-3 text-cyan-600" />
                <span>{lang === 'bn' ? 'যাত্রার তারিখ' : 'JOURNEY'}</span>
              </div>
              <input
                type="date"
                value={departureDate}
                min={today}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="mt-1 text-xs sm:text-sm font-bold text-slate-900 bg-transparent outline-none cursor-pointer w-full"
              />
            </div>

            {/* Return Date */}
            <div className={`p-3 rounded-2xl border transition flex flex-col justify-between ${
              tripType === 'roundTrip' 
                ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 cursor-pointer' 
                : 'bg-slate-100/50 border-slate-200/50 opacity-40 cursor-not-allowed'
            }`}>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <Calendar className="w-3 h-3 text-emerald-600" />
                <span>{lang === 'bn' ? 'ফেরার তারিখ' : 'RETURN'}</span>
              </div>
              <input
                type="date"
                value={returnDate}
                min={departureDate}
                disabled={tripType === 'oneWay'}
                onChange={(e) => setReturnDate(e.target.value)}
                className="mt-1 text-xs sm:text-sm font-bold text-slate-900 bg-transparent outline-none cursor-pointer w-full disabled:cursor-not-allowed"
              />
            </div>

          </div>

          {/* TRAVELER & CLASS SELECTOR */}
          <div className="md:col-span-2 relative">
            <div
              onClick={() => setTravelersOpen(!travelersOpen)}
              className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 cursor-pointer transition h-full flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-cyan-600" />
                  <span>{lang === 'bn' ? 'যাত্রী ও সিট' : 'TRAVELERS'}</span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
              <div className="mt-1">
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {adults + children} {lang === 'bn' ? 'যাত্রী' : 'Persons'}
                </div>
                <div className="text-[11px] text-slate-500 truncate">{cabinClass}</div>
              </div>
            </div>

            {/* Travelers Popover Modal */}
            {travelersOpen && (
              <div 
                className="absolute top-full right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 space-y-3.5 animate-in fade-in"
                onMouseLeave={() => setTravelersOpen(false)}
              >
                <div className="font-bold text-xs text-slate-900 border-b border-slate-100 pb-2 flex justify-between items-center">
                  <span>{lang === 'bn' ? 'যাত্রী সংখ্যা ও শ্রেণী' : 'Travelers & Cabin Class'}</span>
                  <span className="text-[10px] text-cyan-700 font-semibold">{cabinClass}</span>
                </div>

                {/* Adults counter */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">{lang === 'bn' ? 'প্রাপ্তবয়স্ক' : 'Adults'}</span>
                    <span className="text-[10px] text-slate-400">12+ {lang === 'bn' ? 'বছর' : 'years'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-slate-900">{adults}</span>
                    <button
                      onClick={() => setAdults(adults + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children counter */}
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">{lang === 'bn' ? 'শিশু' : 'Children'}</span>
                    <span className="text-[10px] text-slate-400">2-11 {lang === 'bn' ? 'বছর' : 'years'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-slate-900">{children}</span>
                    <button
                      onClick={() => setChildren(children + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Cabin Class Selection */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    {lang === 'bn' ? 'জাহাজের আসন শ্রেণী:' : 'Vessel Cabin Class:'}
                  </span>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    {['Executive AC', 'Coral Deck (Open Air)', 'Royal Luxury Cabin'].map((cls) => (
                      <button
                        key={cls}
                        onClick={() => setCabinClass(cls)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between cursor-pointer ${
                          cabinClass === cls ? 'bg-cyan-100/70 text-cyan-900 font-bold' : 'hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span>{cls}</span>
                        {cabinClass === cls && <Check className="w-3.5 h-3.5 text-cyan-700" />}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setTravelersOpen(false)}
                  className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  {lang === 'bn' ? 'সম্পন্ন করুন' : 'Apply'}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Action Row: Quick Shortcuts & Search CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          {/* Quick Date Presets */}
          <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto w-full sm:w-auto">
            <span className="font-semibold text-slate-400 whitespace-nowrap">
              {lang === 'bn' ? 'জনপ্রিয় তারিখ:' : 'Quick Dates:'}
            </span>
            <button
              onClick={() => {
                const tom = new Date(Date.now() + 86400000).toISOString().split('T')[0];
                setDepartureDate(tom);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium whitespace-nowrap transition cursor-pointer"
            >
              {lang === 'bn' ? 'আগামীকাল' : 'Tomorrow'}
            </button>
            <button
              onClick={() => {
                // Next Friday
                const d = new Date();
                const day = d.getDay();
                const diff = (5 - day + 7) % 7 || 7;
                d.setDate(d.getDate() + diff);
                setDepartureDate(d.toISOString().split('T')[0]);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium whitespace-nowrap transition cursor-pointer"
            >
              {lang === 'bn' ? 'আসন্ন শুক্রবার' : 'This Friday'}
            </button>
          </div>

          {/* Prominent ShareTrip / Wego Search Button */}
          <button
            onClick={handleExecuteSearch}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-cyan-600/25 hover:shadow-cyan-600/35 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-5 h-5 text-white" />
            <span>
              {activeTab === 'pass'
                ? (lang === 'bn' ? 'পাস যাচাই করুন' : 'Verify Travel Pass')
                : (lang === 'bn' ? 'খুঁজুন ও বুক করুন' : 'Search & Book Deals')}
            </span>
          </button>

        </div>

      </div>

    </div>
  );
};
