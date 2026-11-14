export type PageView = 
  | 'home' 
  | 'destinations' 
  | 'destination-detail' 
  | 'packages' 
  | 'package-detail' 
  | 'flights' 
  | 'hotels' 
  | 'visa' 
  | 'blog' 
  | 'blog-detail' 
  | 'about' 
  | 'contact' 
  | 'faq' 
  | 'enquiry' 
  | 'privacy' 
  | 'terms' 
  | 'refund' 
  | 'admin';

export interface Destination {
  id: string;
  name: string;
  nameBn: string;
  country: string;
  countryBn: string;
  type: 'international' | 'domestic';
  category: 'beach' | 'mountain' | 'cultural' | 'city' | 'nature' | 'island';
  categoryBn: string;
  image: string;
  gallery: string[];
  shortDesc: string;
  shortDescBn: string;
  fullDesc: string;
  fullDescBn: string;
  bestTimeToVisit: string;
  bestTimeToVisitBn: string;
  startingPriceBDT: number;
  rating: number;
  popularAttractions: { name: string; nameBn: string; desc: string; descBn: string }[];
  travelTips: string[];
  travelTipsBn: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  titleBn: string;
  destinationId: string;
  destinationName: string;
  destinationNameBn: string;
  duration: string;
  durationBn: string;
  priceBDT: number;
  originalPriceBDT?: number;
  image: string;
  gallery: string[];
  type: 'Honeymoon' | 'Family' | 'Group' | 'Adventure' | 'Luxury' | 'Budget';
  typeBn: string;
  shortDesc: string;
  shortDescBn: string;
  rating: number;
  reviewsCount: number;
  departureDates: string[];
  itinerary: { day: number; title: string; titleBn: string; description: string; descriptionBn: string }[];
  inclusions: string[];
  inclusionsBn: string[];
  exclusions: string[];
  exclusionsBn: string[];
  hotelDetails: string;
  hotelDetailsBn: string;
  importantNotes: string[];
  importantNotesBn: string[];
}

export interface Hotel {
  id: string;
  name: string;
  nameBn: string;
  destination: string;
  destinationBn: string;
  location: string;
  locationBn: string;
  image: string;
  gallery: string[];
  rating: number;
  pricePerNightBDT: number;
  amenities: string[];
  amenitiesBn: string[];
  roomTypes: { type: string; typeBn: string; price: number; capacity: string }[];
  description: string;
  descriptionBn: string;
}

export interface FlightOption {
  id: string;
  airline: string;
  airlineCode: string;
  logo: string;
  fromCode: string;
  fromCity: string;
  fromCityBn: string;
  toCode: string;
  toCity: string;
  toCityBn: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  priceBDT: number;
  cabinClass: 'Economy' | 'Premium Economy' | 'Business';
}

export interface VisaGuide {
  id: string;
  country: string;
  countryBn: string;
  flag: string;
  visaType: string;
  visaTypeBn: string;
  processingTime: string;
  processingTimeBn: string;
  validity: string;
  validityBn: string;
  feeBDT: number;
  requirements: string[];
  requirementsBn: string[];
  documents: string[];
  documentsBn: string[];
  notes: string;
  notesBn: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleBn: string;
  slug: string;
  excerpt: string;
  excerptBn: string;
  content: string;
  contentBn: string;
  coverImage: string;
  author: string;
  date: string;
  readTime: string;
  category: 'Guide' | 'Tips' | 'Itinerary' | 'Inspiration';
  categoryBn: string;
}

export interface Testimonial {
  id: string;
  author: string;
  authorBn: string;
  location: string;
  locationBn: string;
  avatar: string;
  rating: number;
  text: string;
  textBn: string;
  tour: string;
  tourBn: string;
  date: string;
  verified: boolean;
}

export interface EnquirySubmission {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: 'Package' | 'Flight' | 'Hotel' | 'Visa' | 'Custom Tour';
  destination: string;
  departureDate: string;
  returnDate?: string;
  travelers: number;
  additionalRequirements: string;
  status: 'Pending' | 'Contacted' | 'Quoted' | 'Confirmed' | 'Cancelled';
  createdAt: string;
  assignedStaff?: string;
  internalNotes?: string;
  totalQuotedPrice?: number;
}
