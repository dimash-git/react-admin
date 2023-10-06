"use client";

import React, { createContext, useState } from "react";
import * as z from "zod";
import formSchema from "../schema";

interface _MarketingContext {
  marketing: z.infer<typeof formSchema>;
  setMarketing: React.Dispatch<
    React.SetStateAction<z.infer<typeof formSchema>>
  >;
}

const MarketingContext = createContext<_MarketingContext>(
  {} as _MarketingContext
);

const MarketingProvider = ({ children }: { children: React.ReactNode }) => {
  const [marketing, setMarketing] = useState<z.infer<typeof formSchema>>({
    name: "",
    desc: "",
  } as z.infer<typeof formSchema>);

  return (
    <MarketingContext.Provider value={{ marketing, setMarketing }}>
      {children}
    </MarketingContext.Provider>
  );
};

export { MarketingContext, MarketingProvider };
