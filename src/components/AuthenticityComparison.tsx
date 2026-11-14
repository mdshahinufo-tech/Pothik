import React from 'react';
import { 
  ShieldCheck, 
  XCircle, 
  CheckCircle2, 
  QrCode, 
  Ticket, 
  Building2, 
  PhoneCall, 
  ArrowRight
} from 'lucide-react';
import { HOTLINE_PRIMARY, OFFICIAL_LICENSE } from '../data/travelData';

interface AuthenticityComparisonProps {
  lang: 'bn' | 'en';
  onOpenBooking: () => void;
  onOpenVerifyModal: () => void;
}

export const AuthenticityComparison: React.FC<AuthenticityComparisonProps> = ({
  lang,
  onOpenBooking,
  onOpenVerifyModal,
}) => {
  const pillars = [
    {
      icon: QrCode,
      titleBn: 'ভ্যালিড QR ট্রাভেল পাস',
      titleEn: 'Verified QR Travel Pass',
      descBn: 'বিআইডব্লিউটিএ ও পর্যটন বোর্ড অনুমোদিত। ঘাটের চেকপোস্টে সরাসরি স্ক্যানযোগ্য।',
      descEn: 'Approved by BIWTA & Tourism Board with direct checkpoint scanner verification.',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      icon: Ticket,
      titleBn: 'গ্যারান্টিড শিপ টিকিট',
      titleEn: 'Guaranteed Ship Tickets',
      descBn: 'জাহাজের মূল সার্ভার থেকে সরাসরি পিএনআর ও নির্ধারিত আসন নম্বর বরাদ্দ।',
      descEn: 'Direct vessel server PNR reservation with confirmed seat numbers.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      icon: Building2,
      titleBn: 'কনফার্মড বিচ রিসোর্ট',
      titleEn: 'Confirmed Beach Resorts',
      descBn: 'সরাসরি রিসোর্ট ওনারের সাথে ডিজিটাল কী-লক ভাউচার। দ্বীপে পৌঁছে রুম বাতিলের ভয় নেই।',
      descEn: 'Physical key-lock reservation direct with beachfront resort management.',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Clean & Minimal */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bn' ? 'কেন Tripbooking.ai?' : 'Why Tripbooking.ai?'}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {lang === 'bn'
              ? 'কক্সবাজার এসে ভুয়া টিকিট বা রিসোর্ট বাতিলের ঝুঁকি ছাড়াই নিশ্চিন্ত ভ্রমণ।'
              : 'Travel without the risk of fake tickets or unconfirmed island bookings.'}
          </p>
        </div>

        {/* 3 Clean Modern Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200/90 hover:border-slate-300 transition-all shadow-xs hover:shadow-md bg-white flex flex-col justify-between"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl ${pillar.bgColor} ${pillar.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900 mb-1.5">
                    {lang === 'bn' ? pillar.titleBn : pillar.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'bn' ? pillar.descBn : pillar.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'bn' ? '১০০% নিশ্চিত নিশ্চয়তা' : '100% Guaranteed'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Contrast Strip */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-rose-700 font-medium">
              <span className="font-bold text-rose-600">✕</span>
              <span>{lang === 'bn' ? 'দালাল ও ভুয়া কাউন্টার: জাল কাগজ ও অনিশ্চিত সিট' : 'Scalpers: Forged paper slips & unassigned seats'}</span>
            </div>
            <span className="text-slate-300 hidden md:inline">|</span>
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <span className="font-extrabold text-emerald-600">✓</span>
              <span>{lang === 'bn' ? 'Tripbooking.ai: ডিজিটাল QR পাস ও ২৪/৭ অন-গ্রাউন্ড সহায়তা' : 'Tripbooking.ai: Encrypted QR pass & 24/7 port support'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenVerifyModal}
              className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white border border-slate-200 rounded-xl transition cursor-pointer"
            >
              {lang === 'bn' ? 'পাস যাচাই' : 'Verify Pass'}
            </button>
            <button
              onClick={onOpenBooking}
              className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition cursor-pointer"
            >
              {lang === 'bn' ? 'বুকিং করুন' : 'Book Now'}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
