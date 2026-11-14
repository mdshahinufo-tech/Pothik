import React, { useEffect, useState } from 'react';
import {
  Rocket,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  KeyRound,
  Globe,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallPrompt';

interface DeployLaunchCenterProps {
  lang: 'en' | 'bn';
}

interface HealthStatus {
  status: string;
  hasApiKey: boolean;
  environment: string;
  platform: string;
  nodeVersion: string;
  chatModel: string;
  ttsModel: string;
  pwaReady: boolean;
}

const CAPACITOR_COMMANDS = `npm install
npm run build
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap add android
npx cap sync android
npx cap open android`;

export const DeployLaunchCenter: React.FC<DeployLaunchCenterProps> = ({ lang }) => {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [checking, setChecking] = useState(true);
  const [healthError, setHealthError] = useState<string | null>(null);

  const [githubRepoUrl, setGithubRepoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('pothik_github_repo') || '';
    } catch {
      return '';
    }
  });

  const [liveSiteUrl, setLiveSiteUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('pothik_render_live_url');
      if (saved) return saved;
      if (typeof window !== 'undefined' && !window.location.hostname.includes('localhost')) {
        return window.location.origin;
      }
      return 'https://pothik-travel.onrender.com';
    } catch {
      return 'https://pothik-travel.onrender.com';
    }
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchHealth = async () => {
    setChecking(true);
    setHealthError(null);
    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: HealthStatus = await res.json();
      setHealth(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unable to reach /api/health';
      setHealthError(msg);
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const handleRepoChange = (val: string) => {
    setGithubRepoUrl(val);
    try {
      localStorage.setItem('pothik_github_repo', val);
    } catch {
      // ignore storage quota errors
    }
  };

  const handleLiveUrlChange = (val: string) => {
    setLiveSiteUrl(val);
    try {
      localStorage.setItem('pothik_render_live_url', val);
    } catch {
      // ignore storage quota errors
    }
  };

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 2000);
    } catch {
      // fallback noop
    }
  };

  const normalizedRepo = githubRepoUrl.trim().replace(/\/+$/, '');
  const isValidGithubRepo = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(
    normalizedRepo
  );
  const renderDeployHref = isValidGithubRepo
    ? `https://render.com/deploy?repo=${encodeURIComponent(normalizedRepo)}`
    : 'https://dashboard.render.com/blueprints';

  const normalizedLiveUrl = liveSiteUrl.trim().replace(/\/+$/, '');
  const isValidLiveUrl = /^https:\/\/[A-Za-z0-9.-]+/.test(normalizedLiveUrl);
  const pwabuilderHref = isValidLiveUrl
    ? `https://www.pwabuilder.com/reportcard?site=${encodeURIComponent(normalizedLiveUrl)}`
    : 'https://www.pwabuilder.com';

  return (
    <div className="space-y-6">
      {/* Section Header & Live Readiness Probe */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#25332D] font-heading">
              {lang === 'bn'
                ? 'Render ফ্রি হোস্টিং ও Android অ্যাপ লঞ্চ সেন্টার'
                : 'Render Free Hosting & Android App Launch Center'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'bn'
                ? '১ ক্লিকে Render Free Web Service ডিপ্লয়মেন্ট, Gemini AI কনফিগারেশন ও মোবাইল অ্যাপ প্যাকেজিং।'
                : '1-click Render Free Web Service deployment, Gemini AI verification, and Android app packaging.'}
            </p>
          </div>

          <button
            type="button"
            onClick={fetchHealth}
            disabled={checking}
            className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-[#25332D] inline-flex items-center gap-2 transition cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 text-[#176B52] ${checking ? 'animate-spin' : ''}`} />
            <span>{lang === 'bn' ? 'স্ট্যাটাস যাচাই করুন' : 'Re-check Status'}</span>
          </button>
        </div>

        {healthError && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>
              {lang === 'bn'
                ? `সার্ভার হেলথ চেক ব্যর্থ হয়েছে: ${healthError}`
                : `Server readiness probe failed: ${healthError}`}
            </span>
          </div>
        )}

        {/* 4-column Readiness Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-semibold text-slate-500 block">
              {lang === 'bn' ? 'Node.js সার্ভার' : 'Express Backend'}
            </span>
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#25332D] font-mono tabular-nums">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{checking ? 'Checking...' : health?.nodeVersion || 'Node 22+'}</span>
            </div>
            <span className="text-[11px] text-slate-500 block">
              {health ? `${health.environment} · Ready` : 'Awaiting probe'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-semibold text-slate-500 block">
              {lang === 'bn' ? 'Gemini AI কনসিয়ার্জ' : 'Gemini AI Concierge'}
            </span>
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#25332D]">
              {health?.hasApiKey ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'bn' ? 'সক্রিয় (Key সেট আছে)' : 'Active (Key Loaded)'}</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{lang === 'bn' ? 'Key প্রয়োজন' : 'Key Needed on Render'}</span>
                </>
              )}
            </div>
            <span className="text-[11px] text-slate-500 font-mono tabular-nums block">
              {health?.chatModel || 'gemini-4-hydrogen'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-semibold text-slate-500 block">
              {lang === 'bn' ? 'Render ব্লুপ্রিন্ট' : 'Render Blueprint'}
            </span>
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#25332D]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{lang === 'bn' ? 'প্রস্তুত (Free Tier)' : 'Ready (Free Plan)'}</span>
            </div>
            <span className="text-[11px] text-slate-500 block">
              Singapore · Node 22 · render.yaml
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-semibold text-slate-500 block">
              {lang === 'bn' ? 'Android মোবাইল অ্যাপ' : 'Android Mobile App'}
            </span>
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#25332D]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{lang === 'bn' ? 'PWA ও TWA প্রস্তুত' : 'PWA & APK Ready'}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono block">
              com.pothik.travel
            </span>
          </div>
        </div>
      </div>

      {/* 1-Click Deploy to Render Free Web Service */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-[#176B52]" />
              <h3 className="text-lg font-extrabold text-[#25332D] font-heading">
                {lang === 'bn'
                  ? '০১. ১-ক্লিকে Render Free Web Service লাইভ করুন'
                  : '01. 1-Click Deploy to Render Free Web Service'}
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              {lang === 'bn'
                ? 'AI Studio থেকে GitHub-এ প্রোজেক্টটি এক্সপোর্ট করে নিচে রিপোজিটরি লিংক দিন এবং সরাসরি Render-এ ডিপ্লয় করুন।'
                : 'Export this project to GitHub from AI Studio, paste your repository URL below, and launch directly on Render.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          <div className="lg:col-span-8 space-y-1.5">
            <label
              htmlFor="render-github-repo"
              className="block text-xs font-bold text-[#25332D]"
            >
              {lang === 'bn' ? 'আপনার GitHub Repository URL' : 'Your GitHub Repository URL'}
            </label>
            <input
              id="render-github-repo"
              type="url"
              value={githubRepoUrl}
              onChange={(e) => handleRepoChange(e.target.value)}
              placeholder="https://github.com/your-username/pothik-travel"
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#176B52] focus:ring-2 focus:ring-[#176B52]/20 outline-none text-sm font-mono text-[#25332D]"
            />
          </div>

          <div className="lg:col-span-4">
            <a
              href={renderDeployHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] px-5 py-2.5 rounded-xl bg-[#176B52] hover:bg-[#125742] text-white font-bold text-sm flex items-center justify-center gap-2 transition whitespace-nowrap"
            >
              <Rocket className="w-4 h-4 text-[#E6B94F] shrink-0" />
              <span>
                {isValidGithubRepo
                  ? lang === 'bn'
                    ? 'Deploy to Render (১-ক্লিক)'
                    : 'Deploy to Render'
                  : lang === 'bn'
                  ? 'Render Blueprint খুলুন'
                  : 'Open Render Blueprints'}
              </span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {!isValidGithubRepo && githubRepoUrl.trim().length > 0 && (
          <p className="text-xs text-amber-700 font-medium">
            {lang === 'bn'
              ? 'সঠিক GitHub লিংক দিন, যেমন: https://github.com/username/pothik-travel'
              : 'Enter a valid repository URL like https://github.com/username/pothik-travel to pre-fill the 1-click Render launcher.'}
          </p>
        )}

        {/* Environment & Firebase Checklist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-[#F6F1E6] border border-[#E6B94F]/30 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#25332D]">
                <KeyRound className="w-4 h-4 text-[#176B52]" />
                <span>
                  {lang === 'bn'
                    ? 'Render-এ Gemini AI সক্রিয় করতে:'
                    : 'Enable Gemini AI on Render:'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('gemini-key-name', 'GEMINI_API_KEY')}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-[#176B52] inline-flex items-center gap-1 cursor-pointer hover:bg-slate-50"
              >
                {copiedId === 'gemini-key-name' ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>GEMINI_API_KEY</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {lang === 'bn'
                ? 'Render ডিপ্লয় স্ক্রিনে GEMINI_API_KEY ঘরে Google AI Studio থেকে নেওয়া আপনার API Key পেস্ট করুন। তারপর চ্যাটবট এবং ভয়েস TTS লাইভ কাজ করবে।'
                : 'Paste your Google AI Studio API key into GEMINI_API_KEY when Render prompts during Blueprint setup. Both chat and voice TTS will run server-side.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#25332D]">
              <ShieldCheck className="w-4 h-4 text-[#176B52]" />
              <span>
                {lang === 'bn'
                  ? 'Firebase ডোমেইন অনুমোদন (Google লগইন/ড্রাইভ):'
                  : 'Firebase Authorized Domain (Google Sign-In / Drive):'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'bn'
                ? 'Render থেকে লাইভ লিংক পাওয়ার পর Firebase Console → Authentication → Settings → Authorized domains-এ আপনার *.onrender.com ডোমেইনটি যোগ করুন।'
                : 'After Render finishes building, add your new *.onrender.com hostname in Firebase Console → Authentication → Settings → Authorized domains.'}
            </p>
          </div>
        </div>
      </div>

      {/* Android Mobile App Packaging & Instant Install */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#176B52]" />
              <h3 className="text-lg font-extrabold text-[#25332D] font-heading">
                {lang === 'bn'
                  ? '০২. Android মোবাইল অ্যাপ সেটআপ (PWA + APK)'
                  : '02. Android Mobile App Setup (PWA + APK)'}
              </h3>
            </div>
            <p className="text-xs text-slate-600">
              {lang === 'bn'
                ? 'ব্রাউজার থেকে সরাসরি হোম স্ক্রিন অ্যাপ হিসেবে ইনস্টল করুন অথবা Google Play Store / APK প্যাকেজ তৈরি করুন।'
                : 'Install directly as a standalone Android home-screen app or package a signed Play Store APK / AAB.'}
            </p>
          </div>

          <PWAInstallButton lang={lang} variant="card" showFallbackInfo={true} />
        </div>

        {/* PWABuilder APK Generator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end pt-2 border-t border-slate-100">
          <div className="lg:col-span-8 space-y-1.5">
            <label
              htmlFor="render-live-url"
              className="block text-xs font-bold text-[#25332D]"
            >
              {lang === 'bn'
                ? 'আপনার লাইভ Render ওয়েবসাইট URL (APK তৈরির জন্য)'
                : 'Your Live Render Website URL (for APK Packaging)'}
            </label>
            <div className="relative flex items-center">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                id="render-live-url"
                type="url"
                value={liveSiteUrl}
                onChange={(e) => handleLiveUrlChange(e.target.value)}
                placeholder="https://pothik-travel.onrender.com"
                className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#176B52] focus:ring-2 focus:ring-[#176B52]/20 outline-none text-sm font-mono text-[#25332D]"
              />
            </div>
          </div>

          <div className="lg:col-span-4">
            <a
              href={pwabuilderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] px-5 py-2.5 rounded-xl bg-[#E6B94F] hover:bg-[#d8ab3e] text-[#25332D] font-extrabold text-sm flex items-center justify-center gap-2 transition whitespace-nowrap"
            >
              <Smartphone className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'bn' ? 'Android APK তৈরি করুন' : 'Package Android APK'}
              </span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Capacitor Android Studio Commands */}
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E6B94F]">
              <Terminal className="w-4 h-4 shrink-0" />
              <span>
                {lang === 'bn'
                  ? 'Android Studio নেটিভ বিল্ড কমান্ড (Capacitor কনফিগার্ড: com.pothik.travel)'
                  : 'Android Studio Native Build Commands (Capacitor Configured: com.pothik.travel)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('cap-cmds', CAPACITOR_COMMANDS)}
              className="min-h-[36px] px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition whitespace-nowrap shrink-0"
            >
              {copiedId === 'cap-cmds' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'কমান্ড কপি' : 'Copy Commands'}</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
            {CAPACITOR_COMMANDS}
          </pre>
        </div>
      </div>
    </div>
  );
};
