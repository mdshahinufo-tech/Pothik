import React, { useState } from 'react';
import { 
  Tag, 
  Copy, 
  Check, 
  ArrowRight,
  Percent
} from 'lucide-react';

interface PromoOffersCarouselProps {
  lang: 'bn' | 'en';
  onApplyCoupon: (code: string) => void;
}

export const PromoOffersCarousel: React.FC<PromoOffersCarouselProps> = ({
  lang,
  onApplyCoupon,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const offers = [
    {
      id: 'early-bird',
      code: 'STMARTIN35',
      titleBn: '৩৫% ছাড় · অগ্রিম বুকিং',
      titleEn: 'Up to 35% OFF · Early Bird',
      descBn: 'জাহাজ টিকিট ও বিচ রিসোর্ট কম্বো বুকিংয়ে সরাসরি ছাড়।',
      descEn: 'Instant discount on advance ship + resort combo booking.',
      badgeBn: 'মেগা অফার',
      badgeEn: 'Mega Deal',
      gradient: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'bkash-cashback',
      code: 'BKASH500',
      titleBn: '৳৫০০ ক্যাশব্যাক · বিকাশ ও নগদ',
      titleEn: '৳500 Cashback · bKash & Nagad',
      descBn: 'অনলাইন পেমেন্টে ওয়ালেটে তাৎক্ষণিক ক্যাশব্যাক।',
      descEn: 'Instant wallet cashback upon online ticket checkout.',
      badgeBn: 'ক্যাশব্যাক',
      badgeEn: 'Cashback',
      gradient: 'from-pink-600 to-rose-700',
    },
    {
      id: 'free-pass',
      code: 'GOVTPASS',
      titleBn: 'ফ্রি সরকারি QR ট্রাভেল পাস',
      titleEn: 'Free Verified QR Travel Pass',
      descBn: 'প্রতিটি রাউন্ড-ট্রিপে সম্পূর্ণ ফ্রি ডিজিটাল পাস।',
      descEn: 'Complimentary official travel pass with all round-trip tickets.',
      badgeBn: 'ফ্রি পাস',
      badgeEn: 'Free Pass',
      gradient: 'from-emerald-600 to-teal-700',
    },
    {
      id: 'emi-ebl',
      code: 'EBLZERO',
      titleBn: '০% ইএমআই · সকল প্রধান কার্ডে',
      titleEn: '0% EMI · Major Credit Cards',
      descBn: '৩ ও ৬ মাসের সহজ কিস্তি সুবিধা কোনো অতিরিক্ত ফি ছাড়া।',
      descEn: 'Zero cost 3 to 6-month EMI on select partner banks.',
      badgeBn: '০% ইএমআই',
      badgeEn: '0% EMI',
      gradient: 'from-cyan-700 to-blue-800',
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-cyan-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'bn' ? 'স্পেশাল ডিল ও ক্যাশব্যাক' : 'Special Deals & Vouchers'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            {lang === 'bn' ? 'চেকআউটে কোডটি ব্যবহার করুন' : 'Apply coupon code at checkout'}
          </span>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`rounded-2xl bg-gradient-to-br ${offer.gradient} text-white p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-white/20 uppercase tracking-wider">
                    {lang === 'bn' ? offer.badgeBn : offer.badgeEn}
                  </span>
                </div>

                <h3 className="font-extrabold text-base mb-1">
                  {lang === 'bn' ? offer.titleBn : offer.titleEn}
                </h3>

                <p className="text-white/80 text-xs leading-relaxed">
                  {lang === 'bn' ? offer.descBn : offer.descEn}
                </p>
              </div>

              {/* Coupon Code Row */}
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest bg-black/25 px-2 py-1 rounded-lg">
                  {offer.code}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
                    title="Copy code"
                  >
                    {copiedCode === offer.code ? (
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => onApplyCoupon(offer.code)}
                    className="px-2.5 py-1 bg-white text-slate-900 hover:bg-white/90 text-xs font-bold rounded-lg transition shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>{lang === 'bn' ? 'ব্যবহার' : 'Apply'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
