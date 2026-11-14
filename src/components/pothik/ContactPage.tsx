import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building, 
  Anchor
} from 'lucide-react';
import { BRAND } from '../../data/pothikData';

interface ContactPageProps {
  lang: 'en' | 'bn';
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 sm:py-16 space-y-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block">
          {lang === 'bn' ? 'আমাদের সাথে যোগাযোগ' : 'Get in Touch'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#25332D]">
          {lang === 'bn' ? 'আমরা আছি আপনার পাশে' : 'Contact POTHIK Support'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {lang === 'bn'
            ? 'যেকোনো বুকিং, ফ্লাইট টিকেট, ভিসা তথ্য বা দ্বীপ ভ্রমণের সহায়তায় আমাদের ঢাকা ও কক্সবাজার অফিস সার্বক্ষণিক প্রস্তুত।'
            : 'Speak with our dedicated travel concierges via 24/7 hotline, WhatsApp, or visit our physical counters.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Single Official Contact Card: 01576466092 */}
          <div className="p-6 rounded-3xl bg-[#176B52] text-white space-y-4 shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#E6B94F] text-[#25332D] flex items-center justify-center font-bold shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] text-white/80 uppercase font-bold tracking-wider block">
                  {lang === 'bn' ? 'অফিসিয়াল হটলাইন ও হোয়াটসঅ্যাপ' : 'Official Hotline & WhatsApp'}
                </span>
                <a href="tel:01576466092" className="text-2xl font-extrabold font-heading text-white hover:text-[#E6B94F] transition tracking-tight">
                  01576466092
                </a>
              </div>
            </div>

            <p className="text-xs text-white/85 leading-relaxed">
              {lang === 'bn' 
                ? 'যেকোনো ট্রিপ বুকিং, ভিসা পরামর্শ বা সার্বক্ষণিক জরুরি সহায়তায় সরাসরি কল করুন বা হোয়াটসঅ্যাপে মেসেজ পাঠান।' 
                : 'Direct connection for tour bookings, customized holidays, visa guidance, and 24/7 dedicated assistance.'}
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href="tel:01576466092"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#176B52] font-bold text-xs hover:bg-[#F6F1E6] transition shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#176B52]" />
                <span>{lang === 'bn' ? 'সরাসরি কল' : 'Call Now'}</span>
              </a>
              <a
                href="https://wa.me/8801576466092"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs hover:bg-[#20ba5a] transition shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>{lang === 'bn' ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Physical Desks */}
          <div className="p-6 rounded-3xl bg-[#F6F1E6] border border-[#E6B94F]/30 space-y-4 text-xs text-[#25332D]">
            <h4 className="font-extrabold font-heading text-sm text-[#176B52] uppercase tracking-wider">
              {lang === 'bn' ? 'আমাদের অফিসসমূহ' : 'Our Physical Locations'}
            </h4>
            
            <div className="flex items-start gap-3">
              <Building className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">Dhaka Headquarters</span>
                <span className="text-slate-600">{BRAND.addressDhaka}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-black/5">
              <Anchor className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">Cox's Bazar Jetty Desk</span>
                <span className="text-slate-600">{BRAND.addressCoxsBazar}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-[#25332D] font-heading">
                {lang === 'bn' ? 'বার্তাটি সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {lang === 'bn'
                  ? 'ধন্যবাদ! পথিক সাপোর্ট টিম অতি দ্রুত আপনার সাথে যোগাযোগ করবে।'
                  : 'Thank you for contacting POTHIK. An advisor will respond to your query shortly.'}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                {lang === 'bn' ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-extrabold text-[#25332D] font-heading mb-2">
                {lang === 'bn' ? 'আমাদের বার্তা পাঠান' : 'Send a Message'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'আপনার নাম *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asif Mahmud"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'ইমেইল *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="asif@example.com"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'ফোন নম্বর / WhatsApp *' : 'Phone / WhatsApp *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+8801XXXXXXXXX"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'আপনার প্রশ্ন বা বার্তা *' : 'Your Message *'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'bn' ? 'আপনার ভ্রমণ সংক্রান্ত যেকোনো তথ্য জানতে লিখুন...' : 'Describe your destination or question...'}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#176B52] hover:bg-[#104C3A] text-white font-extrabold text-sm rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer font-heading"
              >
                <Send className="w-4 h-4 text-[#E6B94F]" />
                <span>{lang === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
