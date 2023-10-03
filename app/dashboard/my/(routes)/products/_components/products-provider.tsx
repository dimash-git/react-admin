"use client";

import React, { createContext, useState } from "react";
import { ProductValues } from "../schema";

interface _ProductContext {
  product: ProductValues;
  setProduct: React.Dispatch<React.SetStateAction<ProductValues>>;
}

const ProductContext = createContext<_ProductContext>({} as _ProductContext);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [product, setProduct] = useState<ProductValues>({} as ProductValues);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
