import React, { createContext, useContext, useState, useEffect } from 'react';

export const CURRENCIES = [
  { code: 'BDT', country: 'BD', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩', rate: 1 },
  { code: 'USD', country: 'US', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rate: 0.00833 },
  { code: 'MYR', country: 'MY', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾', rate: 0.037 },
  { code: 'AED', country: 'AE', name: 'UAE Dirham', symbol: 'AED', flag: '🇦🇪', rate: 0.0305 },
  { code: 'SAR', country: 'SA', name: 'Saudi Riyal', symbol: 'SAR', flag: '🇸🇦', rate: 0.0312 },
  { code: 'SGD', country: 'SG', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', rate: 0.0108 },
  { code: 'INR', country: 'IN', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', rate: 0.70 },
  { code: 'EUR', country: 'EU', name: 'Euro', symbol: '€', flag: '🇪🇺', rate: 0.00769 },
  { code: 'GBP', country: 'GB', name: 'British Pound', symbol: '£', flag: '🇬🇧', rate: 0.00645 },
  { code: 'THB', country: 'TH', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', rate: 0.274 }
];

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem('flyjatri_currency');
      if (saved) {
        const found = CURRENCIES.find(c => c.code === saved);
        if (found) return found;
      }
    } catch (e) {}
    return CURRENCIES[0]; // Default BDT
  });

  const changeCurrency = (codeOrObj) => {
    let target = null;
    if (typeof codeOrObj === 'string') {
      target = CURRENCIES.find(c => c.code === codeOrObj) || CURRENCIES[0];
    } else if (codeOrObj && codeOrObj.code) {
      target = codeOrObj;
    }
    if (target) {
      setSelectedCurrency(target);
      try {
        localStorage.setItem('flyjatri_currency', target.code);
      } catch (e) {}
    }
  };

  const formatPrice = (amountInBDT) => {
    if (amountInBDT === undefined || amountInBDT === null || isNaN(amountInBDT)) return '0';
    const converted = Math.round(amountInBDT * selectedCurrency.rate);
    return `${selectedCurrency.symbol}${converted.toLocaleString()}`;
  };

  const convertPrice = (amountInBDT) => {
    if (amountInBDT === undefined || amountInBDT === null || isNaN(amountInBDT)) return 0;
    return Math.round(amountInBDT * selectedCurrency.rate);
  };

  return (
    <CurrencyContext.Provider value={{
      selectedCurrency,
      currencies: CURRENCIES,
      changeCurrency,
      formatPrice,
      convertPrice
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      selectedCurrency: CURRENCIES[0],
      currencies: CURRENCIES,
      changeCurrency: () => {},
      formatPrice: (amt) => `৳${amt || 0}`,
      convertPrice: (amt) => amt || 0
    };
  }
  return context;
}
