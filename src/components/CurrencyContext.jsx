"use client";

import React, { createContext, useContext, useState } from "react";

// Create the context
const CurrencyContext = createContext();

// Provider component to wrap your app
export function CurrencyProvider({ children }) {
  // Default currency is USD
  const [currency, setCurrency] = useState("USD");

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

// Custom hook to use currency context easily
export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
