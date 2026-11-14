import React, { useState } from 'react';
import { 
  X, 
  Volume2, 
  Sparkles, 
  Play, 
  Pause, 
  Square, 
  Download, 
  Check, 
  Copy, 
  Radio, 
  AlertCircle,
  Mic,
  Sliders,
  AudioWaveform
} from 'lucide-react';
import { PRESET_VOICE_SCRIPTS, PROMO_TEXT_BENGALI } from '../data/travelData';
import { ttsService, PlaybackState } from '../services/ttsService';

interface VoiceStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
}

const VOICES = [
  { id: 'Kore', name: 'Kore (কোর)', desc: 'Warm, natural & welcoming female voice', tag: 'Recommended' },
  { id: 'Puck', name: 'Puck (পাক)', desc: 'Energetic, lively & bright male announcer', tag: 'Urgent Alert' },
  { id: 'Fenrir', name: 'Fenrir (ফেনরির)', desc: 'Deep, authoritative & confident male voice', tag: 'Official' },
  { id: 'Zephyr', name: 'Zephyr (জেফির)', desc: 'Gentle, soothing & calm narrator', tag: 'Eco Guide' },
  { id: 'Charon', name: 'Charon (শ্যারন)', desc: 'Grounded, senior executive tone', tag: 'Broadcast' },
] as const;

const STYLES = [
  'Warm, friendly Bengali travel advisor addressing tourists',
  'Urgent tourist advisory broadcast with clear pronunciation',
  'Calm, soothing ocean nature documentary guide',
  'Polite official Port Authority & Tourism Board check-in officer',
  'Enthusiastic holiday host welcoming guests to St. Martin',
];

export const VoiceStudioModal: React.FC<VoiceStudioModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('official-promo');
  const [customText, setCustomText] = useState<string>(PROMO_TEXT_BENGALI);
  const [selectedVoice, setSelectedVoice] = useState<'Kore' | 'Puck' | 'Fenrir' | 'Zephyr' | 'Charon'>('Kore');
  const [selectedStyle, setSelectedStyle] = useState<string>(STYLES[0]);
  const [copied, setCopied] = useState(false);

  const [ttsState, setTtsState] = useState<PlaybackState>({
    isPlaying: false,
    isLoading: false,
    currentAudioUrl: null,
    error: null,
    source: null,
  });

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof PRESET_VOICE_SCRIPTS[0]) => {
    setSelectedPresetId(preset.id);
    setCustomText(lang === 'bn' ? preset.textBn : preset.textEn);
    setSelectedVoice(preset.recommendedVoice);
    setSelectedStyle(preset.recommendedStyle);
    ttsService.stopAudio();
    setTtsState((prev) => ({ ...prev, isPlaying: false, currentAudioUrl: null }));
  };

  const handleGenerateAndPlay = () => {
    if (!customText.trim()) return;
    ttsService.generateAndPlaySpeech(
      customText.trim(),
      selectedVoice,
      selectedStyle,
      (state) => setTtsState(state)
    );
  };

  const handleStop = () => {
    ttsService.stopAudio();
    setTtsState((prev) => ({ ...prev, isPlaying: false }));
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (ttsState.currentAudioUrl) {
      ttsService.downloadCurrentAudio(ttsState.currentAudioUrl, `tripbooking-tts-${selectedVoice}.wav`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-cyan-900 via-teal-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg sm:text-xl text-white">
                  {lang === 'bn' ? 'AI ভয়েস স্টুডিও (টেক্সট-টু-স্পিচ)' : 'AI Voice Studio (Text to Speech)'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-300/30">
                  gemini-3.8-flash-tts
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {lang === 'bn' 
                  ? 'গুগল জেমিনাই ৩.৮ ফ্ল্যাশ টিটিএস দিয়ে সেন্টমার্টিন ভ্রমণ নির্দেশিকা শুনুন' 
                  : 'Convert travel announcements and guidelines to natural speech with Gemini 3.8 Flash TTS'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              ttsService.stopAudio();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Preset Chips */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
              {lang === 'bn' ? 'রেডিমেড প্রম্পট ও স্ক্রিপ্টসমূহ:' : 'Preset Scripts & Prompts:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_VOICE_SCRIPTS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`text-left p-3 rounded-xl border text-xs font-medium transition cursor-pointer flex items-start justify-between ${
                    selectedPresetId === preset.id
                      ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-900">
                      {lang === 'bn' ? preset.titleBn : preset.titleEn}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {lang === 'bn' ? preset.textBn : preset.textEn}
                    </div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 font-mono shrink-0 ml-2">
                    {preset.recommendedVoice}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Text Input / Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-cyan-600" />
                {lang === 'bn' ? 'ভয়েস টেক্সট (বাংলা বা ইংরেজি):' : 'Voice Script (Bengali or English):'}
              </label>
              <button
                onClick={handleCopyText}
                className="text-[11px] text-slate-500 hover:text-cyan-700 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                {copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : (lang === 'bn' ? 'টেক্সট কপি' : 'Copy Text')}
              </button>
            </div>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={4}
              className="w-full p-3.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-800 leading-relaxed bg-slate-50/50"
              placeholder={lang === 'bn' ? 'এখানে আপনার কথা লিখুন...' : 'Type script to speak...'}
            />
          </div>

          {/* Voice & Persona Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Voice Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-teal-600" />
                {lang === 'bn' ? 'ভয়েস পার্সোনা (Gemini Prebuilt Voices):' : 'Voice Persona:'}
              </label>
              <div className="space-y-1.5">
                {VOICES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVoice(v.id)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${
                      selectedVoice === v.id
                        ? 'bg-cyan-50 border-cyan-500 text-cyan-950 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-800">{v.name}</div>
                      <div className="text-[11px] text-slate-500">{v.desc}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                      {v.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Speaking Style */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-600" />
                {lang === 'bn' ? 'বাচনভঙ্গি ও স্টাইল (Speech Style):' : 'Speaking Style:'}
              </label>
              <div className="space-y-1.5">
                {STYLES.map((style, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStyle(style)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition cursor-pointer ${
                      selectedStyle === style
                        ? 'bg-teal-50 border-teal-500 text-teal-950 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error Message if any */}
          {ttsState.error && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{ttsState.error}</span>
            </div>
          )}

        </div>

        {/* Modal Player Control Footer */}
        <div className="p-5 bg-slate-900 border-t border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Play / Generate Button */}
            <button
              onClick={handleGenerateAndPlay}
              disabled={ttsState.isLoading || !customText.trim()}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm transition shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {ttsState.isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>{lang === 'bn' ? 'অডিও প্রস্তুত হচ্ছে...' : 'Synthesizing with Gemini...'}</span>
                </>
              ) : ttsState.isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'পুনরায় শুনুন' : 'Replay Audio'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{lang === 'bn' ? 'AI অডিও প্লে করুন' : 'Generate & Play Audio'}</span>
                </>
              )}
            </button>

            {/* Stop Button */}
            {ttsState.isPlaying && (
              <button
                onClick={handleStop}
                className="p-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition cursor-pointer"
                title="Stop Audio"
              >
                <Square className="w-4 h-4 fill-white" />
              </button>
            )}

            {/* Download Button */}
            {ttsState.currentAudioUrl && (
              <button
                onClick={handleDownload}
                className="px-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                title="Download WAV File"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">.WAV</span>
              </button>
            )}
          </div>

          {/* Model info & Status indicator */}
          <div className="flex items-center gap-3 text-right text-xs">
            {ttsState.isPlaying ? (
              <div className="flex items-center gap-2 text-cyan-300">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                </span>
                <span className="font-medium">
                  {lang === 'bn' ? 'প্লে হচ্ছে...' : 'Playing Gemini Audio...'}
                </span>
                <div className="flex items-center gap-0.5 ml-2">
                  {[10, 18, 12, 22, 14, 20].map((h, i) => (
                    <span
                      key={i}
                      style={{ height: `${h}px` }}
                      className="w-1 bg-cyan-400 rounded-full animate-pulse"
                    ></span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-slate-400 text-left sm:text-right">
                <div className="font-mono text-[11px] text-slate-300">
                  Model: <span className="text-cyan-400">gemini-3.8-flash-tts</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Voice: {selectedVoice} • Format: 24kHz Mono WAV
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
