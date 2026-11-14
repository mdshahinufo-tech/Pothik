import React from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Star, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Compass,
  Send
} from 'lucide-react';
import { Destination } from '../../types/pothik';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  lang: 'en' | 'bn';
  onBookTour: (destinationName: string) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  lang,
  onBookTour,
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#F6F1E6] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Hero Image & Floating Controls */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#25332D] via-[#25332D]/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-[#176B52] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              {lang === 'bn' ? destination.categoryBn : destination.category}
            </span>
          </div>

          {/* Title & Location Header */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E6B94F] mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? destination.countryBn : destination.country}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#E6B94F]" />
                <span>{destination.rating} Rating</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
              {lang === 'bn' ? destination.nameBn : destination.name}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6 text-[#25332D]">
          
          {/* Introduction */}
          <div>
            <h4 className="text-base font-bold font-heading text-[#176B52] uppercase tracking-wider text-xs mb-1">
              {lang === 'bn' ? 'গন্তব্য পরিচিতি' : 'About Destination'}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700">
              {lang === 'bn' ? destination.fullDescBn : destination.fullDesc}
            </p>
          </div>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F6F1E6] p-4 rounded-2xl border border-[#E6B94F]/30 text-xs">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#176B52] mt-0.5" />
              <div>
                <span className="font-bold text-slate-500 block uppercase text-[10px]">
                  {lang === 'bn' ? 'ভ্রমণের সেরা সময়' : 'Best Time to Visit'}
                </span>
                <span className="font-semibold text-slate-800 text-xs">
                  {lang === 'bn' ? destination.bestTimeToVisitBn : destination.bestTimeToVisit}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-[#E6B94F] mt-0.5" />
              <div>
                <span className="font-bold text-slate-500 block uppercase text-[10px]">
                  {lang === 'bn' ? 'প্যাকেজ শুরু' : 'Starting From'}
                </span>
                <span className="font-extrabold text-[#176B52] text-sm">
                  ৳{destination.startingPriceBDT.toLocaleString('en-IN')} <span className="text-[10px] text-slate-500 font-normal">/ Person</span>
                </span>
              </div>
            </div>
          </div>

          {/* Popular Attractions */}
          <div>
            <h4 className="text-base font-bold font-heading text-[#176B52] uppercase tracking-wider text-xs mb-3">
              {lang === 'bn' ? 'প্রধান দর্শনীয় আকর্ষণসমূহ' : 'Popular Highlights & Attractions'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {destination.popularAttractions.map((attr, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs hover:border-[#176B52] transition">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 block mb-1">
                    {lang === 'bn' ? attr.nameBn : attr.name}
                  </span>
                  <span className="text-xs text-slate-500 leading-snug block">
                    {lang === 'bn' ? attr.descBn : attr.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          {destination.gallery && destination.gallery.length > 1 && (
            <div>
              <h4 className="text-base font-bold font-heading text-[#176B52] uppercase tracking-wider text-xs mb-3">
                {lang === 'bn' ? 'ফটো গ্যালারি' : 'Destination Gallery'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {destination.gallery.map((img, i) => (
                  <div key={i} className="h-28 rounded-xl overflow-hidden bg-slate-100">
                    <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Tips */}
          <div>
            <h4 className="text-base font-bold font-heading text-[#176B52] uppercase tracking-wider text-xs mb-2">
              {lang === 'bn' ? 'গুরুত্বপূর্ণ ভ্রমণ টিপস' : 'Essential Travel Tips'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {(lang === 'bn' ? destination.travelTipsBn : destination.travelTips).map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#176B52] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-500 block">
              {lang === 'bn' ? 'কাস্টমাইজড ভ্রমণ প্যাকেজ উপলব্ধ' : 'Tailor-made Itineraries & Booking Available'}
            </span>
            <span className="text-xs font-bold text-[#176B52]">
              {lang === 'bn' ? '২৪/৭ অভিজ্ঞ প্রতিনিধির সহায়তা' : '24/7 Dedicated Destination Specialists'}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 w-1/2 sm:w-auto"
            >
              {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTour(destination.name);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#176B52] hover:bg-[#104C3A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md w-1/2 sm:w-auto cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#E6B94F]" />
              <span>{lang === 'bn' ? 'এই গন্তব্য বুক করুন' : 'Enquire for Destination'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
