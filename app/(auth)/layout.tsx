import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-[394px] w-full rounded-ten bg-thDark p-5">
        <h1 className="uppercase text-blue text-center mb-5 text-[23px] font-bold">
          Admin Panel
        </h1>
        <div className="flex justify-center mb-5">
          <Image width={251} height={249} src="/logo-auth.png" alt="Logo" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
