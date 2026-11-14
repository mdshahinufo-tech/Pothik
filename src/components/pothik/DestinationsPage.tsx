import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  ArrowRight, 
  Filter, 
  Sparkles,
  Compass
} from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../../data/pothikData';
import { Destination } from '../../types/pothik';

interface DestinationsPageProps {
  lang: 'en' | 'bn';
  onSelectDestination: (dest: Destination) => void;
  onOpenEnquiry: (service: string, dest: string) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({
  lang,
  onSelectDestination,
  onOpenEnquiry,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'international' | 'domestic'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = POPULAR_DESTINATIONS.filter((d) => {
    const matchesSearch = 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.nameBn.includes(searchQuery) ||
      d.countryBn.includes(searchQuery);

    const matchesType = selectedType === 'all' || d.type === selectedType;
    const matchesCat = selectedCategory === 'all' || d.category === selectedCategory;

    return matchesSearch && matchesType && matchesCat;
  });

  return (
    <div className="py-10 sm:py-14 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block">
          {lang === 'bn' ? 'বিশ্বজুড়ে ভ্রমণ গন্তব্য' : 'Worldwide Destinations'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#25332D]">
          {lang === 'bn' ? 'স্বপ্নের গন্তব্য আবিষ্কার করুন' : 'Explore Extraordinary Places'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {lang === 'bn'
            ? 'কক্সবাজার ও সেন্টমার্টিনের নীল জলরাশি থেকে শুরু করে মালদ্বীপ, বালি কিংবা ইউরোপের নয়নাভিরাম শহরসমূহ।'
            : 'From the coral beaches of Saint Martin and hill kingdoms of Sajek to overwater villas in Maldives and futuristic towers in Dubai.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'গন্তব্য বা দেশের নাম খুঁজুন...' : 'Search destination or country...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
            />
          </div>

          {/* Region Filter */}
          <div className="flex items-center gap-1.5 bg-[#F6F1E6] p-1 rounded-xl text-xs font-semibold w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3.5 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                selectedType === 'all' ? 'bg-[#176B52] text-white font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              {lang === 'bn' ? 'সকল অঞ্চল' : 'All Regions'}
            </button>
            <button
              onClick={() => setSelectedType('domestic')}
              className={`px-3.5 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                selectedType === 'domestic' ? 'bg-[#176B52] text-white font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              {lang === 'bn' ? 'বাংলাদেশ (Domestic)' : 'Bangladesh'}
            </button>
            <button
              onClick={() => setSelectedType('international')}
              className={`px-3.5 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer ${
                selectedType === 'international' ? 'bg-[#176B52] text-white font-bold shadow-xs' : 'text-slate-600'
              }`}
            >
              {lang === 'bn' ? 'আন্তর্জাতিক (International)' : 'International'}
            </button>
          </div>

        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs text-slate-600">
          <span className="font-bold text-slate-400 text-[11px] uppercase mr-1">
            {lang === 'bn' ? 'ক্যাটাগরি:' : 'Category:'}
          </span>
          {['all', 'beach', 'island', 'mountain', 'nature', 'city'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full border transition cursor-pointer capitalize whitespace-nowrap ${
                selectedCategory === cat
                  ? 'border-[#176B52] bg-[#176B52]/10 text-[#176B52] font-bold'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? (lang === 'bn' ? 'সব' : 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => (
          <div
            key={dest.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#176B52]/40 transition duration-300 flex flex-col justify-between"
          >
            <div className="relative h-60 overflow-hidden bg-slate-900">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>

              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[#25332D] text-[10px] font-bold shadow-xs uppercase">
                {lang === 'bn' ? dest.categoryBn : dest.category}
              </span>

              <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 text-[#E6B94F] px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-[#E6B94F]" />
                <span>{dest.rating}</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] text-[#E6B94F] font-semibold block">
                  {lang === 'bn' ? dest.countryBn : dest.country}
                </span>
                <h3 className="text-xl font-extrabold font-heading">
                  {lang === 'bn' ? dest.nameBn : dest.name}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {lang === 'bn' ? dest.shortDescBn : dest.shortDesc}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">
                    {lang === 'bn' ? 'শুরু মূল্য' : 'Starting Price'}
                  </span>
                  <span className="text-lg font-extrabold text-[#176B52] font-heading">
                    ৳{dest.startingPriceBDT.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
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
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
          <Compass className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-700">
            {lang === 'bn' ? 'কোনো গন্তব্য পাওয়া যায়নি' : 'No destinations found'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'bn' ? 'অন্য কোনো নাম বা ফিল্টার দিয়ে চেষ্টা করুন।' : 'Try searching with a different country or category filter.'}
          </p>
        </div>
      )}

    </div>
  );
};
