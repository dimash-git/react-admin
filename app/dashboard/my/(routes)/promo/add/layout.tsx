"use client";

import { PromoProvider } from "../_components/promo-provider";

const PromoAddLayout = ({ children }: { children: React.ReactNode }) => {
  return <PromoProvider>{children}</PromoProvider>;
};

export default PromoAddLayout;
