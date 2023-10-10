"use client";

import React, { createContext, useState } from "react";
import * as z from "zod";
import formSchema from "../schema";

interface _ProductContext {
  product: z.infer<typeof formSchema>;
  setProduct: React.Dispatch<React.SetStateAction<z.infer<typeof formSchema>>>;
}

const ProductContext = createContext<_ProductContext>({} as _ProductContext);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [product, setProduct] = useState<z.infer<typeof formSchema>>(
    {} as z.infer<typeof formSchema>
  );

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
