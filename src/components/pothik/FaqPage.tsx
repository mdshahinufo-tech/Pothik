import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  PhoneCall, 
  MessageSquare
} from 'lucide-react';
import { FAQS, BRAND } from '../../data/pothikData';

interface FaqPageProps {
  lang: 'en' | 'bn';
  onOpenEnquiry: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({
  lang,
  onOpenEnquiry,
}) => {
  const [openIndex, setOpenIndex] = useState<string | null>('0-0');
  const [search, setSearch] = useState('');

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="py-10 sm:py-16 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block">
          {lang === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'Frequently Asked Questions'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#25332D]">
          {lang === 'bn' ? 'আপনার প্রশ্নের সহজ উত্তর' : 'Common Travel Queries'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          {lang === 'bn'
            ? 'বুকিং, ট্রাভেল পাস, পেমেন্ট, ভিসা ও রিফান্ড সংক্রান্ত সাধারণ প্রশ্নের উত্তর এখানে পেয়ে যাবেন।'
            : 'Answers regarding Saint Martin ship bookings, QR travel passes, international visas, and refund rules.'}
        </p>
      </div>

      {/* FAQ Categories & Accordions */}
      <div className="space-y-8">
        {FAQS.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-3">
            <h3 className="font-extrabold text-base sm:text-lg text-[#176B52] font-heading border-b border-slate-200 pb-2">
              {lang === 'bn' ? cat.categoryBn : cat.category}
            </h3>

            <div className="space-y-2">
              {cat.questions.map((qItem, qIdx) => {
                const id = `${catIdx}-${qIdx}`;
                const isOpen = openIndex === id;

                return (
                  <div
                    key={qIdx}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition"
                  >
                    <button
                      onClick={() => toggleAccordion(id)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60"
                    >
                      <span className="font-extrabold text-xs sm:text-sm text-[#25332D]">
                        {lang === 'bn' ? qItem.qBn : qItem.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#176B52] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F6F1E6]/30">
                        {lang === 'bn' ? qItem.aBn : qItem.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Need more help CTA */}
      <div className="p-8 rounded-3xl bg-[#F6F1E6] border border-[#E6B94F]/30 text-center space-y-4">
        <h4 className="font-extrabold text-lg text-[#25332D] font-heading">
          {lang === 'bn' ? 'আপনার প্রশ্নের উত্তর পাননি?' : 'Still Have Questions?'}
        </h4>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          {lang === 'bn'
            ? 'আমাদের কাস্টমার সাপোর্ট টিম সপ্তাহে ৭ দিন সার্বক্ষণিক সক্রিয়।'
            : 'Speak directly with our concierge team on phone or instant WhatsApp.'}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${BRAND.hotline}`}
            className="px-6 py-2.5 rounded-xl bg-[#176B52] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow"
          >
            <PhoneCall className="w-4 h-4 text-[#E6B94F]" />
            <span>{BRAND.hotline}</span>
          </a>
          <button
            onClick={onOpenEnquiry}
            className="px-6 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-xs sm:text-sm hover:bg-slate-50"
          >
            {lang === 'bn' ? 'অনলাইন এনকোয়ারি পাঠান' : 'Submit Enquiry'}
          </button>
        </div>
      </div>

    </div>
  );
};
