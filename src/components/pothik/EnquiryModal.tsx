import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  Calendar, 
  Users, 
  PhoneCall, 
  Mail, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  Printer,
  Copy,
  ExternalLink
} from 'lucide-react';
import { BRAND } from '../../data/pothikData';
import { EnquirySubmission } from '../../types/pothik';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'bn';
  initialServiceType?: string;
  initialDestination?: string;
  onNewEnquiry?: (enquiry: EnquirySubmission) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialServiceType = 'Package',
  initialDestination = '',
  onNewEnquiry,
}) => {
  const [bookingMode, setBookingMode] = useState<'assisted' | 'direct'>('assisted');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState<any>(initialServiceType);
  const [destination, setDestination] = useState(initialDestination);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [requirements, setRequirements] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<EnquirySubmission | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialServiceType) setServiceType(initialServiceType);
    if (initialDestination) setDestination(initialDestination);
    setSubmittedEnquiry(null);
  }, [initialServiceType, initialDestination, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ref = `PK-2025-${randomSuffix}`;

    const newEnq: EnquirySubmission = {
      id: `enq-${Date.now()}`,
      referenceNumber: ref,
      fullName,
      email,
      phone,
      serviceType,
      destination: destination || 'Saint Martin & Cox\'s Bazar',
      departureDate: departureDate || new Date().toISOString().split('T')[0],
      returnDate: returnDate || undefined,
      travelers,
      additionalRequirements: requirements,
      status: bookingMode === 'direct' ? 'Confirmed' : 'Pending',
      createdAt: new Date().toLocaleString(),
      assignedStaff: 'POTHIK Central Desk',
      internalNotes: bookingMode === 'direct' 
        ? 'Instant reservation created via direct booking flow.' 
        : 'Assisted booking enquiry awaiting representative assignment.',
      totalQuotedPrice: serviceType === 'Visa' ? 12500 : serviceType === 'Flight' ? 28500 : 17000 * travelers,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedEnquiry(newEnq);
      if (onNewEnquiry) {
        onNewEnquiry(newEnq);
      }
    }, 600);
  };

  const handleCopyRef = () => {
    if (submittedEnquiry) {
      navigator.clipboard.writeText(submittedEnquiry.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#F6F1E6] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-[#176B52] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E6B94F] text-[#25332D] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-[#25332D]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold font-heading">
                {lang === 'bn' ? 'ভ্রমণ অনুসন্ধান ও বুকিং' : 'Plan Your Journey with POTHIK'}
              </h3>
              <p className="text-xs text-[#E6B94F] font-medium">
                {lang === 'bn' ? '১০০% নিশ্চিত সহায়তা ও তাৎক্ষণিক রেফারেন্স নম্বর' : 'Guaranteed Travel Support · Instant Enquiry Reference'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
          
          {submittedEnquiry ? (
            /* Submission Success View */
            <div className="text-center py-6 space-y-5 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {bookingMode === 'direct' 
                    ? (lang === 'bn' ? 'বুকিং সংরক্ষিত হয়েছে' : 'Booking Reserved') 
                    : (lang === 'bn' ? 'অনুসন্ধান সফলভাবে গ্রহণ করা হয়েছে' : 'Enquiry Received')}
                </span>
                <h4 className="text-2xl font-extrabold text-[#25332D] font-heading mt-2">
                  {lang === 'bn' ? 'ধন্যবাদ, ' + submittedEnquiry.fullName : 'Thank You, ' + submittedEnquiry.fullName}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1">
                  {lang === 'bn'
                    ? 'আপনার অনুরোধটি রেকর্ড করা হয়েছে। পথিক ভ্রমণ প্রতিনিধি অবিলম্বে আপনার সাথে যোগাযোগ করবেন।'
                    : 'Your request has been filed into our concierge desk. A POTHIK travel specialist will contact you shortly.'}
                </p>
              </div>

              {/* Reference Card */}
              <div className="p-4 bg-[#F6F1E6] rounded-2xl border border-[#E6B94F]/40 max-w-md mx-auto text-left space-y-2">
                <div className="flex items-center justify-between text-xs border-b border-black/10 pb-2">
                  <span className="text-slate-500 font-semibold">{lang === 'bn' ? 'রেফারেন্স আইডি:' : 'Enquiry Reference:'}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-extrabold text-[#176B52] text-sm bg-white px-2 py-0.5 rounded border border-slate-300">
                      {submittedEnquiry.referenceNumber}
                    </span>
                    <button
                      onClick={handleCopyRef}
                      className="p-1 text-slate-500 hover:text-slate-900 cursor-pointer"
                      title="Copy Reference"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    {copied && <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'সেবা:' : 'Service:'}</span>
                    <span className="font-bold">{submittedEnquiry.serviceType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'গন্তব্য:' : 'Destination:'}</span>
                    <span className="font-bold">{submittedEnquiry.destination}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'যাত্রার তারিখ:' : 'Date:'}</span>
                    <span className="font-bold">{submittedEnquiry.departureDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{lang === 'bn' ? 'যাত্রী:' : 'Travelers:'}</span>
                    <span className="font-bold">{submittedEnquiry.travelers} Persons</span>
                  </div>
                </div>
              </div>

              {/* Follow-up Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${BRAND.whatsapp.replace('+', '')}?text=${encodeURIComponent(`Hello POTHIK, I submitted enquiry ${submittedEnquiry.referenceNumber} for ${submittedEnquiry.destination}. Please update me on availability.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপে দ্রুত আপডেট নিন' : 'WhatsApp Instant Follow-up'}</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm"
                >
                  {lang === 'bn' ? 'সম্পন্ন করুন' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Mode Selector (Prompt requirement: Clearly distinguish Direct vs Assisted) */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setBookingMode('assisted')}
                  className={`py-2 px-3 rounded-xl transition cursor-pointer text-center ${
                    bookingMode === 'assisted'
                      ? 'bg-white text-[#176B52] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'bn' ? 'পরামর্শ ও সহায়তা (Assisted)' : 'Assisted Travel Planning'}
                </button>
                <button
                  type="button"
                  onClick={() => setBookingMode('direct')}
                  className={`py-2 px-3 rounded-xl transition cursor-pointer text-center ${
                    bookingMode === 'direct'
                      ? 'bg-white text-[#176B52] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'bn' ? 'সরাসরি আসন সংরক্ষণ (Direct)' : 'Direct Supplier Booking'}
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F6F1E6] text-[11px] text-[#25332D] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#176B52] shrink-0" />
                <span>
                  {bookingMode === 'assisted'
                    ? (lang === 'bn'
                        ? 'আমাদের অভিজ্ঞ ট্রাভেল কনসালট্যান্ট আপনার বাজেট ও পছন্দ অনুযায়ী সেরা অপশন নির্ধারণে সহায়তা করবেন।'
                        : 'Our certified consultants will tailor itineraries, airfares, and accommodations to your exact needs.')
                    : (lang === 'bn'
                        ? 'অনুমোদিত ভেসেল, এয়ারলাইন্স ও হোটেলের সাথে সরাসরি কানেক্ট করে আসন লক করা হবে।'
                        : 'Direct booking requests are instantly dispatched to supplier inventory with guaranteed PNR.')}
                </span>
              </div>

              {/* Service Type & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'সেবার ধরন *' : 'Service Type *'}
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold bg-white outline-none focus:ring-2 focus:ring-[#176B52]"
                  >
                    <option value="Package">{lang === 'bn' ? 'ট্যুর প্যাকেজ (Tour Package)' : 'Holiday Tour Package'}</option>
                    <option value="Flight">{lang === 'bn' ? 'বিমান টিকিট (Flight Booking)' : 'Flight Tickets'}</option>
                    <option value="Hotel">{lang === 'bn' ? 'হোটেল ও রিসোর্ট (Hotel / Resort)' : 'Hotel & Resort'}</option>
                    <option value="Visa">{lang === 'bn' ? 'ভিসা সহায়তা (Visa Assistance)' : 'Visa Documentation'}</option>
                    <option value="Custom Tour">{lang === 'bn' ? 'কাস্টমাইজড ট্রিপ (Custom Tour)' : 'Custom Tailored Tour'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'কাঙ্ক্ষিত গন্তব্য *' : 'Destination *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: সেন্টমার্টিন, মালদ্বীপ, বালি...' : 'e.g., Saint Martin, Maldives, Dubai...'}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                  />
                </div>
              </div>

              {/* Dates & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'যাত্রার সম্ভাব্য তারিখ *' : 'Departure Date *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ফেরার তারিখ (ঐচ্ছিক)' : 'Return Date (Optional)'}
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'যাত্রী সংখ্যা *' : 'Travelers *'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'পূর্ণ নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Tanvir Ahmed"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ইমেইল অ্যাড্রেস *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tanvir@example.com"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ফোন / WhatsApp *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+88017XXXXXXXX"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                  />
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'বিশেষ চাহিদা বা মন্তব্য (ঐচ্ছিক)' : 'Additional Requirements (Optional)'}
                </label>
                <textarea
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder={lang === 'bn' 
                    ? 'যেমন: সী-ভিউ রুম, বুফে খাবার, বাচ্চাদের জন্য আলাদা বেড, এয়ারপোর্ট পিকআপ ইত্যাদি...' 
                    : 'e.g., Sea-view cottage, airport transfers, halal meals, honeymoon cake...'}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>

              {/* Submission CTA */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {lang === 'bn' ? '🔒 আপনার তথ্য সম্পূর্ণ সুরক্ষিত থাকবে।' : '🔒 Your data is processed securely.'}
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#176B52] hover:bg-[#104C3A] text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4 text-[#E6B94F]" />
                  )}
                  <span>
                    {bookingMode === 'direct' 
                      ? (lang === 'bn' ? 'সরাসরি বুকিং কনফার্ম করুন' : 'Confirm Direct Booking') 
                      : (lang === 'bn' ? 'অনুরোধ জমা দিন' : 'Submit Travel Enquiry')}
                  </span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
