import { ShipVessel, Resort, TourPackage } from '../types';

export const BRAND_NAME = 'POTHIK';
export const BRAND_NAME_BN = 'পথিক';
export const BRAND_SLOGAN = 'Every Road Leads Somewhere.';
export const BRAND_SLOGAN_BN = 'প্রতিটি পথ কোথাও না কোথাও পৌঁছে দেয়।';

export const HOTLINE_PRIMARY = '+8801576466092'; // 24/7 Hotline
export const HOTLINE_SECONDARY = '+8801576466092'; // WhatsApp & Urgent Booking
export const HOTLINE_COXS_BAZAR = '+8801700900250'; // Cox's Bazar BIWTA Jetty Desk
export const HOTLINE_ST_MARTIN = '+8801811222450'; // St. Martin Pier Concierge
export const SUPPORT_EMAIL = 'support@pothik.com.bd';
export const OFFICIAL_LICENSE = 'BIWTA/POTHIK-STM/2025/REG-8842';

export const PROMO_TEXT_BENGALI = `প্ল্যান করে সেন্টমার্টিনের জন্য কক্সবাজার এসে যদি দেখেন শিপের টিকেটটা ফেইক অথবা সমুদ্র পেরিয়ে জানতে পারেন রিসোর্ট বুকিং কনফার্ম হয়নি- তাহলে পুরো ছুটিরই বারোটা বাজবে! 
সমাধান আছে পথিক (POTHIK)-এ। ১০০% অথেনটিক ডিল-এ আগেভাগেই কনফার্ম করুন সবকিছু। 

✅ ১০০% ভ্যালিড QR-কোডেড ট্রাভেল পাস
✅ গ্যারান্টিড শিপ টিকিট
✅ কনফার্মড রিসোর্ট বুকিং

আর মাত্র হাতেগোনা কিছু বুকিং বাকি। শেষের দিকে পস্তানোর চেয়ে এখনই আপনার স্লট কনফার্ম করুন।
প্ল্যানিং থেকে বুকিং—আপনার ট্রিপ হ্যাসেল-ফ্রি করতে পাশে আছে পথিক (POTHIK)।
আজই আপনার সেন্টমার্টিন ট্রিপ কনফার্ম করুন: +8801576466092`;

export const PROMO_TEXT_ENGLISH = `Imagine arriving in Cox's Bazar excited for your Saint Martin trip, only to discover fake ship tickets or unconfirmed island resort bookings! 
The solution is POTHIK. Lock in 100% authentic, guaranteed deals today.

✅ 100% Valid QR-Coded Travel Pass
✅ Guaranteed Ship & Cruise Tickets
✅ Confirmed Island Beachfront Resort Bookings

Only a few limited slots remaining! Book before it sells out.
From planning to boarding—POTHIK makes your holiday hassle-free: Every Road Leads Somewhere.
Confirm your Saint Martin trip today: +8801576466092`;

export const PRESET_VOICE_SCRIPTS = [
  {
    id: 'official-promo',
    titleBn: 'অফিসিয়াল ট্রিপ অফার ও সতর্কবার্তা',
    titleEn: 'Official Trip Offer & Security Warning',
    textBn: `প্ল্যান করে সেন্টমার্টিনের জন্য কক্সবাজার এসে যদি দেখেন শিপের টিকেটটা ফেইক অথবা রিসোর্ট বুকিং কনফার্ম হয়নি- তাহলে পুরো ছুটিরই বারোটা বাজবে! সমাধান আছে পথিক (POTHIK)-এ। ১০০% ভ্যালিড QR ট্রাভেল পাস, গ্যারান্টিড শিপ টিকিট এবং কনফার্মড রিসোর্ট বুকিং নিয়ে আমরা আছি আপনার পাশে। এখনই কল করুন +8801576466092 নম্বরে।`,
    textEn: `Planning for Saint Martin and arriving in Cox's Bazar only to find a fake ship ticket or unconfirmed resort ruin your holiday? POTHIK guarantees 100% genuine QR travel passes, reserved ship tickets, and verified resorts. Call us now at +8801576466092.`,
    recommendedVoice: 'Kore' as const,
    recommendedStyle: 'Energetic, warm, trustworthy Bengali travel consultant',
  },
  {
    id: 'travel-pass-announcement',
    titleBn: 'ভেরিফায়েড QR ট্রাভেল পাস নির্দেশিকা',
    titleEn: 'Verified QR Travel Pass Guidelines',
    textBn: `সম্মানিত যাত্রী, বাংলাদেশ পর্যটন বোর্ড ও বন্দর কর্তৃপক্ষের নিয়মানুযায়ী সেন্টমার্টিন প্রবেশের জন্য ভ্যালিড কিউআর ট্রাভেল পাস থাকা বাধ্যতামূলক। পথিক (POTHIK) থেকে বুকিং করলে তাৎক্ষণিক কিউআর কোডসহ পাস পেয়ে যাবেন যা কাউন্টারে ও জাহাজে সরাসরি স্ক্যানযোগ্য।`,
    textEn: `Dear passenger, according to Bangladesh Tourism Board and Port Authority rules, a valid QR travel pass is mandatory to enter Saint Martin Island. Booking with POTHIK provides an instant scannable digital QR pass accepted at all checkpoints.`,
    recommendedVoice: 'Zephyr' as const,
    recommendedStyle: 'Clear, polite official travel announcement',
  },
  {
    id: 'eco-guidelines',
    titleBn: 'সেন্টমার্টিন পরিবেশ ও কোরাল সংরক্ষণ নীতি',
    titleEn: 'Eco-Protection & Coral Reef Guidelines',
    textBn: `সেন্টমার্টিন আমাদের একমাত্র প্রবাল দ্বীপ। সমুদ্র সৈকতে কোনো প্লাস্টিক বা পলিথিন ফেলবেন না। ছেঁড়াদ্বীপের প্রবাল বা সামুদ্রিক শামুক-ঝিনুক কেনা বা সংগ্রহ করা আইনত দণ্ডনীয়। দ্বীপের সৌন্দর্য রক্ষায় পরিবেশবান্ধব পর্যটনে অংশ নিন।`,
    textEn: `Saint Martin is our only coral island. Please refrain from discarding plastics on the beach. Collecting coral or marine life from Chhera Dwip is strictly forbidden. Let's protect the natural beauty together.`,
    recommendedVoice: 'Fenrir' as const,
    recommendedStyle: 'Calm, thoughtful environmental awareness voice',
  },
  {
    id: 'urgency-slots',
    titleBn: 'সীমিত আসন সতর্কতা',
    titleEn: 'Urgent Limited Slots Alert',
    textBn: `বিশেষ দ্রষ্টব্য! আগামী সপ্তাহের সেন্টমার্টিন গামী বিলাসবহুল ক্রুজ শিপ এবং প্রিমিয়াম বিচ রিসোর্টের আর মাত্র হাতেগোনা কয়েকটি স্লট বাকি আছে। শেষ মুহূর্তে টিকিটের সংকট ও প্রতারণা এড়াতে এখনই পথিক (POTHIK)-এ আপনার টিকিট লক করুন।`,
    textEn: `Important advisory! Only a handful of slots remain for luxury ship cruises and beachfront resorts next week. Secure your confirmed tickets right now with POTHIK to avoid last-minute rush and scalpers.`,
    recommendedVoice: 'Puck' as const,
    recommendedStyle: 'Excited and urgent broadcast announcer',
  },
];

export const SHIPS_DATA: ShipVessel[] = [
  {
    id: 'bay-one',
    name: 'MV Bay One Luxury Cruise',
    nameBn: 'এমভি বে ওয়ান লাক্সারি ক্রুজ',
    type: 'Luxury Ocean Liner',
    typeBn: 'আন্তর্জাতিক মানের বিলাসবহুল ক্রুজ',
    departurePoint: "Cox's Bazar (BIWTA Jetty, Nuniar Chara)",
    departurePointBn: "কক্সবাজার (বিআইডব্লিউটিএ ঘাট, নুনিয়ারছড়া)",
    journeyTime: '4.5 Hours',
    journeyTimeBn: '৪.৫ ঘণ্টা',
    rating: 4.9,
    remainingSeats: 6,
    totalSeats: 120,
    features: ['Ocean View Terrace Deck', 'Buffet Dining Lounge', 'Live Cultural Music', 'VIP Presidential Cabins', 'Doctor on Board'],
    featuresBn: ['ওপেন ওশান ভিউ সান ডেক', 'বুফে ডাইনিং লাউঞ্জ', 'লাইভ মিউজিক ও বিনোদন', 'ভিআইপি প্রেসিডেনশিয়াল কেবিন', 'অন-বোর্ড মেডিকেল সাপোর্ট'],
    classes: [
      { className: 'Coral Deck (Open Air)', classNameBn: 'কোরাল ডেক (উন্মুক্ত বাতাস)', price: 3500, available: 4 },
      { className: 'Ocean View Executive (AC)', classNameBn: 'এক্সিকিউটিভ এসি সিট', price: 4800, available: 2 },
      { className: 'Royal Luxury Cabin', classNameBn: 'রয়্যাল লাক্সারি কেবিন', price: 12500, available: 1 },
    ],
    departureTime: '06:30 AM',
    returnTime: '03:30 PM',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'karnafuly-express',
    name: 'Karnafuly Express',
    nameBn: 'কর্ণফুলী এক্সপ্রেস',
    type: 'Fast Modern Catamaran',
    typeBn: 'আধুনিক দ্রুতগামী সি ক্রুজার',
    departurePoint: "Cox's Bazar (Nuniar Chara)",
    departurePointBn: "কক্সবাজার (নুনিয়ারছড়া জেটি)",
    journeyTime: '4 Hours',
    journeyTimeBn: '৪ ঘণ্টা',
    rating: 4.8,
    remainingSeats: 9,
    totalSeats: 150,
    features: ['Full Air-Conditioned', 'Comfortable Airplane Seats', 'Snack Bar & Refreshments', 'Stabilizer System'],
    featuresBn: ['সম্পূর্ণ সেন্ট্রাল এসি', 'আরামদায়ক রিক্লাইনার সিট', 'স্ন্যাক বার ও কফি শপ', 'অ্যান্টি-রোলিং স্ট্যাবিলাইজার'],
    classes: [
      { className: 'Economy AC Class', classNameBn: 'ইকোনমি এসি ক্লাস', price: 2800, available: 5 },
      { className: 'Business Ocean Club', classNameBn: 'বিজনেস ওশান ক্লাব', price: 3800, available: 4 },
    ],
    departureTime: '07:00 AM',
    returnTime: '03:45 PM',
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'keari-sindbad',
    name: 'Keari Sindbad',
    nameBn: 'কেয়ারী সিন্দাবাদ',
    type: 'Classic Tourist Vessel',
    typeBn: 'জনপ্রিয় বিশ্বস্ত ট্যুরিস্ট ভেসেল',
    departurePoint: 'Teknaf (Damdamia Ghat) / Cox’s Bazar',
    departurePointBn: 'টেকনাফ (দমদমিয়া ঘাট) ও কক্সবাজার',
    journeyTime: '2.5 Hours (from Teknaf)',
    journeyTimeBn: '২.৫ ঘণ্টা (টেকনাফ থেকে)',
    rating: 4.7,
    remainingSeats: 14,
    totalSeats: 180,
    features: ['Pioneer St. Martin Vessel', 'Affordable Family Class', 'Roof Top Sea Viewing', 'Life Jackets for All'],
    featuresBn: ['সেন্টমার্টিন রুটের পথপ্রদর্শক ভেসেল', 'সাশ্রয়ী পারিবারিক ভ্রমণ', 'ছাদ থেকে নীল সাগর দর্শন', 'প্রত্যেক যাত্রীর লাইফ জ্যাকেট'],
    classes: [
      { className: 'Main Deck', classNameBn: 'মেইন ডেক আসন', price: 1800, available: 8 },
      { className: 'Upper Observation Deck', classNameBn: 'আপার অবজারভেশন ডেক', price: 2400, available: 6 },
    ],
    departureTime: '09:00 AM',
    returnTime: '03:00 PM',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'atlantic-cruise',
    name: 'Atlantic Cruise',
    nameBn: 'আটলান্টিক ক্রুজ',
    type: 'Speed Cruise Vessel',
    typeBn: 'আধুনিক স্পিড ক্রুজ জাহাজ',
    departurePoint: "Cox's Bazar / Teknaf",
    departurePointBn: "কক্সবাজার / টেকনাফ",
    journeyTime: '3 Hours',
    journeyTimeBn: '৩ ঘণ্টা',
    rating: 4.8,
    remainingSeats: 5,
    totalSeats: 110,
    features: ['Panoramic Windows', 'Seafood Canteen', 'Express Boarding', 'Luggage Care'],
    featuresBn: ['প্যানোরামিক সী-ভিউ গ্লাস', 'তাজা সিফুড ক্যান্টিন', 'ফাস্ট বোর্ডিং চেক-ইন', 'লাগেজ সিকিউরিটি'],
    classes: [
      { className: 'Silver AC Seat', classNameBn: 'সিলভার এসি সিট', price: 2600, available: 3 },
      { className: 'Gold Lounge VIP', classNameBn: 'গোল্ড লাউঞ্জ ভিআইপি', price: 3600, available: 2 },
    ],
    departureTime: '07:30 AM',
    returnTime: '03:15 PM',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  },
];

export const RESORTS_DATA: Resort[] = [
  {
    id: 'coral-view-resort',
    name: 'Coral View Resort & Cottages',
    nameBn: 'কোরাল ভিউ রিসোর্ট অ্যান্ড কটেজ',
    location: 'East Beach, Saint Martin',
    locationBn: 'পূর্ব বিচ, সেন্টমার্টিন দ্বীপ',
    beachAccess: 'Direct Beachfront (0m)',
    beachAccessBn: 'সরাসরি সৈকত সংলগ্ন (০ মিটার)',
    pricePerNight: 5500,
    rating: 4.9,
    reviewsCount: 382,
    amenities: ['Direct Coral Beach Access', '24/7 Solar & Gen Electricity', 'Fresh Sweet Water Supply', 'Seafood BBQ Garden', 'Complimentary Breakfast'],
    amenitiesBn: ['সরাসরি প্রবাল সৈকত ভিউ', '২৪ ঘণ্টা নিরবচ্ছিন্ন বিদ্যুৎ', 'মিষ্টি পানির নিশ্চয়তা', 'সীফুড বারবিকিউ জোন', 'কমপ্লিমেন্টারি ব্রেকফাস্ট'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    badge: 'Tripbooking Verified Guarantee',
    badgeBn: '১০০% রিসোর্ট কনফার্মড গ্যারান্টি',
    remainingRooms: 3,
  },
  {
    id: 'praasad-paradise',
    name: 'Praasad Paradise St. Martin',
    nameBn: 'প্রাসাদ প্যারাডাইস সেন্টমার্টিন',
    location: 'West Beach Coral Coast',
    locationBn: 'পশ্চিম বিচ কোরাল কোস্ট',
    beachAccess: 'Private Beachfront with Coconut Grove',
    beachAccessBn: 'নারিকেল বাগান ঘেরা প্রাইভেট সৈকত',
    pricePerNight: 7200,
    rating: 4.9,
    reviewsCount: 512,
    amenities: ['Private Beach Hammocks', 'Sunset Lounge Cafe', 'Modern En-Suite Bathrooms', 'High-Speed Wi-Fi Area', 'Island Guide Service'],
    amenitiesBn: ['সৈকতে নিজস্ব হ্যামক ও সিট', 'সানসেট লাউঞ্জ ক্যাফে', 'আধুনিক অ্যাটাচড ওয়াশরুম', 'ওয়াই-ফাই সুবিধা', 'আইল্যান্ড গাইড অ্যাসিস্ট্যান্স'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    badge: 'Luxury Top Pick',
    badgeBn: 'টপ রেটেড প্রিমিয়াম রিসোর্ট',
    remainingRooms: 2,
  },
  {
    id: 'blue-marine-resort',
    name: 'Blue Marine Resort',
    nameBn: 'ব্লু মেরিন রিসোর্ট',
    location: 'Near Main Jetty & Market',
    locationBn: 'জেটি ঘাট ও বাজারের কাছে',
    beachAccess: '3 Minutes to Main Beach',
    beachAccessBn: 'সৈকত থেকে মাত্র ৩ মিনিটের হাঁটা পথ',
    pricePerNight: 4200,
    rating: 4.7,
    reviewsCount: 290,
    amenities: ['Multi-Cuisine Island Restaurant', 'Power Backup', 'Family Interconnected Rooms', 'Room Service', 'Security Guard'],
    amenitiesBn: ['মাল্টি-কুইজিন রেস্টুরেন্ট', 'ব্যাকআপ জেনারেটর', 'পারিবারিক বড় রুম', 'রুম সার্ভিস', '২৪ ঘণ্টা নিরাপত্তা'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Family Value',
    badgeBn: 'ফ্যামিলি ট্রাভেলারদের পছন্দ',
    remainingRooms: 5,
  },
  {
    id: 'sunset-serenade',
    name: 'Sunset Serenade Eco-Cottages',
    nameBn: 'সানসেট সেরেনাড ইকো-কটেজ',
    location: 'South Beach, Near Chhera Dwip Point',
    locationBn: 'দক্ষিণ বিচ, ছেঁড়াদ্বীপের সন্নিকটে',
    beachAccess: 'Untouched Serene White Sand Shore',
    beachAccessBn: 'কোলাহলমুক্ত নিরিবিলি সাদা বালুর সৈকত',
    pricePerNight: 4800,
    rating: 4.8,
    reviewsCount: 195,
    amenities: ['Eco Wooden Cottages', 'Stargazing Night Campfire', 'Fresh Lobster & Coral Fish BBQ', 'Organic Coconut Water', 'Solar Powered'],
    amenitiesBn: ['প্রাকৃতিক কাঠের ইকো-কটেজ', 'রাতের তারা দেখার ক্যাম্পফায়ার', 'তাজা লবস্টার ও কোরাল বারবিকিউ', 'ডাবের পানি ও ট্রপিক্যাল ফ্রুটস', 'সৌরবিদ্যুৎ চালিত'],
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    badge: 'Nature & Eco Friendly',
    badgeBn: 'প্রকৃতিপ্রেমীদের স্বর্গ',
    remainingRooms: 4,
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'couple-paradise',
    title: 'Saint Martin Romantic Couple Escape',
    titleBn: 'সেন্টমার্টিন রোমান্টিক কাপল ডিল',
    duration: '2 Nights / 3 Days',
    durationBn: '২ রাত / ৩ দিন',
    price: 14500,
    originalPrice: 17500,
    shipIncluded: 'Karnafuly Express / Bay One',
    shipIncludedBn: 'কর্ণফুলী এক্সপ্রেস অথবা বে ওয়ান সিট',
    resortType: 'Beachfront Deluxe Room with Balcony',
    resortTypeBn: 'সৈকত সংলগ্ন ব্যালকনি ডিলাক্স রুম',
    highlights: [
      'Round-trip confirmed ship tickets',
      'Official QR Travel Pass included',
      'Candlelight beach BBQ dinner for 2',
      'Chhera Dwip speed boat guided excursion',
      'Zero cancellation hassle warranty',
    ],
    highlightsBn: [
      'যাতায়াত উভয়মুখী শতভাগ কনফার্ম শিপ টিকিট',
      'সরকারি ভ্যালিড কিউআর ট্রাভেল পাস অন্তর্ভুক্ত',
      'সৈকতে রোমান্টিক ক্যান্ডেললাইট সীফুড বারবিকিউ',
      'ছেঁড়াদ্বীপ স্পিডবোট ও গাইড ভ্রমণ',
      'নো-হ্যাসেল কনফার্মেশন গ্যারান্টি',
    ],
    popularTag: 'Most Popular',
    popularTagBn: 'সর্বাধিক জনপ্রিয়',
    remainingSlots: 4,
  },
  {
    id: 'family-adventure',
    title: 'All-Inclusive Island Family Holiday',
    titleBn: 'অল-ইনক্লুসিভ ফ্যামিলি আইল্যান্ড ট্যুর',
    duration: '3 Nights / 4 Days',
    durationBn: '৩ রাত / ৪ দিন',
    price: 24900,
    originalPrice: 29500,
    shipIncluded: 'MV Bay One Luxury Cruise or Karnafuly Express',
    shipIncludedBn: 'এমভি বে ওয়ান অথবা কর্ণফুলী এক্সপ্রেস',
    resortType: 'Family Coral Suite (Praasad Paradise / Coral View)',
    resortTypeBn: 'ফ্যামিলি কোরাল স্যুট (প্রাসাদ প্যারাডাইস / কোরাল ভিউ)',
    highlights: [
      '4 Person verified travel passes & seats',
      'Resort pickup and luggage handling',
      'Authentic fresh seafood meal plan',
      'Island tour by electric Tom-Tom vehicle',
      'Complimentary snorkeling kit',
    ],
    highlightsBn: [
      '৪ জনের কনফার্ম শিপ সিট ও কিউআর ট্রাভেল পাস',
      'জেটি থেকে রিসোর্ট পিকআপ ও লাগেজ ব্যবস্থাপনা',
      'তাজা সামুদ্রিক মাছ ও রুপচাঁদা ডাইনিং প্ল্যান',
      'টমটমে পুরো সেন্টমার্টিন দ্বীপ প্রদক্ষিণ',
      'স্নরকেলিং কিট ও সেইফটি জ্যাকেট সাপোর্ট',
    ],
    popularTag: 'Family Best Choice',
    popularTagBn: 'পারিবারিক সেরা ডিল',
    remainingSlots: 3,
  },
  {
    id: 'backpacker-adventure',
    title: 'Coral Island Eco-Camp & BBQ Tour',
    titleBn: 'ইকো ক্যাম্পিং, স্টারগেজিং ও বারবিকিউ ট্রিপ',
    duration: '1 Night / 2 Days',
    durationBn: '১ রাত / ২ দিন',
    price: 6999,
    originalPrice: 8500,
    shipIncluded: 'Keari Sindbad / Atlantic Cruise',
    shipIncludedBn: 'কেয়ারী সিন্দাবাদ অথবা আটলান্টিক ক্রুজ',
    resortType: 'Beachfront Wooden Cottage or Glamping Tent',
    resortTypeBn: 'সৈকতে কাঠের কটেজ অথবা গ্ল্যাম্পিং টেন্ট',
    highlights: [
      'Confirmed ship ticket & QR travel pass',
      'Night acoustic music & BBQ feast',
      'Chhera Dwip bicycle exploration',
      'Sunrise watching at East Point',
    ],
    highlightsBn: [
      'কনফার্ম যাতায়াত টিকিট ও ভ্যালিড ট্রাভেল পাস',
      'রাতে সমুদ্রতীরে গান ও ফ্রেশ বারবিকিউ ভোজ',
      'ছেঁড়াদ্বীপ সাইক্লিং ট্রিপ',
      'পূর্ব সৈকতে মনোমুগ্ধকর সূর্যোদয় দর্শন',
    ],
    popularTag: 'Budget Friendly',
    popularTagBn: 'সাশ্রয়ী অ্যাডভেঞ্চার',
    remainingSlots: 7,
  },
];

export const MOCK_VERIFIED_PASS = {
  passNumber: 'STM-2025-9942',
  passengerName: 'MD SHAHIN ALAM',
  phone: '+8801576466092',
  nidOrPassport: '1992451290384',
  travelDate: '12 Nov 2025',
  returnDate: '15 Nov 2025',
  shipName: 'MV Bay One Luxury Cruise',
  resortName: 'Coral View Resort (East Beach)',
  seatClass: 'Coral Deck (Open Air) - Seat #A-14',
  status: 'ACTIVE_VERIFIED' as const,
  qrHash: 'TB-HASH-09AF-77C1-STM-GOVT-VERIFIED',
  issuedAt: '2025-11-01 10:30 AM',
  authorityStamp: 'Approved by Bangladesh Tourism Board & BIWTA Chittagong Division',
};
