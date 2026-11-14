import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Ship, 
  Building2, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  Gift
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';
import { TourPackage } from '../types';

interface PackageSectionProps {
  lang: 'bn' | 'en';
  onSelectPackage: (pkg: TourPackage) => void;
}

export const PackageSection: React.FC<PackageSectionProps> = ({
  lang,
  onSelectPackage,
}) => {
  return (
    <section id="packages" className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - Clean & Minimal */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'bn' ? 'হলিডে ট্যুর প্যাকেজ' : 'Holiday Tour Packages'}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base">
            {lang === 'bn'
              ? 'শিপ টিকিট, রিসোর্ট ও কিউআর ট্রাভেল পাস একসাথে সাশ্রয়ী মূল্যে।'
              : 'Ship tickets, resort stays, and QR travel passes combined seamlessly.'}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TOUR_PACKAGES.map((pkg, index) => {
            const isFeatured = index === 0;

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isFeatured
                    ? 'border-cyan-500 shadow-2xl bg-gradient-to-b from-cyan-50/50 via-white to-white ring-2 ring-cyan-500/20'
                    : 'border-slate-200 shadow-lg bg-white hover:border-slate-300 hover:shadow-xl'
                }`}
              >
                {/* Popular Pill */}
                {pkg.popularTag && (
                  <div className="absolute top-0 right-0">
                    <span className="px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-bl-2xl shadow-sm">
                      {lang === 'bn' ? pkg.popularTagBn : pkg.popularTag}
                    </span>
                  </div>
                )}

                <div className="p-7">
                  {/* Duration Badge */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full mb-3">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{lang === 'bn' ? pkg.durationBn : pkg.duration}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                    {lang === 'bn' ? pkg.titleBn : pkg.title}
                  </h3>

                  {/* Included inclusions */}
                  <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Ship className="w-4 h-4 text-cyan-600 shrink-0" />
                      <span className="font-semibold">{lang === 'bn' ? pkg.shipIncludedBn : pkg.shipIncluded}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold">{lang === 'bn' ? pkg.resortTypeBn : pkg.resortType}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-6 space-y-2.5">
                    <span className="text-xs font-bold text-slate-900 block">
                      {lang === 'bn' ? 'প্যাকেজের প্রধান সুবিধাসমূহ:' : 'Package Highlights:'}
                    </span>
                    {(lang === 'bn' ? pkg.highlightsBn : pkg.highlights).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400 line-through mr-2">
                        ৳{pkg.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-cyan-800">
                        ৳{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 block">
                        {lang === 'bn' ? 'অল-ইনক্লুসিভ প্যাকেজ মূল্য' : 'All-inclusive total rate'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? `মাত্র ${pkg.remainingSlots}টি স্লট বাকি` : `${pkg.remainingSlots} slots left`}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="p-7 pt-0">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      isFeatured
                        ? 'bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white shadow-cyan-600/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'এই প্যাকেজটি নিশ্চিত করুন' : 'Lock in This Package'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
