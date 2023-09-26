"use client";

import React, { createContext, useState } from "react";

interface _PassportContext {
  passport: Passport;
  setPassport: React.Dispatch<React.SetStateAction<Passport>>;
}

const PassportContext = createContext<_PassportContext>({} as _PassportContext);

const PassportProvider = ({ children }: { children: React.ReactNode }) => {
  const [passport, setPassport] = useState<Passport>({} as Passport);

  return (
    <PassportContext.Provider value={{ passport, setPassport }}>
      {children}
    </PassportContext.Provider>
  );
};

export { PassportContext, PassportProvider };
