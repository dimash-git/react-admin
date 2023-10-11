import React, { createContext, useState } from "react";
import formSchema from "../schema";
import * as z from "zod";

interface _PromoContext {
  promo: z.infer<typeof formSchema>;
  setPromo: React.Dispatch<React.SetStateAction<z.infer<typeof formSchema>>>;
}

const PromoContext = createContext<_PromoContext>({} as _PromoContext);

const PromoProvider = ({ children }: { children: React.ReactNode }) => {
  const [promo, setPromo] = useState<z.infer<typeof formSchema>>(
    {} as z.infer<typeof formSchema>
  );

  return (
    <PromoContext.Provider value={{ promo, setPromo }}>
      {children}
    </PromoContext.Provider>
  );
};

export { PromoContext, PromoProvider };
