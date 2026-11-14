import React from 'react';
import { 
  Building2, 
  MapPin, 
  Star, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Waves, 
  Flame,
  ChevronRight
} from 'lucide-react';
import { RESORTS_DATA } from '../data/travelData';
import { Resort } from '../types';

interface ResortSectionProps {
  lang: 'bn' | 'en';
  onSelectResort: (resort: Resort) => void;
}

export const ResortSection: React.FC<ResortSectionProps> = ({
  lang,
  onSelectResort,
}) => {
  return (
    <section id="resorts" className="py-14 sm:py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean & Minimal */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bn' ? 'সৈকত রিসোর্ট ও কটেজ' : 'Beach Resorts & Cottages'}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {lang === 'bn'
              ? 'সরাসরি সৈকত সংলগ্ন ভেরিফায়েড রিসোর্ট ও মিষ্টি পানির নিশ্চয়তা।'
              : 'Direct beachfront verified properties with guaranteed sweet water and power.'}
          </p>
        </div>

        {/* Resorts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESORTS_DATA.map((resort) => (
            <div
              key={resort.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Resort Image */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={resort.image}
                    alt={resort.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 text-white shadow-md flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {lang === 'bn' ? resort.badgeBn : resort.badge}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-slate-900/80 text-amber-300 backdrop-blur-sm border border-amber-400/40 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{resort.rating}</span>
                    </span>
                  </div>

                  {/* Remaining Rooms */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-xs flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      {lang === 'bn' ? `মাত্র ${resort.remainingRooms}টি রুম বাকি` : `${resort.remainingRooms} rooms left`}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3.5">
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition">
                      {lang === 'bn' ? resort.nameBn : resort.name}
                    </h3>
                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                      <MapPin className="w-3 h-3 text-cyan-600 shrink-0" />
                      <span>{lang === 'bn' ? resort.locationBn : resort.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-800 bg-cyan-50 px-2.5 py-1 rounded-lg">
                    <Waves className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                    <span>{lang === 'bn' ? resort.beachAccessBn : resort.beachAccess}</span>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-1 pt-1 border-t border-slate-100 text-xs text-slate-600">
                    {(lang === 'bn' ? resort.amenitiesBn : resort.amenities).slice(0, 3).map((amenity, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{amenity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="pt-2 flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">{lang === 'bn' ? 'প্রতি রাত (শুরু)' : 'Starts per night'}</span>
                      <span className="text-xl font-extrabold text-emerald-800">
                        ৳{resort.pricePerNight.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card CTA */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectResort(resort)}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'রুম নিশ্চিত করুন' : 'Confirm Room'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
