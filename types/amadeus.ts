export interface AmadeusLocation {
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  iataCode: string;
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
  };
}

export interface FlightSegment {
  departure: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  aircraft: { code: string };
  operating?: { carrierCode: string };
  duration: string;
  id: string;
  numberOfStops: number;
}

export interface FlightOffer {
  type: string;
  id: string;
  source: string;
  itineraries: Array<{
    duration: string;
    segments: FlightSegment[];
  }>;
  price: {
    currency: string;
    total: string;
    base: string;
    grandTotal: string;
  };
  numberOfBookableSeats: number;
  validatingAirlineCodes: string[];
}

export interface AmadeusFlightResponse {
  meta: { count: number };
  data: FlightOffer[];
  dictionaries: {
    locations: Record<string, { cityCode: string; countryCode: string }>;
    aircraft: Record<string, string>;
    currencies: Record<string, string>;
    carriers: Record<string, string>;
  };
}
