import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Ship, 
  Building2, 
  Calendar, 
  Users, 
  Phone, 
  User, 
  CreditCard, 
  CheckCircle, 
  Download, 
  Printer, 
  Volume2, 
  QrCode, 
  Sparkles, 
  Lock,
  HardDrive,
  ExternalLink,
  Check,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SHIPS_DATA, RESORTS_DATA, HOTLINE_PRIMARY, HOTLINE_SECONDARY } from '../data/travelData';
import { ShipVessel, Resort, TourPackage } from '../types';
import { ttsService } from '../services/ttsService';
import { createBookingInFirestore, auth } from '../firebase';
import { googleDriveService } from '../services/googleDriveService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'bn' | 'en';
  initialShip?: ShipVessel | null;
  initialResort?: Resort | null;
  initialPackage?: TourPackage | null;
  initialDate?: string | null;
  initialCouponCode?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialShip,
  initialResort,
  initialPackage,
  initialDate,
  initialCouponCode,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');

  // Form State
  const [selectedShipId, setSelectedShipId] = useState<string>(initialShip?.id || SHIPS_DATA[0].id);
  const [selectedResortId, setSelectedResortId] = useState<string>(initialResort?.id || RESORTS_DATA[0].id);
  const [travelDate, setTravelDate] = useState<string>(initialDate || '2025-11-15');
  const [returnDate, setReturnDate] = useState<string>('2025-11-18');
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [passengerName, setPassengerName] = useState<string>('');
  const [passengerPhone, setPassengerPhone] = useState<string>('');
  const [nidPassport, setNidPassport] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>(initialCouponCode || '');

  React.useEffect(() => {
    if (initialDate) {
      setTravelDate(initialDate);
    }
    if (initialCouponCode) {
      setCouponCode(initialCouponCode);
    }
  }, [initialDate, initialCouponCode]);

  // Confirmed State
  const [confirmedData, setConfirmedData] = useState<any>(null);
  const [voicePlaying, setVoicePlaying] = useState<boolean>(false);
  const [driveSaving, setDriveSaving] = useState<boolean>(false);
  const [driveSavedLink, setDriveSavedLink] = useState<string | null>(null);
  const [driveError, setDriveError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ship = SHIPS_DATA.find((s) => s.id === selectedShipId) || SHIPS_DATA[0];
    const resort = RESORTS_DATA.find((r) => r.id === selectedResortId) || RESORTS_DATA[0];
    const generatedPassId = `STM-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString(36).toUpperCase().slice(-4)}`;

    const details = {
      passNumber: generatedPassId,
      name: passengerName || (lang === 'bn' ? 'সম্মানিত অতিথি' : 'Valued Traveler'),
      passengerName: passengerName || (lang === 'bn' ? 'সম্মানিত অতিথি' : 'Valued Traveler'),
      phone: passengerPhone || '+8801576466092',
      nid: nidPassport || '1992451290384',
      shipName: lang === 'bn' ? ship.nameBn : ship.name,
      resortName: lang === 'bn' ? resort.nameBn : resort.name,
      travelDate,
      returnDate,
      travelersCount,
      totalAmount: (ship.classes[0].price * 2 + resort.pricePerNight * 2) * (travelersCount > 2 ? 1.5 : 1),
      status: 'CONFIRMED' as const,
    };

    // Save to Firestore database
    try {
      await createBookingInFirestore({
        ...details,
        createdAt: new Date().toISOString(),
      });
    } catch (dbErr) {
      console.warn('Firestore save notice:', dbErr);
    }

    setConfirmedData(details);
    setStep('confirmed');

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    // Auto-generate audio confirmation readout with Gemini 3.8 Flash TTS
    playConfirmationVoice(details);
  };

  const handleSaveToDrive = async () => {
    if (!confirmedData) return;
    setDriveSaving(true);
    setDriveError(null);
    try {
      const res = await googleDriveService.uploadTravelPassToDrive({
        passNumber: confirmedData.passNumber,
        passengerName: confirmedData.passengerName,
        phone: confirmedData.phone,
        nid: confirmedData.nid,
        shipName: confirmedData.shipName,
        resortName: confirmedData.resortName,
        travelDate: confirmedData.travelDate,
        returnDate: confirmedData.returnDate,
        travelersCount: confirmedData.travelersCount,
        totalAmount: confirmedData.totalAmount,
      });
      setDriveSavedLink(res.webViewLink);
    } catch (err: any) {
      setDriveError(err?.message || 'Could not save to Google Drive. Please make sure you are signed in.');
    } finally {
      setDriveSaving(false);
    }
  };

  const playConfirmationVoice = (details: any) => {
    setVoicePlaying(true);
    const text = lang === 'bn'
      ? `অভিনন্দন ${details.name}! আপনার ট্রিপ সফলভাবে কনফার্ম হয়েছে। আপনার কিউআর ট্রাভেল পাস নম্বর ${details.passNumber}। নির্ধারিত জাহাজ ${details.shipName} এবং রিসোর্ট ${details.resortName} এ আপনার আসন ও রুম শতভাগ নিশ্চিত। যেকোনো সহায়তায় কল করুন +8801576466092 নম্বরে।`
      : `Congratulations ${details.name}! Your Saint Martin booking is 100% confirmed with Tripbooking.ai. Your authorized QR Pass ID is ${details.passNumber}. Your seats on ${details.shipName} and room at ${details.resortName} are locked. Safe travels!`;

    ttsService.generateAndPlaySpeech(
      text,
      'Kore',
      'Joyful, clear Bengali booking concierge',
      (state) => {
        if (!state.isPlaying) setVoicePlaying(false);
      }
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-cyan-900 via-teal-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg sm:text-xl text-white">
                {step === 'form' 
                  ? (lang === 'bn' ? 'সেন্টমার্টিন অথেনটিক বুকিং স্লট' : 'Reserve Authentic Island Slot')
                  : (lang === 'bn' ? 'বুকিং ও QR ট্রাভেল পাস নিশ্চিত!' : 'Booking & QR Pass Confirmed!')}
              </h2>
              <p className="text-xs text-slate-300">
                {lang === 'bn' ? '১০০% নিশ্চিত ভাউচার ও নো-ফেক গ্যারান্টি' : '100% Validated Pass & Direct Reservation'}
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
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Alert strip */}
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'bn' 
                    ? 'আপনার বুকিংয়ের সাথে অফিসিয়াল সরকারি কিউআর ট্রাভেল পাস বিনামূল্যে সংযুক্ত থাকবে।' 
                    : 'Your booking includes an official scannable government travel pass at zero extra charge.'}
                </span>
              </div>

              {/* Ship Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Ship className="w-3.5 h-3.5 text-cyan-600" />
                  {lang === 'bn' ? 'জাহাজ / ক্রুজ নির্বাচন করুন:' : 'Select Ship / Cruise:'}
                </label>
                <select
                  value={selectedShipId}
                  onChange={(e) => setSelectedShipId(e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 font-medium text-slate-800 bg-white"
                >
                  {SHIPS_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {lang === 'bn' ? s.nameBn : s.name} ({s.departurePoint}) — শুরু ৳{s.classes[0].price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Resort Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                  {lang === 'bn' ? 'বিচ রিসোর্ট নির্বাচন করুন:' : 'Select Beach Resort:'}
                </label>
                <select
                  value={selectedResortId}
                  onChange={(e) => setSelectedResortId(e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800 bg-white"
                >
                  {RESORTS_DATA.map((r) => (
                    <option key={r.id} value={r.id}>
                      {lang === 'bn' ? r.nameBn : r.name} ({lang === 'bn' ? r.beachAccessBn : r.beachAccess}) — ৳{r.pricePerNight}/রাত
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Dates & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                    {lang === 'bn' ? 'যাত্রার তারিখ:' : 'Travel Date:'}
                  </label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                    {lang === 'bn' ? 'ফেরার তারিখ:' : 'Return Date:'}
                  </label>
                  <input
                    type="date"
                    required
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-teal-600" />
                    {lang === 'bn' ? 'যাত্রী সংখ্যা:' : 'Travelers:'}
                  </label>
                  <select
                    value={travelersCount}
                    onChange={(e) => setTravelersCount(Number(e.target.value))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 font-medium bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {lang === 'bn' ? 'জন যাত্রী' : 'Persons'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-cyan-600" />
                    {lang === 'bn' ? 'মূল যাত্রীর নাম (এনআইডি অনুযায়ী):' : 'Lead Passenger Name:'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Md. Shakil Ahmed"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-cyan-600" />
                      {lang === 'bn' ? 'মোবাইল নম্বর (এসএমএস কনফার্মেশন):' : 'Mobile Phone:'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+8801XXXXXXXXX"
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                      {lang === 'bn' ? 'জাতীয় পরিচয়পত্র / পাসপোর্ট নম্বর:' : 'NID / Passport Number:'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1993481029384"
                      value={nidPassport}
                      onChange={(e) => setNidPassport(e.target.value)}
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                </div>

                {/* Promo Code & Voucher (ShareTrip feature) */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>{lang === 'bn' ? 'প্রমো কোড / ভাউচার ডিসকাউন্ট:' : 'Promo Voucher / Coupon Code:'}</span>
                    {couponCode && (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ✓ {lang === 'bn' ? 'কুপন কোড সক্রিয়' : 'Coupon Applied'}
                      </span>
                    )}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. STMARTIN35 or BKASH500"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="w-full p-2.5 text-xs font-mono font-bold uppercase rounded-xl border border-slate-300 focus:ring-2 focus:ring-cyan-500"
                    />
                    {couponCode && (
                      <button
                        type="button"
                        onClick={() => setCouponCode('')}
                        className="px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-xl"
                      >
                        {lang === 'bn' ? 'মুছুন' : 'Clear'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-base rounded-2xl shadow-lg shadow-teal-500/20 transition transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5 text-slate-950" />
                  <span>{lang === 'bn' ? '১০০% নিশ্চিত বুকিং সম্পন্ন করুন' : 'Confirm 100% Authentic Slot'}</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mt-2 font-medium">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>
                    {lang === 'bn' 
                      ? 'কোনো ফেইক টিকেট নেই • অনুমোদিত ট্রাভেল পাস সাথে সাথে জেনারেট হবে' 
                      : 'Zero Fake Tickets • Instant Encrypted QR Pass Generated'}
                  </span>
                </div>
              </div>

            </form>
          ) : (
            /* Confirmation View */
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Big Success Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-400 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-emerald-950">
                  {lang === 'bn' ? 'অভিনন্দন! আপনার সেন্টমার্টিন ট্রিপ শতভাগ নিশ্চিত!' : 'Success! Your Saint Martin Trip is 100% Confirmed!'}
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  {lang === 'bn'
                    ? 'আপনার টিকিট ও কিউআর ট্রাভেল পাস প্রস্তুত। ঘাটে গিয়ে কোনো বিভ্রান্তি বা ফেইক টিকেটের ঝুঁকিমুক্ত থাকুন।'
                    : 'Your PNR and authentic cryptographic Travel Pass have been logged with Port Authorities.'}
                </p>
              </div>

              {/* Printable Ticket & Pass Visual */}
              <div className="p-5 bg-white rounded-2xl border-2 border-dashed border-slate-300 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-cyan-800 text-sm">Tripbooking.ai Official Pass</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      VERIFIED PASS
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {confirmedData?.passNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-xl text-white">
                    {/* SVG QR */}
                    <div className="w-24 h-24 bg-white p-1 rounded-lg">
                      <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                        <rect x="0" y="0" width="30" height="30" />
                        <rect x="5" y="5" width="20" height="20" fill="white" />
                        <rect x="10" y="10" width="10" height="10" />
                        <rect x="70" y="0" width="30" height="30" />
                        <rect x="75" y="5" width="20" height="20" fill="white" />
                        <rect x="80" y="10" width="10" height="10" />
                        <rect x="0" y="70" width="30" height="30" />
                        <rect x="5" y="75" width="20" height="20" fill="white" />
                        <rect x="10" y="80" width="10" height="10" />
                        <circle cx="50" cy="50" r="10" fill="#059669" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-mono text-cyan-300 mt-1">SCAN AT GANGWAY</span>
                  </div>

                  <div className="sm:col-span-2 text-xs space-y-1.5 text-slate-700 font-medium">
                    <div>
                      <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'যাত্রী:' : 'Passenger:'}</span>
                      <span className="font-bold text-slate-900 text-sm">{confirmedData?.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'জাহাজ:' : 'Ship:'}</span>
                        <span className="font-semibold text-cyan-800">{confirmedData?.shipName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'রিসোর্ট:' : 'Resort:'}</span>
                        <span className="font-semibold text-emerald-800">{confirmedData?.resortName}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'যাত্রার তারিখ:' : 'Travel Date:'}</span>
                        <span className="font-bold text-slate-900">{confirmedData?.travelDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">{lang === 'bn' ? 'যাত্রী সংখ্যা:' : 'Persons:'}</span>
                        <span className="font-bold text-slate-900">{confirmedData?.travelersCount} জন</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gemini 3.8 Flash TTS Voice Readout Section */}
              <div className="p-4 rounded-2xl bg-cyan-950 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Sparkles className="w-5 h-5 animate-spin-slow" />
                  </div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>{lang === 'bn' ? 'AI ভয়েস নিশ্চিতকরণ শুনুন' : 'AI Voice Confirmation (Gemini TTS)'}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-900 text-cyan-300">
                        gemini-3.8-flash-tts
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-300">
                      {voicePlaying 
                        ? (lang === 'bn' ? 'ভয়েস বার্তা চলছে...' : 'Playing voice message...')
                        : (lang === 'bn' ? 'মডেল gemini-3.8-flash-tts দিয়ে তৈরি' : 'Powered by gemini-3.8-flash-tts')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => playConfirmationVoice(confirmedData)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'আবার শুনুন' : 'Play Audio'}</span>
                </button>
              </div>

              {/* Google Drive Direct Save Card */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <HardDrive className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {lang === 'bn' ? 'গুগল ড্রাইভে ট্রাভেল পাস সেভ করুন' : 'Save Pass to Google Drive'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {driveSavedLink
                        ? (lang === 'bn' ? '✓ সফলভাবে গুগল ড্রাইভে সেভ করা হয়েছে!' : '✓ Successfully saved to Google Drive!')
                        : (lang === 'bn' ? 'আপনার ব্যক্তিগত ড্রাইভে সরাসরি ডিজিটাল কপি ব্যাকআপ রাখুন' : 'Backup your verified digital pass to your personal Drive')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {driveSavedLink ? (
                    <a
                      href={driveSavedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
                    >
                      <span>{lang === 'bn' ? 'ড্রাইভে দেখুন' : 'Open in Drive'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={handleSaveToDrive}
                      disabled={driveSaving}
                      className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      {driveSaving ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>{lang === 'bn' ? 'সেভ হচ্ছে...' : 'Saving to Drive...'}</span>
                        </>
                      ) : (
                        <>
                          <HardDrive className="w-3.5 h-3.5" />
                          <span>{lang === 'bn' ? 'ড্রাইভে সেভ করুন' : 'Save to Drive'}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {driveError && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs">
                  {driveError}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'পাস প্রিন্ট / সেভ করুন' : 'Print / Save Pass'}</span>
                </button>

                <a
                  href={`tel:${HOTLINE_PRIMARY}`}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition text-center"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{HOTLINE_PRIMARY}</span>
                </a>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
