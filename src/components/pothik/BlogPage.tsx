import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Sparkles,
  Search
} from 'lucide-react';
import { BLOG_POSTS } from '../../data/pothikData';
import { BlogPost } from '../../types/pothik';

interface BlogPageProps {
  lang: 'en' | 'bn';
  onOpenEnquiry: (service: string, dest: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  lang,
  onOpenEnquiry,
}) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = BLOG_POSTS.filter((p) => {
    return (
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleBn.includes(searchQuery) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (activePost) {
    return (
      <div className="py-10 sm:py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in">
        <button
          onClick={() => setActivePost(null)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#176B52] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'bn' ? 'সকল গাইডে ফিরে যান' : 'Back to All Guides'}</span>
        </button>

        <div className="space-y-4">
          <span className="px-3 py-1 rounded-full bg-[#176B52] text-white text-xs font-bold uppercase tracking-wider">
            {lang === 'bn' ? activePost.categoryBn : activePost.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-[#25332D] leading-tight">
            {lang === 'bn' ? activePost.titleBn : activePost.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-200">
            <span>By {activePost.author}</span>
            <span>•</span>
            <span>{activePost.date}</span>
            <span>•</span>
            <span>{activePost.readTime}</span>
          </div>
        </div>

        <div className="h-72 sm:h-96 rounded-3xl overflow-hidden bg-slate-900 shadow-md">
          <img src={activePost.coverImage} alt={activePost.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose max-w-none text-[#25332D] text-sm sm:text-base leading-relaxed space-y-4">
          <p className="font-semibold text-lg text-slate-700 leading-snug">
            {lang === 'bn' ? activePost.excerptBn : activePost.excerpt}
          </p>
          <div className="p-5 bg-[#F6F1E6] rounded-2xl border border-[#E6B94F]/30 text-xs sm:text-sm text-slate-800">
            {lang === 'bn' ? activePost.contentBn : activePost.content}
          </div>
          <p className="text-slate-600">
            {lang === 'bn'
              ? 'পথিক ভ্রমণকারীদের জন্য সম্পূর্ণ ভেরিফায়েড ইনফরমেশন ও নির্ভরযোগ্য টিকেট নিশ্চয়তা প্রদান করে। আপনার ভ্রমণ সংক্রান্ত যেকোনো পরামর্শ বা কাস্টমাইজড প্ল্যান তৈরিতে আমাদের হেল্পলাইনে যোগাযোগ করতে পারেন।'
              : 'POTHIK curates authentic travel experiences with guaranteed bookings. For personalized bookings, speak with our certified destination concierges today.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#176B52] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-extrabold text-lg font-heading">
              {lang === 'bn' ? 'এই ভ্রমণ পরিকল্পনা করতে চান?' : 'Ready to Plan This Trip?'}
            </h4>
            <p className="text-xs text-white/80">
              {lang === 'bn' ? 'পথিক কনসালট্যান্টদের সাথে কথা বলে কনফার্ম করুন।' : 'Get instant itinerary recommendations from POTHIK advisors.'}
            </p>
          </div>
          <button
            onClick={() => onOpenEnquiry('Tour Package', activePost.title)}
            className="px-6 py-2.5 rounded-xl bg-[#E6B94F] text-[#25332D] font-extrabold text-xs sm:text-sm cursor-pointer shadow font-heading"
          >
            {lang === 'bn' ? 'পরামর্শ নিন' : 'Plan Trip Now'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#176B52] uppercase tracking-widest block">
          {lang === 'bn' ? 'ভ্রমণ সাহিত্য ও নির্দেশিকা' : 'Travel Guide & Inspiration'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#25332D]">
          {lang === 'bn' ? 'অনুপ্রেরণা, টিপস ও অভিজ্ঞতা' : 'Stories, Tips & Destination Guides'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {lang === 'bn'
            ? 'সেন্টমার্টিন, সাজেক ভ্যালি এবং আন্তর্জাতিক বিভিন্ন গন্তব্যে ভ্রমণের খুঁটিনাটি তথ্যের নির্ভরযোগ্য সংগ্রহ।'
            : 'Authentic travel dispatches, budgetary hacks, and visa strategies written by certified destination specialists.'}
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === 'bn' ? 'আর্টিকেল বা গন্তব্য খুঁজুন...' : 'Search travel guides and tips...'}
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#176B52] bg-white shadow-2xs"
        />
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setActivePost(post)}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#176B52]/40 transition duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-52 overflow-hidden bg-slate-900">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[#25332D] text-[10px] font-bold shadow-xs">
                {lang === 'bn' ? post.categoryBn : post.category}
              </span>
            </div>

            <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium mb-1">
                  {post.date} · {post.readTime}
                </span>
                <h3 className="font-extrabold text-base text-[#25332D] font-heading group-hover:text-[#176B52] transition line-clamp-2">
                  {lang === 'bn' ? post.titleBn : post.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 mt-1.5 leading-relaxed">
                  {lang === 'bn' ? post.excerptBn : post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#176B52]">
                <span>{lang === 'bn' ? 'সম্পূর্ণ পড়ুন' : 'Read Article'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
