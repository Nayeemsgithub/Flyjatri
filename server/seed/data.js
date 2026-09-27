const seedData = {
  destinations: [
    {
      id: 'dest-1',
      name: 'Dubai',
      country: 'United Arab Emirates',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      price: '$ 482',
      priceValue: 482,
      currency: 'USD',
      popular: true,
      tag: 'International',
      description: 'Experience futuristic skyscrapers, luxury shopping, and golden desert safaris.'
    },
    {
      id: 'dest-2',
      name: 'Singapore',
      country: 'Singapore',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
      price: '$ 620',
      priceValue: 620,
      currency: 'USD',
      popular: true,
      tag: 'International',
      description: 'Marvel at Marina Bay Sands, futuristic Supertrees, and vibrant street food.'
    },
    {
      id: 'dest-3',
      name: 'Bangkok',
      country: 'Thailand',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
      price: '$ 398',
      priceValue: 398,
      currency: 'USD',
      popular: true,
      tag: 'International',
      description: 'Historic ornate temples, bustling river markets, and lively nightlife.'
    },
    {
      id: 'dest-4',
      name: "Cox's Bazar",
      country: 'Bangladesh',
      image: 'https://images.unsplash.com/photo-1628178822394-43cb4d122244?auto=format&fit=crop&w=800&q=80',
      price: '৳ 12,500',
      priceValue: 12500,
      currency: 'BDT',
      popular: true,
      tag: 'Domestic',
      description: "Walk along the world's longest unbroken natural sandy sea beach."
    },
    {
      id: 'dest-5',
      name: 'Maldives',
      country: 'Republic of Maldives',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      price: '$ 1,250',
      priceValue: 1250,
      currency: 'USD',
      popular: true,
      tag: 'International',
      description: 'Overwater bungalows, crystal clear turquoise lagoons, and coral reefs.'
    },
    {
      id: 'dest-6',
      name: 'Sajek Valley',
      country: 'Bangladesh',
      image: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=800&q=80',
      price: '৳ 8,500',
      priceValue: 8500,
      currency: 'BDT',
      popular: true,
      tag: 'Domestic',
      description: 'The Kingdom of Clouds perched atop lush green hills in Rangamati.'
    }
  ],

  flights: [
    {
      id: 'FL-001',
      airline: 'Biman Bangladesh Airlines',
      airlineCode: 'BG',
      flightNumber: 'BG-147',
      logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
      from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
      to: { city: 'Dubai', code: 'DXB', airport: 'Dubai International' },
      departureTime: '08:30 AM',
      arrivalTime: '12:15 PM',
      duration: '5h 45m',
      stops: 'Non-stop',
      stopCount: 0,
      price: 482,
      currency: 'USD',
      refundable: true,
      baggage: '30 kg Check-in + 7 kg Cabin',
      aircraft: 'Boeing 787-8 Dreamliner',
      availableSeats: 18,
      cabinClass: 'Economy'
    },
    {
      id: 'FL-002',
      airline: 'Emirates',
      airlineCode: 'EK',
      flightNumber: 'EK-583',
      logo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=120&q=80',
      from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
      to: { city: 'Dubai', code: 'DXB', airport: 'Dubai International' },
      departureTime: '10:15 AM',
      arrivalTime: '01:45 PM',
      duration: '5h 30m',
      stops: 'Non-stop',
      stopCount: 0,
      price: 520,
      currency: 'USD',
      refundable: true,
      baggage: '35 kg Check-in + 7 kg Cabin',
      aircraft: 'Boeing 777-300ER',
      availableSeats: 24,
      cabinClass: 'Economy'
    },
    {
      id: 'FL-003',
      airline: 'Singapore Airlines',
      airlineCode: 'SQ',
      flightNumber: 'SQ-447',
      logo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=120&q=80',
      from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
      to: { city: 'Singapore', code: 'SIN', airport: 'Changi Airport' },
      departureTime: '11:55 PM',
      arrivalTime: '06:05 AM',
      duration: '4h 10m',
      stops: 'Non-stop',
      stopCount: 0,
      price: 620,
      currency: 'USD',
      refundable: true,
      baggage: '30 kg Check-in + 7 kg Cabin',
      aircraft: 'Airbus A350-900',
      availableSeats: 12,
      cabinClass: 'Economy'
    },
    {
      id: 'FL-004',
      airline: 'US-Bangla Airlines',
      airlineCode: 'BS',
      flightNumber: 'BS-217',
      logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
      from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
      to: { city: 'Bangkok', code: 'BKK', airport: 'Suvarnabhumi Airport' },
      departureTime: '09:20 AM',
      arrivalTime: '12:50 PM',
      duration: '2h 30m',
      stops: 'Non-stop',
      stopCount: 0,
      price: 398,
      currency: 'USD',
      refundable: true,
      baggage: '25 kg Check-in + 7 kg Cabin',
      aircraft: 'Boeing 737-800',
      availableSeats: 30,
      cabinClass: 'Economy'
    },
    {
      id: 'FL-005',
      airline: 'US-Bangla Airlines',
      airlineCode: 'BS',
      flightNumber: 'BS-141',
      logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
      from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
      to: { city: "Cox's Bazar", code: 'CXB', airport: "Cox's Bazar Domestic" },
      departureTime: '11:00 AM',
      arrivalTime: '12:05 PM',
      duration: '1h 05m',
      stops: 'Non-stop',
      stopCount: 0,
      price: 58,
      priceBDT: 6500,
      currency: 'USD',
      refundable: true,
      baggage: '20 kg Check-in + 7 kg Cabin',
      aircraft: 'ATR 72-600',
      availableSeats: 15,
      cabinClass: 'Economy'
    },
    {
      id: 'FL-006',
      airline: 'Biman Bangladesh Airlines',
      airlineCode: 'BG',
      flightNumber: 'BG-433',
      logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
      from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
      to: { city: "Cox's Bazar", code: 'CXB', airport: "Cox's Bazar Domestic" },
      departureTime: '03:15 PM',
      arrivalTime: '04:20 PM',
      duration: '1h 05m',
      stops: 'Non-stop',
      stopCount: 0,
      price: 52,
      priceBDT: 5900,
      currency: 'USD',
      refundable: true,
      baggage: '20 kg Check-in + 7 kg Cabin',
      aircraft: 'Dash 8-Q400',
      availableSeats: 22,
      cabinClass: 'Economy'
    }
  ],

  tourPackages: [
    {
      id: 'tour-1',
      title: 'Maldives Escape - Luxury Overwater Villa',
      subtitle: '5 Nights | 6 Days',
      destination: 'Maldives',
      location: 'Male & Maafushi Atolls',
      duration: '6 Days / 5 Nights',
      price: 1250,
      originalPrice: 1599,
      discount: '22% Off',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
      ],
      rating: 4.9,
      reviewsCount: 142,
      specialOffer: true,
      features: ['Flight Included', '5-Star Resort Hotel', 'Speedboat Transfers', 'All Breakfasts & Dinners', 'Snorkeling Tour'],
      inclusions: [
        'Return Economy Air Ticket (Dhaka - Male - Dhaka)',
        '3 Nights Overwater Villa + 2 Nights Beach Villa',
        'Daily Buffet Breakfast and Dinner',
        'Round-trip Speedboat transfers from Male Airport',
        'Complimentary Snorkeling gear & Coral Reef Safari',
        'All Maldives green taxes and service charges'
      ],
      itinerary: [
        { day: 'Day 1', title: 'Arrival in Male & Speedboat Transfer', details: 'Meet & greet at Velana International Airport, scenic speedboat transfer to luxury private island resort.' },
        { day: 'Day 2', title: 'Island Leisure & Water Sports', details: 'Enjoy pristine white sandy beaches, kayaking, and complimentary water sports.' },
        { day: 'Day 3', title: 'Guided Coral Reef & Turtle Snorkeling', details: 'Explore vibrant coral reefs with certified marine biologists and swim with sea turtles.' },
        { day: 'Day 4', title: 'Sunset Dolphin Cruise', details: 'Evening cruise aboard a traditional Dhoni boat watching spinner dolphins under golden sunset.' },
        { day: 'Day 5', title: 'Spa & Overwater Sunset Dining', details: 'Relax with signature tropical spa massage followed by romantic dinner over the water.' },
        { day: 'Day 6', title: 'Male City Tour & Departure', details: 'Transfer to Male, brief shopping tour and departure flight back to Dhaka.' }
      ]
    },
    {
      id: 'tour-2',
      title: "Cox's Bazar 5-Star Beach Haven & Marine Drive",
      subtitle: '3 Nights | 4 Days',
      destination: "Cox's Bazar",
      location: "Inani Beach & Marine Drive, Cox's Bazar",
      duration: '4 Days / 3 Nights',
      price: 180,
      priceBDT: 21500,
      originalPrice: 240,
      discount: '25% Off',
      image: 'https://images.unsplash.com/photo-1628178822394-43cb4d122244?auto=format&fit=crop&w=1200&q=80',
      rating: 4.8,
      reviewsCount: 98,
      specialOffer: false,
      features: ['Flight Included', 'Sea View Room at Sayeman Resort', 'Private AC Vehicle', 'Daily Breakfast'],
      inclusions: [
        'Dhaka to Cox’s Bazar Return Air Ticket',
        '3 Nights Stay in Sea-View Suite',
        'Daily Buffet Breakfast',
        'Private AC Car for Marine Drive & Inani Beach Tour',
        'Airport pickup and drop-off'
      ]
    },
    {
      id: 'tour-3',
      title: 'Dubai Wonders, Burj Khalifa & Desert Safari',
      subtitle: '4 Nights | 5 Days',
      destination: 'Dubai',
      location: 'Downtown Dubai & Marina',
      duration: '5 Days / 4 Nights',
      price: 780,
      originalPrice: 950,
      discount: '18% Off',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      rating: 4.9,
      reviewsCount: 165,
      specialOffer: true,
      features: ['Burj Khalifa 124th Floor', 'Desert Safari with BBQ', 'Marina Dhow Cruise Dinner', '4-Star Hotel'],
      inclusions: [
        'Return Airfare',
        '4 Nights Stay at 4-Star Downtown Hotel',
        'Burj Khalifa At the Top observation ticket',
        '4x4 Desert Dune Bashing with BBQ Dinner & Tanoura Show',
        'Marina Yacht Dhow Cruise with International Buffet',
        'UAE Tourist Visa Assistance'
      ]
    },
    {
      id: 'tour-4',
      title: 'Sajek Valley Kingdom of Clouds Experience',
      subtitle: '2 Nights | 3 Days',
      destination: 'Sajek Valley',
      location: 'Ruilui Para, Rangamati',
      duration: '3 Days / 2 Nights',
      price: 95,
      priceBDT: 11000,
      originalPrice: 130,
      discount: '27% Off',
      image: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1200&q=80',
      rating: 4.7,
      reviewsCount: 84,
      specialOffer: false,
      features: ['Hill-view Eco Resort', '4x4 Chander Gari Safari', 'Konglak Pahar Trek', 'All Meals Included'],
      inclusions: [
        'Dhaka - Khagrachari AC Bus Tickets',
        'Reserved Chander Gari with army convoy guide',
        '2 Nights Stay in Premium Wooden Cottage in Sajek',
        'All meals (Indigenous Bamboo Chicken & traditional dishes)',
        'Trek to Konglak Peak & Alutila Cave'
      ]
    }
  ],

  visaServices: [
    {
      id: 'visa-1',
      country: 'United Arab Emirates (Dubai)',
      code: 'AE',
      flag: '🇦🇪',
      processingTime: '2 - 3 Working Days',
      price: 95,
      currency: 'USD',
      types: ['Tourist Visa (30 Days)', 'Tourist Visa (60 Days)', 'Express Visa (24 Hours)'],
      requirements: [
        'Valid Passport (Minimum 6 months validity)',
        'Scanned Color Copy of Passport Bio Page',
        'Recent White Background Passport Photo (35x45mm)',
        'Return Air Ticket Copy & Hotel Reservation'
      ]
    },
    {
      id: 'visa-2',
      country: 'Thailand',
      code: 'TH',
      flag: '🇹🇭',
      processingTime: '4 - 5 Working Days',
      price: 65,
      currency: 'USD',
      types: ['Single Entry Tourist Visa', 'Multiple Entry Tourist Visa', 'Medical Visa'],
      requirements: [
        'Original Passport with minimum 6 months validity',
        'Bank Statement (Last 6 months, Min Balance $1000 equivalent)',
        'Bank Solvency Certificate',
        'Employment Letter / Trade License & Visiting Card',
        '2 Recent Photos (35x45mm, white background)'
      ]
    },
    {
      id: 'visa-3',
      country: 'Singapore',
      code: 'SG',
      flag: '🇸🇬',
      processingTime: '3 - 4 Working Days',
      price: 75,
      currency: 'USD',
      types: ['E-Visa Tourist', 'Business Visa'],
      requirements: [
        'Passport copy (min 6 months validity)',
        'Bank Statement (6 months)',
        'Letter of Introduction (Form 14A)',
        'Invitation Letter / Hotel Reservation'
      ]
    },
    {
      id: 'visa-4',
      country: 'United Kingdom (UK)',
      code: 'GB',
      flag: '🇬🇧',
      processingTime: '15 Working Days',
      price: 180,
      currency: 'USD',
      types: ['Standard Visitor Visa (6 Months)', '2-Year Long Term Visa', 'Student Visa'],
      requirements: [
        'Current & Previous Passports',
        'Bank statements showing sufficient funds for trip',
        'Proof of employment, salary slips & tax documents',
        'Travel itinerary and accommodation proof'
      ]
    },
    {
      id: 'visa-5',
      country: 'United States (USA)',
      code: 'US',
      flag: '🇺🇸',
      processingTime: 'Appointment Based',
      price: 185,
      currency: 'USD',
      types: ['B1/B2 Tourist & Business Visa', 'F-1 Student Visa'],
      requirements: [
        'DS-160 Confirmation Page',
        'Valid Passport with previous travel history',
        'Appointment Confirmation Letter',
        'Comprehensive Financial & Property Documents'
      ]
    },
    {
      id: 'visa-6',
      country: 'Saudi Arabia',
      code: 'SA',
      flag: '🇸🇦',
      processingTime: '24 Hours (E-Visa)',
      price: 140,
      currency: 'USD',
      types: ['Tourist E-Visa (1 Year Multiple)', 'Umrah Visa', 'Business Visa'],
      requirements: [
        'Passport copy with 6 months validity',
        'Passport size photograph',
        'Mandatory health insurance (included in application)'
      ]
    }
  ],

  hotels: [
    {
      id: 'htl-1',
      name: 'Burj Al Arab Jumeirah',
      city: 'Dubai',
      country: 'United Arab Emirates',
      rating: 5,
      pricePerNight: 950,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      amenities: ['Private Beach', 'Infinity Pool', 'Helipad', 'Butler Service', 'Spa', 'Free WiFi']
    },
    {
      id: 'htl-2',
      name: "Sayeman Beach Resort",
      city: "Cox's Bazar",
      country: 'Bangladesh',
      rating: 5,
      pricePerNight: 95,
      priceBDT: 11500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      amenities: ['Infinity Sea-view Pool', 'Private Beach Access', 'Seafood Restaurant', 'Gym', 'Free Breakfast']
    },
    {
      id: 'htl-3',
      name: 'Marina Bay Sands',
      city: 'Singapore',
      country: 'Singapore',
      rating: 5,
      pricePerNight: 480,
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
      amenities: ['Rooftop Infinity Pool', 'SkyPark Observation Deck', 'Casino', 'Luxury Mall', 'Michelin Dining']
    }
  ],

  offers: [
    {
      id: 'offer-1',
      title: 'Summer Getaway - Up to 40% Off Flights',
      category: 'Flight Deals',
      code: 'FLY40',
      description: 'Book your international flight with US-Bangla or Biman and save big.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'offer-2',
      title: 'Luxury Resorts Flash Sale',
      category: 'Hotel Deals',
      code: 'STAYLUX',
      description: 'Get complimentary breakfast & room upgrades across 50+ luxury hotels.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'offer-3',
      title: 'Honeymoon Tour Special Voucher',
      category: 'Tour Packages',
      code: 'HONEYMOON',
      description: 'Special couple discounts on Maldives, Bali, and Cox’s Bazar tours.',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80'
    }
  ]
};

module.exports = seedData;
