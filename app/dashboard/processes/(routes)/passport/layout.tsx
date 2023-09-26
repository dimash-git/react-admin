import React from "react";
import { PassportProvider } from "./_components/passport-provider";

const PassportLayout = ({ children }: { children: React.ReactNode }) => {
  return <PassportProvider>{children}</PassportProvider>;
};

export default PassportLayout;
