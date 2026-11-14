import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  Play, 
  Pause, 
  CloudSun,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { 
  HOTLINE_PRIMARY,
  BRAND_NAME,
  BRAND_NAME_BN,
  BRAND_SLOGAN
} from '../data/travelData';
import { ttsService, PlaybackState } from '../services/ttsService';
import { OtaSearchWidget } from './OtaSearchWidget';
import { OtaSearchQuery } from '../types';

interface HeroProps {
  lang: 'bn' | 'en';
  activeTab?: 'ships' | 'resorts' | 'packages' | 'pass';
  onTabChange?: (tab: 'ships' | 'resorts' | 'packages' | 'pass') => void;
  onOpenBooking: () => void;
  onOpenVerifyModal: () => void;
  onOpenVoiceStudio: () => void;
  onPerformSearch: (query: OtaSearchQuery) => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  activeTab = 'ships',
  onTabChange,
  onOpenBooking,
  onOpenVerifyModal,
  onOpenVoiceStudio,
  onPerformSearch,
}) => {
  const [ttsState, setTtsState] = useState<PlaybackState>({
    isPlaying: false,
    isLoading: false,
    currentAudioUrl: null,
    error: null,
    source: null,
  });

  const handleTogglePromoAudio = () => {
    if (ttsState.isPlaying) {
      ttsService.stopAudio();
      setTtsState((prev) => ({ ...prev, isPlaying: false }));
    } else {
      const textToSpeak = lang === 'bn' 
        ? `পথিক (POTHIK) এ নিশ্চিত করুন ১০০% রিয়েল সেন্টমার্টিন ট্রিপ। ভ্যালিড কিউআর ট্রাভেল পাস, গ্যারান্টিড শিপ টিকিট ও কনফার্মড রিসোর্ট বুকিং। হটলাইন +8801576466092`
        : `POTHIK guarantees 100% authentic Saint Martin travel. Verified QR travel passes, reserved ship seats, and confirmed beachfront resorts. Hotline: +8801576466092`;

      ttsService.generateAndPlaySpeech(
        textToSpeak,
        'Kore',
        'Warm, polite Bengali travel advisor',
        (state) => setTtsState(state)
      );
    }
  };

  return (
    <section className="relative overflow-visible bg-gradient-to-b from-[#003B23] via-[#00482B] to-[#002B19] text-white pt-8 pb-14 sm:pb-18">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:28px_28px]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Weather & Island Advisory Capsule */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-emerald-100 shadow-sm">
            <CloudSun className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold text-white">
              {lang === 'bn' 
                ? 'সেন্টমার্টিন লাইভ আবহাওয়া: ২৭°C · সাগর শান্ত · ক্রুজ চলাচলের শতভাগ অনুকূল'
                : 'Saint Martin Live: 27°C · Calm Waters · Safe for Marine Cruise Navigation'}
            </span>
          </div>
        </div>

        {/* Clean, Focused Headline & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold mb-3 tracking-wide">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{BRAND_NAME} ({BRAND_NAME_BN}) — {BRAND_SLOGAN}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-3">
            {lang === 'bn' ? (
              <>
                সেন্টমার্টিন ভ্রমণের{' '}
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-200 bg-clip-text text-transparent">
                  নিশ্চিত ও নিরাপদ সমাধান
                </span>
              </>
            ) : (
              <>
                Authentic Saint Martin{' '}
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-200 bg-clip-text text-transparent">
                  Travel & Booking Gateway
                </span>
              </>
            )}
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
            {lang === 'bn' 
              ? 'কক্সবাজার ঘাটে ভুয়া টিকিট বা রিসোর্ট বিড়ম্বনা নয়—সরাসরি অনুমোদিত ভেসেল টিকিট ও ডিজিটাল QR পাস।' 
              : 'Zero fake tickets or unconfirmed room cancellations. Official BIWTA ship PNR seats and verified QR passes.'}
          </p>

          {/* Quick Voice Audio Capsule */}
          <div className="mt-3.5 flex items-center justify-center gap-3">
            <button
              onClick={handleTogglePromoAudio}
              disabled={ttsState.isLoading}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                ttsState.isPlaying
                  ? 'bg-amber-500 text-slate-900 font-bold animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/20'
              }`}
            >
              {ttsState.isLoading ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : ttsState.isPlaying ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3 fill-current text-amber-400" />
              )}
              <span>{lang === 'bn' ? 'ভয়েস গাইডেন্স শুনুন' : 'Audio Guide'}</span>
            </button>
          </div>
        </div>

        {/* Master Search Engine Card (Clean & Prominent) */}
        <div className="mb-8">
          <OtaSearchWidget
            lang={lang}
            activeTab={activeTab}
            onTabChange={onTabChange}
            onSearch={onPerformSearch}
            onOpenPassVerify={onOpenVerifyModal}
          />
        </div>

        {/* Clean, Minimalist 3-Pillar Proof Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-emerald-200/90 border-t border-emerald-800/60 pt-5">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-white">
              {lang === 'bn' ? '১০০% ভ্যালিড QR ট্রাভেল পাস' : '100% Valid QR Travel Pass'}
            </span>
          </div>

          <span className="text-emerald-700 hidden sm:inline">·</span>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-white">
              {lang === 'bn' ? 'গ্যারান্টিড শিপ আসন (PNR)' : 'Guaranteed Ship Seat (PNR)'}
            </span>
          </div>

          <span className="text-emerald-700 hidden sm:inline">·</span>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-white">
              {lang === 'bn' ? 'কনফার্মড সৈকত রিসোর্ট' : 'Confirmed Beach Resort'}
            </span>
          </div>

          <span className="text-emerald-700 hidden sm:inline">·</span>

          <div className="flex items-center gap-1.5 text-amber-300">
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <a href={`tel:${HOTLINE_PRIMARY}`} className="font-bold hover:underline">
              {HOTLINE_PRIMARY}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
