import React from "react";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const MyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="p-ten mt-[22px] max-w-[1280px] w-full mx-auto flex space-x-[30px]">
        <Sidebar />
        <div className="flex gap-[30px] w-full h-fit">{children}</div>
      </main>
    </>
  );
};

export default MyLayout;
