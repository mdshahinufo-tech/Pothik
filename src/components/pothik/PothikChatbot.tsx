import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Trash2, 
  Volume2, 
  VolumeX, 
  Loader2, 
  Compass, 
  Bot, 
  User, 
  ChevronDown, 
  Calendar, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { BRAND } from '../../data/pothikData';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface PothikChatbotProps {
  lang: 'en' | 'bn';
  onOpenEnquiry?: (serviceType?: string, destinationName?: string) => void;
}

const DEFAULT_PROMPTS = {
  en: [
    { label: '🏝️ Maldives 4-Day Trip Budget', prompt: 'What is a realistic 4-day Maldives holiday budget and best itinerary from Dhaka?' },
    { label: '🚢 Saint Martin Ship & Pass Rules', prompt: 'How do I book Saint Martin cruise tickets and government entry pass?' },
    { label: '✈️ Dubai Tourist Visa for BD', prompt: 'What are the required documents and steps for a Dubai tourist visa for Bangladeshi citizens?' },
    { label: '⛰️ Sajek Valley 3-Day Plan', prompt: 'Give me a 3-day itinerary and vehicle guidance for Sajek Valley from Dhaka.' },
  ],
  bn: [
    { label: '🚢 সেন্টমার্টিন জাহাজ ও ট্রাভেল পাস নিয়ম', prompt: 'সেন্টমার্টিন ভ্রমণের বর্তমান সরকারি পাস ও জাহাজের নিয়মগুলো বিস্তারিত বলুন।' },
    { label: '🏝️ মালদ্বীপ ৪ দিনের ভ্রমণ বাজেট', prompt: 'ঢাকা থেকে ৪ দিনের মালদ্বীপ ট্যুরের আনুমানিক বাজেট ও আইটিনারারি কেমন হবে?' },
    { label: '✈️ দুবাই ভিজিট ভিসা রিকোয়ারমেন্টস', prompt: 'বাংলাদেশি নাগরিকদের জন্য দুবাই ট্যুরিস্ট ভিসার প্রয়োজনীয় কাগজপত্র কী কী?' },
    { label: '⛰️ সাজেক ভ্যালি ৩ দিনের ট্যুর প্ল্যান', prompt: 'ঢাকা থেকে সাজেক ভ্যালির সেরা ৩ দিনের ট্যুর প্ল্যান ও চাঁদের গাড়ির তথ্য দিন।' },
  ],
};

const INITIAL_WELCOME: Record<'en' | 'bn', string> = {
  en: "Hello traveler! I am your **POTHIK AI Concierge**, powered by Google Gemini.\n\nI can assist you with:\n• Customized international & domestic holiday itineraries\n• Saint Martin ship schedules, cruise classes & government passes\n• Visa requirements for Bangladeshi passport holders\n• Flight & hotel budgets in BDT (৳) and USD\n\nHow may I help you explore today?",
  bn: "আসসালামু আলাইকুম! আমি পথিক (POTHIK) এর **স্মার্ট এআই ট্রাভেল কনসিয়ার্জ**।\n\nআপনাকে কীভাবে সহায়তা করতে পারি?\n• দেশ-বিদেশের ভ্রমণ প্যাকেজ ও বাজেট পরিকল্পনা\n• সেন্টমার্টিন জাহাজ টিকিট, সরকারি পাস ও রিসোর্ট গাইড\n• থাইল্যান্ড, দুবাই, মালয়েশিয়া ও ইউরোপের ভিসা তথ্য\n• বিমান টিকিট ও হোটেল বুকিং পরামর্শ\n\nআপনার ভ্রমণের গন্তব্য বা প্রশ্নটি লিখুন!",
};

export const PothikChatbot: React.FC<PothikChatbotProps> = ({ lang, onOpenEnquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('pothik_chat_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'welcome-msg',
        role: 'model',
        content: INITIAL_WELCOME[lang],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ttsAudioPlaying, setTtsAudioPlaying] = useState<string | null>(null);
  const [ttsLoadingId, setTtsLoadingId] = useState<string | null>(null);
  const [audioVoice, setAudioVoice] = useState<'Kore' | 'Fenrir'>('Kore');
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem('pothik_chat_history', JSON.stringify(messages));
    } catch (e) {}
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle TTS play
  const handlePlayTTS = async (msgId: string, text: string) => {
    // If currently playing this message, stop it
    if (ttsAudioPlaying === msgId) {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      setTtsAudioPlaying(null);
      return;
    }

    // Stop any existing playback
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
      setTtsAudioPlaying(null);
    }

    try {
      setTtsLoadingId(msgId);
      // Clean markdown tags for natural speech
      const cleaned = text
        .replace(/[*_#`~]/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/\n+/g, ' ')
        .slice(0, 500); // Speak first 500 chars for responsive audio

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleaned,
          voice: audioVoice,
          style: lang === 'bn' ? 'Warm Bengali travel advisor' : 'Professional cheerful travel concierge',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.audioBase64) {
        throw new Error(data.error || 'Speech generation failed');
      }

      const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
      currentAudioRef.current = audio;
      setTtsAudioPlaying(msgId);

      audio.onended = () => {
        setTtsAudioPlaying(null);
        currentAudioRef.current = null;
      };

      audio.onerror = () => {
        setTtsAudioPlaying(null);
        currentAudioRef.current = null;
      };

      await audio.play();
    } catch (err) {
      console.error('Audio playback error:', err);
    } finally {
      setTtsLoadingId(null);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setTtsAudioPlaying(null);
    setMessages([
      {
        id: Date.now().toString(),
        role: 'model',
        content: INITIAL_WELCOME[lang],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || input).trim();
    if (!prompt || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Send conversation to server-side endpoint
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          lang: lang,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get answer from Gemini.');
      }

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: data.reply || (lang === 'bn' ? 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি।' : 'Sorry, no response received.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        content: lang === 'bn'
          ? `দুঃখিত, এআই সার্ভিসের সাথে সংযোগে কিছুটা সমস্যা হয়েছে: ${error?.message || 'অনুগ্রহ করে পুনরায় চেষ্টা করুন।'}`
          : `I encountered an issue connecting to the AI travel engine: ${error?.message || 'Please try again.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Action Button (Icon Only, positioned above WhatsApp) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-13 w-13 rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer border group relative ${
          isOpen
            ? 'bg-[#25332D] text-white border-[#25332D] shadow-[#25332D]/30 scale-95'
            : 'bg-[#176B52] hover:bg-[#125742] text-white border-[#E6B94F]/40 shadow-[#176B52]/30 hover:scale-105 active:scale-95'
        }`}
        title={lang === 'bn' ? 'পথিক এআই কনসিয়ার্জ' : 'POTHIK AI Concierge'}
        aria-label="Open AI Travel Concierge"
      >
        <div className="relative flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-[#E6B94F]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
        </div>
        <span className="absolute right-16 bg-[#25332D] text-white text-xs px-3 py-1.5 rounded-xl shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none font-medium">
          {lang === 'bn' ? 'পথিক এআই কনসিয়ার্জ' : 'POTHIK AI Concierge'}
        </span>
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div 
          className="fixed bottom-6 right-4 left-4 sm:left-auto sm:right-22 z-50 sm:w-[420px] max-w-[95vw] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-gray-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200"
          style={{ boxShadow: '0 25px 50px -12px rgba(23, 107, 82, 0.25)' }}
        >
          {/* Header */}
          <div className="bg-[#176B52] text-white px-5 py-4 flex items-center justify-between border-b border-emerald-800/40 relative">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 text-[#E6B94F]">
                <Bot className="w-6 h-6" />
              </div>
                <div>
                  <h3 className="font-display font-bold text-base leading-tight">
                    {lang === 'bn' ? 'পথিক এআই কনসিয়ার্জ' : 'POTHIK AI Concierge'}
                  </h3>
                  <p className="text-xs text-emerald-100/90 mt-0.5">
                    {lang === 'bn' ? 'ভ্রমণ বিশেষজ্ঞ · ২৪/৭ সহায়তা' : 'Online · 24/7 Travel Advisor'}
                  </p>
                </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
                title={lang === 'bn' ? 'চ্যাট মুছে ফেলুন' : 'Clear chat history'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
                title={lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-[#F6F1E6] px-4 py-2 border-b border-amber-200/50 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            <span className="text-[11px] font-semibold text-[#176B52] whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E6B94F]" />
              {lang === 'bn' ? 'দ্রুত প্রশ্ন:' : 'Quick:'}
            </span>
            {(DEFAULT_PROMPTS[lang] || DEFAULT_PROMPTS.en).map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.prompt)}
                disabled={isLoading}
                className="text-xs bg-white hover:bg-[#176B52] text-[#25332D] hover:text-white px-2.5 py-1 rounded-lg border border-gray-200 shadow-xs whitespace-nowrap transition cursor-pointer disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-[#176B52] text-white flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-xs mt-0.5">
                      P
                    </div>
                  )}

                  <div className={`max-w-[82%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-xs ${
                        isUser
                          ? 'bg-[#176B52] text-white rounded-tr-none'
                          : 'bg-white text-[#25332D] border border-gray-100 rounded-tl-none'
                      }`}
                    >
                      {/* Render line breaks and bold gracefully */}
                      <div className="whitespace-pre-wrap space-y-1">
                        {msg.content.split('\n').map((line, lIdx) => {
                          if (line.startsWith('• ') || line.startsWith('- ')) {
                            return (
                              <div key={lIdx} className="flex items-start gap-1.5 pl-1 my-0.5">
                                <span className={isUser ? 'text-[#E6B94F]' : 'text-[#176B52]'}>•</span>
                                <span>{line.replace(/^[-•]\s*/, '')}</span>
                              </div>
                            );
                          }
                          return <p key={lIdx}>{line}</p>;
                        })}
                      </div>
                    </div>

                    {/* Metadata, Copy & Audio Read Action */}
                    <div className="flex items-center gap-2 mt-1 px-1 text-[11px] text-gray-600">
                      <span>{msg.timestamp}</span>

                      {!isUser && (
                        <>
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="hover:text-[#176B52] flex items-center gap-0.5 cursor-pointer"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>

                          <button
                            onClick={() => handlePlayTTS(msg.id, msg.content)}
                            disabled={ttsLoadingId === msg.id}
                            className={`flex items-center gap-1 cursor-pointer transition ${
                              ttsAudioPlaying === msg.id
                                ? 'text-amber-700 font-bold'
                                : 'hover:text-[#176B52]'
                            }`}
                            title={ttsAudioPlaying === msg.id ? 'Stop audio' : 'Listen with Gemini TTS'}
                          >
                            {ttsLoadingId === msg.id ? (
                              <Loader2 className="w-3 h-3 animate-spin text-emerald-600" />
                            ) : ttsAudioPlaying === msg.id ? (
                              <VolumeX className="w-3 h-3 text-amber-600" />
                            ) : (
                              <Volume2 className="w-3 h-3" />
                            )}
                            <span className="text-[10px]">
                              {ttsAudioPlaying === msg.id 
                                ? (lang === 'bn' ? 'থামুন' : 'Stop')
                                : (lang === 'bn' ? 'শুনুন' : 'Listen')}
                            </span>
                          </button>

                          {onOpenEnquiry && (
                            <button
                              onClick={() => {
                                onOpenEnquiry('Package Enquiry', 'Custom Consultation via AI');
                                setIsOpen(false);
                              }}
                              className="text-[#176B52] hover:text-[#125742] font-semibold text-[10px] ml-1 underline underline-offset-2 cursor-pointer flex items-center gap-0.5"
                            >
                              <span>{lang === 'bn' ? 'বুকিং আবেদন' : 'Book Trip'}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-xl bg-gray-200 text-gray-700 flex-shrink-0 flex items-center justify-center text-xs shadow-xs mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-[#176B52] text-white flex-shrink-0 flex items-center justify-center text-xs font-bold">
                  P
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-[#176B52] animate-spin" />
                  <span className="text-xs text-gray-500 font-medium">
                    {lang === 'bn' ? 'পথিক এআই ভাবছে...' : 'POTHIK AI is analyzing travel options...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Footer */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-[#F6F1E6]/70 rounded-2xl p-1.5 border border-amber-200/60 focus-within:border-[#176B52] focus-within:bg-white transition"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={lang === 'bn' ? 'ভ্রমণ সংক্রান্ত যেকোনো প্রশ্ন লিখুন...' : 'Ask about packages, flights, visas, or Saint Martin...'}
                disabled={isLoading}
                className="flex-1 bg-transparent px-3 py-2 text-sm text-[#25332D] placeholder-gray-400 focus:outline-none disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-[#176B52] hover:bg-[#125742] text-white flex items-center justify-center transition disabled:opacity-40 disabled:hover:bg-[#176B52] cursor-pointer shadow-xs shrink-0"
                title="Send"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
            <div className="flex items-center justify-between px-2 pt-1.5 text-[10px] text-gray-500">
              <span>{lang === 'bn' ? 'বাংলা বা ইংরেজিতে কথা বলুন' : 'Ask in English or বাংলা'}</span>
              <span>Hotline: {BRAND.hotline}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
