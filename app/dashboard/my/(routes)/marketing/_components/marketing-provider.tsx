"use client";

import React, { createContext, useState } from "react";

interface MarketingPreview {
  name: string;
  desc: string;
  image?: File;
}

interface _MarketingContext {
  marketing: MarketingPreview;
  setMarketing: React.Dispatch<React.SetStateAction<MarketingPreview>>;
}

const MarketingContext = createContext<_MarketingContext>(
  {} as _MarketingContext
);

const MarketingProvider = ({ children }: { children: React.ReactNode }) => {
  const [marketing, setMarketing] = useState<MarketingPreview>({
    name: "",
    desc: "",
  } as MarketingPreview);

  return (
    <MarketingContext.Provider value={{ marketing, setMarketing }}>
      {children}
    </MarketingContext.Provider>
  );
};

export { MarketingContext, MarketingProvider };
