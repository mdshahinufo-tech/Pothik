import React, { useState } from 'react';
import { Download, Smartphone, WifiOff, X, Share } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  lang: 'en' | 'bn';
  variant?: 'header' | 'footer' | 'card';
  showFallbackInfo?: boolean;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  lang,
  variant = 'footer',
  showFallbackInfo = false,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  if (isInstalled && !showFallbackInfo) {
    return null;
  }

  if (isInstalled && showFallbackInfo) {
    return (
      <div className="inline-flex items-center gap-2 px-4 min-h-[44px] rounded-xl bg-emerald-50 border border-emerald-200 text-[#176B52] text-xs font-bold">
        <Smartphone className="w-4 h-4 shrink-0" />
        <span>{lang === 'bn' ? 'অ্যাপ ইনস্টল করা আছে' : 'App Installed (Standalone)'}</span>
      </div>
    );
  }

  const handleAction = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuideModal(true);
    }
  };

  if (!isInstallable && !isIOS && !showFallbackInfo && variant === 'header') {
    return null;
  }

  const buttonClasses =
    variant === 'header'
      ? 'w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#F6F1E6] hover:bg-[#efe6d2] border border-[#E6B94F]/40 text-xs font-bold text-[#25332D] flex items-center justify-center gap-2 transition cursor-pointer'
      : variant === 'card'
      ? 'min-h-[44px] px-5 py-2.5 rounded-xl bg-[#176B52] hover:bg-[#125742] text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer whitespace-nowrap shrink-0'
      : 'min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold inline-flex items-center gap-2 transition cursor-pointer whitespace-nowrap shrink-0';

  const label = isInstallable
    ? lang === 'bn'
      ? 'অ্যান্ড্রয়েড অ্যাপ ইনস্টল'
      : 'Install Android App'
    : isIOS
    ? lang === 'bn'
      ? 'আইফোনে অ্যাপ যোগ করুন'
      : 'Install on iPhone'
    : lang === 'bn'
    ? 'মোবাইল অ্যাপ ইনস্টল গাইড'
    : 'Get Mobile App';

  return (
    <>
      <button type="button" onClick={handleAction} className={buttonClasses}>
        {isInstallable ? (
          <Download className="w-4 h-4 text-[#E6B94F] shrink-0" />
        ) : (
          <Smartphone className="w-4 h-4 text-[#E6B94F] shrink-0" />
        )}
        <span>{label}</span>
      </button>

      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-[#25332D] space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src="/pothik-brand-icon.svg"
                  alt="POTHIK App Icon"
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-xl object-contain border border-slate-200 bg-white p-1"
                />
                <div>
                  <h3 className="text-base font-extrabold font-heading text-[#25332D]">
                    {lang === 'bn' ? 'POTHIK মোবাইল অ্যাপ ইনস্টল' : 'Install POTHIK Mobile App'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'bn' ? 'অ্যান্ড্রয়েড ও আইফোন হোম স্ক্রিন অ্যাপ' : 'Android & iOS Home Screen App'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isIOS ? (
              <div className="p-4 rounded-2xl bg-[#F6F1E6] border border-[#E6B94F]/30 space-y-2 text-xs text-[#25332D] leading-relaxed">
                <p className="font-bold flex items-center gap-1.5">
                  <Share className="w-4 h-4 text-[#176B52]" />
                  <span>{lang === 'bn' ? 'iPhone / iPad Safari নির্দেশনা:' : 'iPhone / iPad Safari Steps:'}</span>
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-700">
                  <li>{lang === 'bn' ? 'নিচের Safari Share বাটনে ট্যাপ করুন।' : 'Tap the Share button in Safari toolbar.'}</li>
                  <li>{lang === 'bn' ? 'নিচে স্ক্রল করে "Add to Home Screen" সিলেক্ট করুন।' : 'Scroll down and tap "Add to Home Screen".'}</li>
                  <li>{lang === 'bn' ? 'ডান কোণায় "Add" চাপলেই অ্যাপ ইনস্টল হয়ে যাবে।' : 'Tap "Add" to launch POTHIK full-screen.'}</li>
                </ol>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#F6F1E6] border border-[#E6B94F]/30 space-y-2 text-xs text-[#25332D] leading-relaxed">
                <p className="font-bold">
                  {lang === 'bn' ? 'Android Chrome নির্দেশনা:' : 'Android Chrome Steps:'}
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-700">
                  <li>{lang === 'bn' ? 'লাইভ Render বা HTTPS ওয়েবসাইট Chrome-এ ওপেন করুন।' : 'Open the live HTTPS Render site in Android Chrome.'}</li>
                  <li>{lang === 'bn' ? 'উপরের ডান কোণায় ৩-ডট (⋮) মেনুতে ট্যাপ করুন।' : 'Tap the 3-dot (⋮) browser menu in the top right.'}</li>
                  <li>{lang === 'bn' ? '"Install app" বা "Add to Home screen" সিলেক্ট করুন।' : 'Select "Install app" or "Add to Home screen".'}</li>
                </ol>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="w-full min-h-[44px] py-2.5 rounded-xl bg-[#176B52] hover:bg-[#125742] text-white text-xs font-bold transition cursor-pointer"
            >
              {lang === 'bn' ? 'বুঝেছি' : 'Got It'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC<{ lang?: 'en' | 'bn' }> = ({ lang = 'en' }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-[#25332D] border border-[#E6B94F]/40 px-3.5 py-2 text-xs font-semibold text-white shadow-lg">
      <WifiOff className="w-4 h-4 text-[#E6B94F] shrink-0" />
      <span>
        {lang === 'bn'
          ? 'অফলাইন মোড — সংরক্ষিত তথ্য দেখানো হচ্ছে'
          : 'Offline Mode — Showing cached pages'}
      </span>
    </div>
  );
};
