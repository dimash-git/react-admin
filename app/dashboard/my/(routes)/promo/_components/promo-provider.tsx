import React, { createContext, useState } from "react";

interface _PromoContext {
  promo: PromoForm;
  setPromo: React.Dispatch<React.SetStateAction<PromoForm>>;
}

const PromoContext = createContext<_PromoContext>({} as _PromoContext);

const PromoProvider = ({ children }: { children: React.ReactNode }) => {
  const [promo, setPromo] = useState<PromoForm>({
    name: "",
  } as PromoForm);

  return (
    <PromoContext.Provider value={{ promo, setPromo }}>
      {children}
    </PromoContext.Provider>
  );
};

export { PromoContext, PromoProvider };
