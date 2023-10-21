"use client";

import React, { createContext, useState } from "react";

interface Creds {
  login: string;
  password: string;
  type?: "google" | "phone";
  code?: string;
}

interface _CredsContext {
  creds: Creds;
  setCreds: React.Dispatch<React.SetStateAction<Creds>>;
}

const CredsContext = createContext<_CredsContext>({} as _CredsContext);

const CredsProvider = ({ children }: { children: React.ReactNode }) => {
  const [creds, setCreds] = useState<Creds>({} as Creds);

  return (
    <CredsContext.Provider value={{ creds, setCreds }}>
      {children}
    </CredsContext.Provider>
  );
};

export { CredsContext, CredsProvider };
