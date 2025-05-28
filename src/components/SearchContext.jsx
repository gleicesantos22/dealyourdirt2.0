"use client";

import React, { createContext, useState, useContext } from "react";

// Create context
const SearchContext = createContext();

/**
 * Provider component to hold search/filter state
 */
export function SearchProvider({ children }) {
  const [filteredProductId, setFilteredProductId] = useState(null);

  return (
    <SearchContext.Provider value={{ filteredProductId, setFilteredProductId }}>
      {children}
    </SearchContext.Provider>
  );
}

/**
 * Hook to use search context easily
 */
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
