import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight, 
  Calendar, 
  Filter, 
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import { TOUR_PACKAGES } from '../../data/pothikData';
import { TourPackage } from '../../types/pothik';

interface TourPackagesPageProps {
  lang: 'en' | 'bn';
  onSelectPackage: (pkg: TourPackage) => void;
  onOpenEnquiry: (service: string, dest: string) => void;
}

export const TourPackagesPage: React.FC<TourPackagesPageProps> = ({
  lang,
  onSelectPackage,
  onOpenEnquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'rating'>('recommended');

  const filtered = TOUR_PACKAGES.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleBn.includes(searchQuery) ||
      p.destinationNameBn.includes(searchQuery);

    const matchesType = selectedType === 'all' || p.type === selectedType;
    const matchesDur = selectedDuration === 'all' || 
      (selectedDuration === 'short' && p.duration.includes('3 Days')) ||
      (selectedDuration === 'medium' && (p.duration.includes('4 Days') || p.duration.includes('5 Days')));

    return matchesSearch && matchesType && matchesDur;
  }).sort((a, b) => {
    if (sortBy === 'priceAsc') return a.priceBDT - b.priceBDT;
    if (sortBy === 'priceDesc') return b.priceBDT - a.priceBDT;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="py-10 sm:py-14 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block">
          {lang === 'bn' ? 'এক্সক্লুসিভ ট্যুর প্যাকেজ' : 'Curated Holiday Packages'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#25332D]">
          {lang === 'bn' ? 'আপনার পরবর্তী অবকাশের পরিকল্পনা করুন' : 'Discover All-in-One Tour Packages'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {lang === 'bn'
            ? 'জাহাজ ও ক্রুজ টিকিট, ভেরিফায়েড বিচ রিসোর্ট, সরকারি QR পাস ও সার্বক্ষণিক সহায়তা সহ শতভাগ বিশ্বস্ত প্যাকেজ।'
            : 'All-inclusive vacations featuring verified luxury resorts, guaranteed flight and cruise seats, and personalized concierge support.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'প্যাকেজ বা গন্তব্য খুঁজুন...' : 'Search package title or destination...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 outline-none"
          >
            <option value="all">{lang === 'bn' ? 'সকল প্যাকেজ টাইপ' : 'All Package Types'}</option>
            <option value="Honeymoon">{lang === 'bn' ? 'হানিমুন স্পেশাল' : 'Honeymoon'}</option>
            <option value="Family">{lang === 'bn' ? 'ফ্যামিলি ট্যুর' : 'Family'}</option>
            <option value="Adventure">{lang === 'bn' ? 'অ্যাডভেঞ্চার' : 'Adventure'}</option>
            <option value="Luxury">{lang === 'bn' ? 'লাক্সারি ও প্রিমিয়াম' : 'Luxury'}</option>
          </select>

          {/* Duration Filter */}
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 outline-none"
          >
            <option value="all">{lang === 'bn' ? 'সকল স্থায়িত্বকাল' : 'All Durations'}</option>
            <option value="short">{lang === 'bn' ? 'স্বল্পমেয়াদী (৩ দিন)' : 'Short (3 Days)'}</option>
            <option value="medium">{lang === 'bn' ? 'মাঝারি (৪-৫ দিন)' : 'Medium (4-5 Days)'}</option>
          </select>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50 outline-none"
            >
              <option value="recommended">{lang === 'bn' ? 'সুপারিশকৃত (Recommended)' : 'Recommended'}</option>
              <option value="priceAsc">{lang === 'bn' ? 'মূল্য: কম থেকে বেশি' : 'Price: Low to High'}</option>
              <option value="priceDesc">{lang === 'bn' ? 'মূল্য: বেশি থেকে কম' : 'Price: High to Low'}</option>
              <option value="rating">{lang === 'bn' ? 'সর্বোচ্চ রেটিং' : 'Top Rated'}</option>
            </select>
          </div>

        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#176B52]/40 transition duration-300 flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden bg-slate-900">
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

              <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 text-[#E6B94F] px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-[#E6B94F]" />
                <span>{pkg.rating}</span>
              </div>
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
                    {lang === 'bn' ? 'মূল্য (জনপ্রতি)' : 'Starting From'}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-[#176B52] font-heading">
                      ৳{pkg.priceBDT.toLocaleString('en-IN')}
                    </span>
                    {pkg.originalPriceBDT && (
                      <span className="text-xs text-slate-400 line-through">
                        ৳{pkg.originalPriceBDT.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPackage(pkg)}
                  className="px-5 py-2.5 rounded-xl bg-[#176B52] hover:bg-[#104C3A] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm font-heading"
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
  );
};
