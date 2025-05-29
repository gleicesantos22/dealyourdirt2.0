"use client";

import React from "react";
import { SearchProvider } from "./SearchContext";
import { CurrencyProvider } from "./CurrencyContext"; // 

export default function AppProviders({ children }) {
  return (
    <SearchProvider>
      <CurrencyProvider>{children}</CurrencyProvider>
    </SearchProvider>
  );
}
