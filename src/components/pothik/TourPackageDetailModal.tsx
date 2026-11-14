import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Check, 
  AlertCircle, 
  Send, 
  Hotel, 
  FileText, 
  ShieldCheck,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { TourPackage } from '../../types/pothik';

interface TourPackageDetailModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  lang: 'en' | 'bn';
  onBookPackage: (pkg: TourPackage) => void;
  onAskDetails: (pkg: TourPackage) => void;
}

export const TourPackageDetailModal: React.FC<TourPackageDetailModalProps> = ({
  pkg,
  onClose,
  lang,
  onBookPackage,
  onAskDetails,
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'inclusions' | 'accommodation' | 'notes'>('itinerary');

  if (!pkg) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#F6F1E6] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Hero Section */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img 
            src={pkg.image} 
            alt={pkg.title} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#25332D] via-[#25332D]/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#E6B94F] text-[#25332D] text-xs font-extrabold uppercase tracking-wider shadow-sm">
              {lang === 'bn' ? pkg.typeBn : pkg.type}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
              {lang === 'bn' ? pkg.durationBn : pkg.duration}
            </span>
          </div>

          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E6B94F] mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? pkg.destinationNameBn : pkg.destinationName}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#E6B94F]" />
                <span>{pkg.rating} ({pkg.reviewsCount} {lang === 'bn' ? 'পর্যালোচনা' : 'verified reviews'})</span>
              </div>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold font-heading leading-tight">
              {lang === 'bn' ? pkg.titleBn : pkg.title}
            </h2>
          </div>
        </div>

        {/* Pricing & Key Bar */}
        <div className="bg-[#F6F1E6] px-6 py-3.5 border-b border-[#E6B94F]/20 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-bold">
              {lang === 'bn' ? 'প্যাকেজ মূল্য (জনপ্রতি)' : 'Package Price (Per Person)'}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-[#176B52] font-heading">
                ৳{pkg.priceBDT.toLocaleString('en-IN')}
              </span>
              {pkg.originalPriceBDT && (
                <span className="text-xs text-slate-400 line-through">
                  ৳{pkg.originalPriceBDT.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-[10px] text-slate-500">
                {lang === 'bn' ? '· সকল ট্যাক্স অন্তর্ভুক্ত' : '· All taxes included'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Calendar className="w-4 h-4 text-[#176B52]" />
              <span className="font-semibold">{pkg.departureDates[0]}</span>
            </div>
          </div>
        </div>

        {/* Nav Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition cursor-pointer ${
              activeTab === 'itinerary'
                ? 'border-[#176B52] text-[#176B52]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'bn' ? 'দিনভিত্তিক ভ্রমণসূচি' : 'Day-by-Day Itinerary'}
          </button>
          <button
            onClick={() => setActiveTab('inclusions')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition cursor-pointer ${
              activeTab === 'inclusions'
                ? 'border-[#176B52] text-[#176B52]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'bn' ? 'কী কী অন্তর্ভুক্ত' : 'Inclusions & Exclusions'}
          </button>
          <button
            onClick={() => setActiveTab('accommodation')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition cursor-pointer ${
              activeTab === 'accommodation'
                ? 'border-[#176B52] text-[#176B52]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'bn' ? 'হোটেল ও রিসোর্ট' : 'Accommodation'}
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition cursor-pointer ${
              activeTab === 'notes'
                ? 'border-[#176B52] text-[#176B52]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {lang === 'bn' ? 'জরুরি নির্দেশনা' : 'Important Notes'}
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto space-y-4">
          
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {pkg.itinerary.map((item) => (
                <div key={item.day} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-[#176B52] text-white flex items-center justify-center font-bold text-xs shrink-0 font-heading">
                    Day {item.day}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#25332D] font-heading">
                      {lang === 'bn' ? item.titleBn : item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {lang === 'bn' ? item.descriptionBn : item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-xs font-heading text-emerald-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'bn' ? 'প্যাকেজের সাথে অন্তর্ভুক্ত:' : 'Included in Package:'}</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {(lang === 'bn' ? pkg.inclusionsBn : pkg.inclusions).map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-xs font-heading text-rose-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <X className="w-4 h-4 text-rose-600" />
                  <span>{lang === 'bn' ? 'যা অন্তর্ভুক্ত নয়:' : 'Excluded / Not Included:'}</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {(lang === 'bn' ? pkg.exclusionsBn : pkg.exclusions).map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'accommodation' && (
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#25332D]">
                    {lang === 'bn' ? pkg.hotelDetailsBn : pkg.hotelDetails}
                  </h4>
                  <span className="text-xs text-slate-500">
                    {lang === 'bn' ? 'প্রিমিয়াম কোয়ালিটি টেস্টেড হোটেল/রিসোর্ট' : 'Verified Partner Property with Daily Breakfast'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                {lang === 'bn' 
                  ? 'পথিকের সকল প্যাকেজে যাচাইকৃত, নিরাপদ এবং পরিবার বা কাপলদের জন্য উপযুক্ত রিসোর্ট নিশ্চিত করা হয়।' 
                  : 'All POTHIK accommodations are vetted for hygiene, security, air conditioning, and beachfront/central access.'}
              </p>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-2">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'bn' ? 'ভ্রমণের সাধারণ শর্তাবলী' : 'General Travel Guidelines'}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-amber-800">
                  {(lang === 'bn' ? pkg.importantNotesBn : pkg.importantNotes).map((note, i) => (
                    <li key={i}>• {note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#176B52]" />
            <span>{lang === 'bn' ? '১০০% নিশ্চিত সিট ও স্বচ্ছ মূল্য' : '100% Confirmed Availability · No Hidden Fees'}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Secondary CTA: Ask for Details */}
            <button
              onClick={() => {
                onClose();
                onAskDetails(pkg);
              }}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition w-1/2 sm:w-auto cursor-pointer"
            >
              {lang === 'bn' ? 'বিস্তারিত তথ্য জানুন' : 'Ask for Details'}
            </button>

            {/* Primary CTA: Book This Package */}
            <button
              onClick={() => {
                onClose();
                onBookPackage(pkg);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#176B52] hover:bg-[#104C3A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition w-1/2 sm:w-auto cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#E6B94F]" />
              <span>{lang === 'bn' ? 'প্যাকেজটি বুক করুন' : 'Book This Package'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
