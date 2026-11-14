export interface ShipVessel {
  id: string;
  name: string;
  nameBn: string;
  type: string;
  typeBn: string;
  departurePoint: string;
  departurePointBn: string;
  journeyTime: string;
  journeyTimeBn: string;
  rating: number;
  remainingSeats: number;
  totalSeats: number;
  features: string[];
  featuresBn: string[];
  classes: {
    className: string;
    classNameBn: string;
    price: number;
    available: number;
  }[];
  departureTime: string;
  returnTime: string;
  image: string;
}

export interface Resort {
  id: string;
  name: string;
  nameBn: string;
  location: string;
  locationBn: string;
  beachAccess: string;
  beachAccessBn: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  amenities: string[];
  amenitiesBn: string[];
  image: string;
  badge: string;
  badgeBn: string;
  remainingRooms: number;
}

export interface TourPackage {
  id: string;
  title: string;
  titleBn: string;
  duration: string;
  durationBn: string;
  price: number;
  originalPrice: number;
  shipIncluded: string;
  shipIncludedBn: string;
  resortType: string;
  resortTypeBn: string;
  highlights: string[];
  highlightsBn: string[];
  popularTag?: string;
  popularTagBn?: string;
  remainingSlots: number;
}

export interface TravelPass {
  passNumber: string;
  passengerName: string;
  phone: string;
  nidOrPassport: string;
  travelDate: string;
  returnDate: string;
  shipName: string;
  resortName: string;
  seatClass: string;
  status: 'ACTIVE_VERIFIED' | 'EXPIRED' | 'PENDING';
  qrHash: string;
  issuedAt: string;
  authorityStamp: string;
}

export interface TTSRequest {
  text: string;
  voice: 'Kore' | 'Puck' | 'Fenrir' | 'Zephyr' | 'Charon';
  style?: string;
}

export interface TTSResponse {
  success: boolean;
  audioBase64?: string;
  mimeType?: string;
  voiceUsed?: string;
  error?: string;
}

export interface SeaCondition {
  level: 'CALM' | 'MODERATE' | 'ROUGH';
  textEn: string;
  textBn: string;
  statusEn: string;
  statusBn: string;
  signal: number;
}

export interface ForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  rainProb: number;
  windMax: number;
  conditionEn: string;
  conditionBn: string;
  icon: string;
}

export interface SaintMartinWeather {
  location: string;
  locationBn: string;
  coordinates: { lat: number; lon: number };
  fetchedAt: string;
  current: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windGusts: number;
    conditionEn: string;
    conditionBn: string;
    icon: string;
    isDay: boolean;
    seaCondition: SeaCondition;
  };
  forecast: ForecastDay[];
}

export interface OtaSearchQuery {
  tab: 'ships' | 'resorts' | 'packages' | 'pass';
  tripType: 'roundTrip' | 'oneWay';
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  children: number;
  cabinClass: string;
  fareType: 'regular' | 'student' | 'defense';
}

