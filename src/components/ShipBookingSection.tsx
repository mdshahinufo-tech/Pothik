import React, { useState } from 'react';
import { 
  Ship, 
  Clock, 
  MapPin, 
  Star, 
  Flame, 
  Check, 
  Anchor, 
  ShieldCheck, 
  ChevronRight,
  Info
} from 'lucide-react';
import { SHIPS_DATA } from '../data/travelData';
import { ShipVessel } from '../types';

interface ShipBookingSectionProps {
  lang: 'bn' | 'en';
  onSelectShip: (ship: ShipVessel, selectedClass?: string) => void;
}

export const ShipBookingSection: React.FC<ShipBookingSectionProps> = ({
  lang,
  onSelectShip,
}) => {
  const [filterRoute, setFilterRoute] = useState<'all' | 'cox' | 'teknaf'>('all');

  const filteredShips = SHIPS_DATA.filter((ship) => {
    if (filterRoute === 'cox') return ship.departurePoint.toLowerCase().includes('cox');
    if (filterRoute === 'teknaf') return ship.departurePoint.toLowerCase().includes('teknaf');
    return true;
  });

  return (
    <section id="ships" className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title - Clean & Less Text */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'bn' ? 'শিপ ও ক্রুজ টিকেট' : 'Ship & Cruise Tickets'}
            </h2>
            <p className="mt-1 text-slate-600 text-sm">
              {lang === 'bn'
                ? 'এমভি বে ওয়ান, কর্ণফুলী এক্সপ্রেস ও কেয়ারী সিন্দাবাদের নিশ্চিত পিএনআর আসন।'
                : 'Direct PNR seat allotment on top St. Martin vessels with zero markups.'}
            </p>
          </div>

          {/* Route Filter Tabs */}
          <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setFilterRoute('all')}
              className={`px-3 py-2 rounded-xl transition cursor-pointer ${
                filterRoute === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'bn' ? 'সব জাহাজ' : 'All Ships'}
            </button>
            <button
              onClick={() => setFilterRoute('cox')}
              className={`px-3 py-2 rounded-xl transition cursor-pointer ${
                filterRoute === 'cox' ? 'bg-white text-cyan-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'bn' ? 'কক্সবাজার ঘাট' : "Cox's Bazar Direct"}
            </button>
            <button
              onClick={() => setFilterRoute('teknaf')}
              className={`px-3 py-2 rounded-xl transition cursor-pointer ${
                filterRoute === 'teknaf' ? 'bg-white text-cyan-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'bn' ? 'টেকনাফ ঘাট' : 'Teknaf Pier'}
            </button>
          </div>
        </div>

        {/* Ships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredShips.map((ship) => (
            <div
              key={ship.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Ship Photo with Overlays */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                  <img
                    src={ship.image}
                    alt={ship.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>

                  {/* Badges on top */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-cyan-300 backdrop-blur-md border border-cyan-400/30 flex items-center gap-1">
                      <Ship className="w-3.5 h-3.5 text-cyan-400" />
                      {lang === 'bn' ? ship.typeBn : ship.type}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-md flex items-center gap-1 animate-pulse-subtle">
                      <Flame className="w-3.5 h-3.5" />
                      {lang === 'bn' ? `মাত্র ${ship.remainingSeats}টি সিট বাকি!` : `Only ${ship.remainingSeats} seats left!`}
                    </span>
                  </div>

                  {/* Bottom details on image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                          {lang === 'bn' ? ship.nameBn : ship.name}
                        </h3>
                        <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{lang === 'bn' ? ship.departurePointBn : ship.departurePoint}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-400/20 backdrop-blur-md border border-amber-400/40 text-amber-300 px-2.5 py-1 rounded-xl text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{ship.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6 space-y-5">
                  {/* Timing & Duration strip */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'ছেড়ে যায়' : 'Departure'}</span>
                      <span className="font-extrabold text-slate-900">{ship.departureTime}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'যাত্রা সময়' : 'Duration'}</span>
                      <span className="font-extrabold text-cyan-700">{lang === 'bn' ? ship.journeyTimeBn : ship.journeyTime}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'প্রত্যাবর্তন' : 'Return Ship'}</span>
                      <span className="font-extrabold text-slate-900">{ship.returnTime}</span>
                    </div>
                  </div>

                  {/* Highlights / Features */}
                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-2">
                      {lang === 'bn' ? 'জাহাজের বিশেষ সুবিধাসমূহ:' : 'Key Vessel Amenities:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(lang === 'bn' ? ship.featuresBn : ship.features).map((feat, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-900 text-xs font-medium flex items-center gap-1"
                        >
                          <Check className="w-3 h-3 text-teal-600" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Classes & Pricing breakdown */}
                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-2">
                      {lang === 'bn' ? 'আসন শ্রেণি ও ভাড়া (উভয়মুখী/Single):' : 'Available Classes & Pricing:'}
                    </span>
                    <div className="space-y-2">
                      {ship.classes.map((cls, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-cyan-400 transition bg-white text-xs"
                        >
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {lang === 'bn' ? cls.classNameBn : cls.className}
                            </span>
                            <span className="text-[11px] text-emerald-600 font-semibold">
                              {lang === 'bn' ? `${cls.available}টি সিট খালি` : `${cls.available} seats left`}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-extrabold text-sm sm:text-base text-cyan-800">
                              ৳{cls.price.toLocaleString()}
                            </span>
                            <button
                              onClick={() => onSelectShip(ship, cls.className)}
                              className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-600 text-white font-bold rounded-lg transition cursor-pointer text-xs"
                            >
                              {lang === 'bn' ? 'বুকিং' : 'Book'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectShip(ship)}
                  className="w-full py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-cyan-900 hover:to-teal-900 text-white font-bold text-sm rounded-2xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer group-hover:bg-cyan-700"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'bn' ? `${ship.nameBn} এর নিশ্চিত টিকিট নিন` : `Reserve ${ship.name}`}</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
