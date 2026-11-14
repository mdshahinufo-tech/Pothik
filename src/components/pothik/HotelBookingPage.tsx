import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Star, 
  Check, 
  Calendar, 
  Users, 
  Search, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { HOTELS_DATA } from '../../data/pothikData';
import { Hotel } from '../../types/pothik';

interface HotelBookingPageProps {
  lang: 'en' | 'bn';
  onOpenEnquiry: (service: string, dest: string) => void;
}

export const HotelBookingPage: React.FC<HotelBookingPageProps> = ({
  lang,
  onOpenEnquiry,
}) => {
  const [destQuery, setDestQuery] = useState('All');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');

  const filteredHotels = HOTELS_DATA.filter((h) => {
    if (selectedDestination === 'all') return true;
    return h.destination.toLowerCase().includes(selectedDestination.toLowerCase());
  });

  return (
    <div className="py-10 sm:py-14 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block">
          {lang === 'bn' ? 'যাচাইকৃত হোটেল ও রিসোর্ট' : 'Handpicked Accommodations'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#25332D]">
          {lang === 'bn' ? 'সৈকত ও পাহাড়ি রিসোর্ট বুকিং' : 'Hotels & Luxury Beachfront Resorts'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {lang === 'bn'
            ? 'কক্সবাজার মেরিন ড্রাইভ, সেন্টমার্টিন কোরাল বিচ এবং আন্তর্জাতিক গন্তব্যের প্রিমিয়াম স্টে।'
            : 'Pre-confirmed rooms, ocean views, and vetted quality for couples, families, and leisure travelers.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 bg-[#F6F1E6] p-1.5 rounded-2xl text-xs font-semibold max-w-lg mx-auto overflow-x-auto">
        <button
          onClick={() => setSelectedDestination('all')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
            selectedDestination === 'all' ? 'bg-[#176B52] text-white font-bold shadow-xs' : 'text-slate-600'
          }`}
        >
          {lang === 'bn' ? 'সকল হোটেল' : 'All Stays'}
        </button>
        <button
          onClick={() => setSelectedDestination('Saint Martin')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
            selectedDestination === 'Saint Martin' ? 'bg-[#176B52] text-white font-bold shadow-xs' : 'text-slate-600'
          }`}
        >
          {lang === 'bn' ? 'সেন্টমার্টিন' : 'Saint Martin'}
        </button>
        <button
          onClick={() => setSelectedDestination('Cox')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
            selectedDestination === 'Cox' ? 'bg-[#176B52] text-white font-bold shadow-xs' : 'text-slate-600'
          }`}
        >
          {lang === 'bn' ? 'কক্সবাজার' : 'Cox\'s Bazar'}
        </button>
        <button
          onClick={() => setSelectedDestination('Maldives')}
          className={`px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
            selectedDestination === 'Maldives' ? 'bg-[#176B52] text-white font-bold shadow-xs' : 'text-slate-600'
          }`}
        >
          {lang === 'bn' ? 'মালদ্বীপ' : 'Maldives'}
        </button>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((htl) => (
          <div
            key={htl.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#176B52]/40 transition duration-300 flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden bg-slate-900">
              <img
                src={htl.image}
                alt={htl.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 text-[#E6B94F] px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-[#E6B94F]" />
                <span>{htl.rating}</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] text-[#E6B94F] font-semibold block">
                  {lang === 'bn' ? htl.destinationBn : htl.destination}
                </span>
                <h3 className="text-xl font-extrabold font-heading">
                  {lang === 'bn' ? htl.nameBn : htl.name}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#176B52] shrink-0" />
                  <span className="truncate">{lang === 'bn' ? htl.locationBn : htl.location}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'bn' ? htl.descriptionBn : htl.description}
                </p>

                {/* Amenities */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    {lang === 'bn' ? 'সুবিধাসমূহ:' : 'Key Amenities:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'bn' ? htl.amenitiesBn : htl.amenities).slice(0, 3).map((am, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">
                    {lang === 'bn' ? 'প্রতি রাত শুরু' : 'Per Night From'}
                  </span>
                  <span className="text-lg font-extrabold text-[#176B52] font-heading">
                    ৳{htl.pricePerNightBDT.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => onOpenEnquiry('Hotel', `${htl.name} (${htl.destination})`)}
                  className="px-5 py-2.5 rounded-xl bg-[#176B52] hover:bg-[#104C3A] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer font-heading"
                >
                  <span>{lang === 'bn' ? 'রিসোর্ট বুক করুন' : 'Book Room'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E6B94F]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
