"use client";

import React, { createContext, useState } from "react";
import { MarketingValues } from "../schema";

interface _MarketingContext {
  marketing: MarketingValues;
  setMarketing: React.Dispatch<React.SetStateAction<MarketingValues>>;
}

const MarketingContext = createContext<_MarketingContext>(
  {} as _MarketingContext
);

const MarketingProvider = ({ children }: { children: React.ReactNode }) => {
  const [marketing, setMarketing] = useState<MarketingValues>({
    name: "",
    desc: "",
  } as MarketingValues);

  return (
    <MarketingContext.Provider value={{ marketing, setMarketing }}>
      {children}
    </MarketingContext.Provider>
  );
};

export { MarketingContext, MarketingProvider };
