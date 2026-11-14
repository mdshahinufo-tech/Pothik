import React, { useState } from 'react';
import { 
  FileCheck, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  FileText, 
  Sparkles,
  ArrowRight,
  Globe
} from 'lucide-react';
import { VISA_GUIDES, BRAND } from '../../data/pothikData';
import { VisaGuide } from '../../types/pothik';

interface VisaAssistancePageProps {
  lang: 'en' | 'bn';
  onOpenEnquiry: (service: string, dest: string) => void;
}

export const VisaAssistancePage: React.FC<VisaAssistancePageProps> = ({
  lang,
  onOpenEnquiry,
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>(VISA_GUIDES[0].id);

  const activeGuide = VISA_GUIDES.find((v) => v.id === selectedCountryId) || VISA_GUIDES[0];

  return (
    <div className="py-10 sm:py-14 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block">
          {lang === 'bn' ? 'ভিসা ও কনস্যুলার প্রসেসিং' : 'Consular & Visa Advisory'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#25332D]">
          {lang === 'bn' ? 'নির্ভুল ফাইল তৈরি ও ভিসা সহায়তা' : 'Visa Assistance & Documentation'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {lang === 'bn'
            ? 'পাসপোর্ট যাচাই, ব্যাংক স্টেটমেন্ট মূল্যায়ন, অ্যাপয়েন্টমেন্ট শিডিউলিং ও নির্ভুল কভার লেটার প্রস্তুতকরণ।'
            : 'Meticulous document preparation, financial assessment, biometric appointment assistance, and authorized filing.'}
        </p>
      </div>

      {/* Prominent Legal Disclaimer Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-950 flex items-start gap-3 max-w-4xl mx-auto">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed space-y-1">
          <span className="font-extrabold font-heading block">
            {lang === 'bn' ? 'অফিসিয়াল নীতি ও ঘোষণা:' : 'Official Regulatory Disclaimer:'}
          </span>
          <p>
            {lang === 'bn'
              ? 'ভিসা মঞ্জুর বা বাতিলের চূড়ান্ত ক্ষমতা সম্পূর্ণরূপে সংশ্লিষ্ট দূতাবাস ও কনস্যুলেটের নিজস্ব এখতিয়ারভুক্ত। পথিক কোনো অবস্থাতেই ভিসা গ্যারান্টি দেয় না; আমাদের ভূমিকা হলো পেশাদারভাবে ফাইল ত্রুটিমুক্ত প্রস্তুত করা।'
              : 'Visa decisions are made exclusively and independently by the respective sovereign foreign embassies and high commissions. POTHIK does not and cannot guarantee visa approval; our service ensures professional scrutiny, correct documentation, and timely submission.'}
          </p>
        </div>
      </div>

      {/* Country Selection & Interactive Guide Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Country Selector Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1">
            {lang === 'bn' ? 'দেশ নির্বাচন করুন' : 'Select Destination Country'}
          </span>
          {VISA_GUIDES.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedCountryId(v.id)}
              className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between cursor-pointer ${
                selectedCountryId === v.id
                  ? 'border-[#176B52] bg-[#F6F1E6] shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{v.flag}</span>
                <div>
                  <h4 className="font-extrabold text-sm text-[#25332D] font-heading">
                    {lang === 'bn' ? v.countryBn : v.country}
                  </h4>
                  <span className="text-[11px] text-slate-500 block">
                    {lang === 'bn' ? v.visaTypeBn : v.visaType}
                  </span>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 ${selectedCountryId === v.id ? 'text-[#176B52]' : 'text-slate-300'}`} />
            </button>
          ))}
        </div>

        {/* Detailed Country Requirements Panel */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{activeGuide.flag}</span>
              <div>
                <h3 className="text-2xl font-extrabold font-heading text-[#25332D]">
                  {lang === 'bn' ? activeGuide.countryBn + ' ভিসা গাইডেন্স' : activeGuide.country + ' Visa Guidance'}
                </h3>
                <span className="text-xs text-[#176B52] font-semibold">
                  {lang === 'bn' ? activeGuide.visaTypeBn : activeGuide.visaType}
                </span>
              </div>
            </div>

            <button
              onClick={() => onOpenEnquiry('Visa', activeGuide.country)}
              className="px-6 py-2.5 rounded-xl bg-[#176B52] hover:bg-[#104C3A] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0 font-heading"
            >
              <Send className="w-4 h-4 text-[#E6B94F]" />
              <span>{lang === 'bn' ? 'ভিসা আবেদন শুরু করুন' : 'Apply for this Visa'}</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F6F1E6] p-4 rounded-2xl text-xs">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">
                {lang === 'bn' ? 'প্রসেসিং সময়' : 'Processing Time'}
              </span>
              <span className="font-extrabold text-[#25332D] text-sm">
                {lang === 'bn' ? activeGuide.processingTimeBn : activeGuide.processingTime}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">
                {lang === 'bn' ? 'ভিসার মেয়াদ' : 'Validity'}
              </span>
              <span className="font-extrabold text-[#25332D] text-sm">
                {lang === 'bn' ? activeGuide.validityBn : activeGuide.validity}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">
                {lang === 'bn' ? 'ফি (শুরু)' : 'Service & Govt Fee'}
              </span>
              <span className="font-extrabold text-[#176B52] text-sm font-heading">
                ৳{activeGuide.feeBDT.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#25332D] uppercase tracking-wider font-heading flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#176B52]" />
              <span>{lang === 'bn' ? 'প্রয়োজনীয় নথিপত্রের তালিকা (Checklist)' : 'Required Documents Checklist'}</span>
            </h4>
            <div className="space-y-2">
              {(lang === 'bn' ? activeGuide.requirementsBn : activeGuide.requirements).map((req, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#176B52] uppercase tracking-wider block">
              {lang === 'bn' ? 'পথিক প্রসেসিং প্রটোকল' : 'POTHIK Step-by-Step Assistance'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">১. ফাইল রিভিউ</span>
                <span>পাসপোর্ট ও আর্থিক ডকুমেন্টের নির্ভুলতা যাচাই।</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">২. সাবমিশন</span>
                <span>অনলাইন ই-ভিসা পোর্টাল বা ভিএফএস অ্যাপয়েন্টমেন্ট বুকিং।</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-0.5">৩. ডেলিভারি</span>
                <span>ই-ভিসা ডাউনলোড বা পাসপোর্ট ট্র্যাকিং নোটিফিকেশন।</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <p className="text-xs text-slate-500 italic">
            {lang === 'bn' ? activeGuide.notesBn : activeGuide.notes}
          </p>

        </div>

      </div>

    </div>
  );
};
