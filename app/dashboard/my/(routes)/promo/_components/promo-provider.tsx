import React, { createContext, useState } from "react";
import { PromoValues } from "../schema";

interface _PromoContext {
  promo: PromoValues;
  setPromo: React.Dispatch<React.SetStateAction<PromoValues>>;
}

const PromoContext = createContext<_PromoContext>({} as _PromoContext);

const PromoProvider = ({ children }: { children: React.ReactNode }) => {
  const [promo, setPromo] = useState<PromoValues>({
    name: "",
  } as PromoValues);

  return (
    <PromoContext.Provider value={{ promo, setPromo }}>
      {children}
    </PromoContext.Provider>
  );
};

export { PromoContext, PromoProvider };
