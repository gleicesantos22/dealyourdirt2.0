"use client";

import React from "react";
import { SearchProvider } from "./SearchContext";

export default function AppProviders({ children }) {
  return <SearchProvider>{children}</SearchProvider>;
}
