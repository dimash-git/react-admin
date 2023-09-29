"use client";

import React, { createContext, useState } from "react";

interface ProductPreview {
  name: string;
  desc: string;
  advantages: string[];
  products?: {
    product_id: string;
  }[];
  image?: File | null;
  price: number;
  discount?: number;
  cat?: string;
  is_pack: boolean;
  is_robot: boolean;
}

interface _ProductContext {
  product: ProductPreview;
  setProduct: React.Dispatch<React.SetStateAction<ProductPreview>>;
}

const ProductContext = createContext<_ProductContext>({} as _ProductContext);

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [product, setProduct] = useState<ProductPreview>({
    name: "",
    desc: "",
    advantages: [""],
    price: 0,
    is_pack: false,
    is_robot: false,
    image: null,
  } as ProductPreview);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
