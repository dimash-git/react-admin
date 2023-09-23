import React from "react";
import { MarketingProvider } from "../_components/marketing-provider";

const AddTagLayout = ({ children }: { children: React.ReactNode }) => {
  return <MarketingProvider>{children}</MarketingProvider>;
};

export default AddTagLayout;
