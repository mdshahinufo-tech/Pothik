import React, { useState } from 'react';
import { 
  Plane, 
  Calendar, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Search,
  Luggage,
  Coffee
} from 'lucide-react';
import { FLIGHTS_DATA, BRAND } from '../../data/pothikData';
import { FlightOption } from '../../types/pothik';

interface FlightBookingPageProps {
  lang: 'en' | 'bn';
  onOpenEnquiry: (service: string, details: string) => void;
}

export const FlightBookingPage: React.FC<FlightBookingPageProps> = ({
  lang,
  onOpenEnquiry,
}) => {
  const [tripType, setTripType] = useState<'roundTrip' | 'oneWay'>('roundTrip');
  const [origin, setOrigin] = useState('Dhaka (DAC)');
  const [destination, setDestination] = useState('Cox\'s Bazar (CXB)');
  const [depDate, setDepDate] = useState('');
  const [retDate, setRetDate] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [cabinClass, setCabinClass] = useState<'Economy' | 'Business'>('Economy');

  return (
    <div className="py-10 sm:py-14 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block">
          {lang === 'bn' ? 'ফ্লাইট বুকিং ও অনুসন্ধান' : 'Aviation & Ticketing Desk'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#25332D]">
          {lang === 'bn' ? 'স্বাচ্ছন্দ্যময় আকাশযাত্রার টিকিট' : 'Flight Booking & Assisted Ticketing'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {lang === 'bn'
            ? 'ঢাকা, কক্সবাজার ও আন্তর্জাতিক রুটের নিশ্চিত পিএনআর টিকিট। কোনো হিডেন চার্জ ছাড়া বিশেষ কর্পোরেট ও স্পেশাল ফেয়ার সুবিধা।'
            : 'Authorized agent issuance for Biman, US-Bangla, Thai Airways, Emirates, Singapore Airlines and domestic connections.'}
        </p>
      </div>

      {/* Flight Search Widget */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-md space-y-5">
        <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={tripType === 'roundTrip'}
              onChange={() => setTripType('roundTrip')}
              className="text-[#176B52] focus:ring-[#176B52]"
            />
            <span className={tripType === 'roundTrip' ? 'text-[#176B52] font-bold' : 'text-slate-600'}>
              {lang === 'bn' ? 'যাতায়াত উভয়মুখী (Round Trip)' : 'Round Trip'}
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={tripType === 'oneWay'}
              onChange={() => setTripType('oneWay')}
              className="text-[#176B52] focus:ring-[#176B52]"
            />
            <span className={tripType === 'oneWay' ? 'text-[#176B52] font-bold' : 'text-slate-600'}>
              {lang === 'bn' ? 'একমুখী (One Way)' : 'One Way'}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              {lang === 'bn' ? 'কোথা থেকে (Origin)' : 'From'}
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              {lang === 'bn' ? 'গন্তব্য (Destination)' : 'To'}
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              {lang === 'bn' ? 'যাত্রার তারিখ' : 'Departure'}
            </label>
            <input
              type="date"
              value={depDate}
              onChange={(e) => setDepDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              {lang === 'bn' ? 'ফেরার তারিখ' : 'Return'}
            </label>
            <input
              type="date"
              disabled={tripType === 'oneWay'}
              value={retDate}
              onChange={(e) => setRetDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 outline-none disabled:opacity-40"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              {lang === 'bn' ? 'যাত্রী ও ক্লাস' : 'Travelers & Class'}
            </label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="1"
                max="9"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                className="w-16 p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 outline-none"
              />
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value as any)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 bg-slate-50 outline-none"
              >
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-[#176B52]" />
            <span>
              {lang === 'bn'
                ? 'আইএটিএ ও এয়ারলাইন্স অনুমোদিত রিজার্ভেশন সিস্টেম দ্বারা তাৎক্ষণিক সহায়তা।'
                : 'Verified supplier availability & zero-delay e-ticket issuance.'}
            </span>
          </div>

          <button
            onClick={() => onOpenEnquiry('Flight', `${origin} to ${destination} (${passengers} Pax, ${cabinClass})`)}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#176B52] hover:bg-[#104C3A] text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer font-heading"
          >
            <Search className="w-4 h-4 text-[#E6B94F]" />
            <span>{lang === 'bn' ? 'ফ্লাইট ফেয়ার ও আসন নিশ্চিত করুন' : 'Lock Best Flight Fares'}</span>
          </button>
        </div>
      </div>

      {/* Featured Flights List */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-xl text-[#25332D] font-heading">
          {lang === 'bn' ? 'জনপ্রিয় রুটের বর্তমান ফ্লাইট শিডিউল' : 'Trending Scheduled Routes & Verified Fares'}
        </h3>

        <div className="space-y-3">
          {FLIGHTS_DATA.map((fl) => (
            <div
              key={fl.id}
              className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-[#176B52] transition flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-12 h-12 rounded-xl bg-[#F6F1E6] text-[#176B52] flex items-center justify-center text-xl shrink-0">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#25332D]">{fl.airline}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono font-bold">
                      {fl.airlineCode}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{fl.cabinClass} · {fl.stops}</span>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-center justify-center gap-6 w-full md:w-auto text-center">
                <div>
                  <span className="font-extrabold text-base text-slate-900">{fl.departureTime}</span>
                  <span className="text-[11px] text-slate-400 block">{fl.fromCode}</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-400 font-medium">{fl.duration}</span>
                  <div className="w-24 h-0.5 bg-slate-200 relative my-1">
                    <Plane className="w-3 h-3 text-[#176B52] absolute left-1/2 -top-1.5 -translate-x-1/2" />
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold">{fl.stops}</span>
                </div>

                <div>
                  <span className="font-extrabold text-base text-slate-900">{fl.arrivalTime}</span>
                  <span className="text-[11px] text-slate-400 block">{fl.toCode}</span>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between md:justify-end gap-5 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">
                    {lang === 'bn' ? 'শুরু মাত্র' : 'Starting at'}
                  </span>
                  <span className="text-lg font-extrabold text-[#176B52] font-heading">
                    ৳{fl.priceBDT.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => onOpenEnquiry('Flight', `${fl.airline} (${fl.fromCode} to ${fl.toCode})`)}
                  className="px-5 py-2.5 rounded-xl bg-[#176B52] hover:bg-[#104C3A] text-white text-xs font-bold transition shadow-xs cursor-pointer font-heading"
                >
                  {lang === 'bn' ? 'আসন বুক করুন' : 'Book Seat'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
