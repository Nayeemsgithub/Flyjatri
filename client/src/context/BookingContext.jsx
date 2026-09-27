import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [activeBooking, setActiveBooking] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    serviceType: 'flights',
    from: { city: 'Dhaka', code: 'DAC', airport: 'Hazrat Shahjalal Intl' },
    to: { city: 'Dubai', code: 'DXB', airport: 'Dubai International' },
    departureDate: '2026-09-25',
    returnDate: '2026-09-26',
    tripType: 'roundTrip', // 'roundTrip' | 'oneWay' | 'multiCity'
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    cabinClass: 'Economy',
    hotelCity: 'Dubai',
    hotelRooms: 1,
    hotelGuests: 2,
    tourDestination: 'Maldives',
    visaCountry: 'United Arab Emirates'
  });

  const updateSearchCriteria = (newCriteria) => {
    setSearchCriteria(prev => ({ ...prev, ...newCriteria }));
  };

  const startBooking = (item, type = 'flight') => {
    setActiveBooking({
      type,
      item,
      searchCriteria
    });
  };

  return (
    <BookingContext.Provider value={{
      searchCriteria,
      updateSearchCriteria,
      activeBooking,
      setActiveBooking,
      startBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
