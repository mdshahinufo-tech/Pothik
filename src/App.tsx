import React, { useState, useEffect } from 'react';
import { GlobalHeader } from './components/pothik/GlobalHeader';
import { GlobalFooter } from './components/pothik/GlobalFooter';
import { HomePage } from './components/pothik/HomePage';
import { DestinationsPage } from './components/pothik/DestinationsPage';
import { TourPackagesPage } from './components/pothik/TourPackagesPage';
import { FlightBookingPage } from './components/pothik/FlightBookingPage';
import { HotelBookingPage } from './components/pothik/HotelBookingPage';
import { VisaAssistancePage } from './components/pothik/VisaAssistancePage';
import { BlogPage } from './components/pothik/BlogPage';
import { AboutPage } from './components/pothik/AboutPage';
import { ContactPage } from './components/pothik/ContactPage';
import { FaqPage } from './components/pothik/FaqPage';
import { PolicyPages } from './components/pothik/PolicyPages';
import { AdminDashboard } from './components/pothik/AdminDashboard';
import { DestinationDetailModal } from './components/pothik/DestinationDetailModal';
import { TourPackageDetailModal } from './components/pothik/TourPackageDetailModal';
import { EnquiryModal } from './components/pothik/EnquiryModal';
import { PothikChatbot } from './components/pothik/PothikChatbot';
import { OfflineIndicator } from './components/pothik/PWAInstallPrompt';
import { 
  PageView, 
  Destination, 
  TourPackage, 
  EnquirySubmission 
} from './types/pothik';
import { INITIAL_ENQUIRIES, BRAND } from './data/pothikData';
import { MessageSquare, PhoneCall, ArrowUp } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  
  // Modals & Selections
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryService, setEnquiryService] = useState('Package');
  const [enquiryDest, setEnquiryDest] = useState('');

  // Persistent Enquiries State
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>(() => {
    try {
      const saved = localStorage.getItem('pothik_enquiries');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_ENQUIRIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('pothik_enquiries', JSON.stringify(enquiries));
    } catch (e) {}
  }, [enquiries]);

  // Scroll to top on page navigate
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (serviceType = 'Package', destinationName = '') => {
    setEnquiryService(serviceType);
    setEnquiryDest(destinationName);
    setIsEnquiryOpen(true);
  };

  const handleNewEnquiryCreated = (newEnq: EnquirySubmission) => {
    setEnquiries((prev) => [newEnq, ...prev]);
  };

  // If Admin Mode is active
  if (currentPage === 'admin') {
    return (
      <AdminDashboard
        lang={lang}
        onExit={() => handleNavigate('home')}
        enquiries={enquiries}
        onUpdateEnquiries={setEnquiries}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#25332D] selection:bg-[#E6B94F]/30 selection:text-[#176B52] font-sans antialiased">
      
      {/* Global Header */}
      <GlobalHeader
        lang={lang}
        setLang={setLang}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Main Page View Renderer */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            onSelectDestination={(d) => setSelectedDestination(d)}
            onSelectPackage={(p) => setSelectedPackage(p)}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'destinations' && (
          <DestinationsPage
            lang={lang}
            onSelectDestination={(d) => setSelectedDestination(d)}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'packages' && (
          <TourPackagesPage
            lang={lang}
            onSelectPackage={(p) => setSelectedPackage(p)}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'flights' && (
          <FlightBookingPage
            lang={lang}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'hotels' && (
          <HotelBookingPage
            lang={lang}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'visa' && (
          <VisaAssistancePage
            lang={lang}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'blog' && (
          <BlogPage
            lang={lang}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            lang={lang}
            onOpenEnquiry={() => handleOpenEnquiry()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            lang={lang}
          />
        )}

        {currentPage === 'faq' && (
          <FaqPage
            lang={lang}
            onOpenEnquiry={() => handleOpenEnquiry()}
          />
        )}

        {(currentPage === 'privacy' || currentPage === 'terms' || currentPage === 'refund') && (
          <PolicyPages
            page={currentPage}
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Footer */}
      <GlobalFooter
        lang={lang}
        onNavigate={handleNavigate}
      />

      {/* Floating Action Buttons: AI Concierge (Top) & WhatsApp (Bottom) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        {/* POTHIK Gemini AI Chatbot Launcher (Positioned ABOVE WhatsApp) */}
        <PothikChatbot
          lang={lang}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* WhatsApp Direct Shortcut (01576466092) */}
        <a
          href="https://wa.me/8801576466092?text=Hello%20POTHIK!%20I%20would%20like%20to%20enquire%20about%20your%20travel%20packages."
          target="_blank"
          rel="noopener noreferrer"
          className="h-13 w-13 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-950/20 flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer group relative"
          title="Chat on WhatsApp (01576466092)"
          aria-label="WhatsApp Support"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="absolute right-16 bg-[#25332D] text-white text-xs px-3 py-1.5 rounded-xl shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none font-medium">
            WhatsApp: 01576466092
          </span>
        </a>
      </div>

      {/* Destination Detail Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        lang={lang}
        onBookTour={(destName) => handleOpenEnquiry('Package', destName)}
      />

      {/* Tour Package Detail Modal */}
      <TourPackageDetailModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        lang={lang}
        onBookPackage={(p) => handleOpenEnquiry('Package', p.title)}
        onAskDetails={(p) => handleOpenEnquiry('Package Enquiry', p.title)}
      />

      {/* Universal Booking & Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        lang={lang}
        initialServiceType={enquiryService}
        initialDestination={enquiryDest}
        onNewEnquiry={handleNewEnquiryCreated}
      />

      <OfflineIndicator lang={lang} />
    </div>
  );
}
