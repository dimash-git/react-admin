import React from "react";

import NavSection from "@/components/nav-section";

import {
  events,
  marketing,
  news,
  products,
  promo,
  support,
} from "@/constants/home/sections";

const DashboardPage = () => {
  return (
    <>
      <div className="max-w-[615px] w-full">
        <NavSection section={events} />
        <NavSection section={promo} />
        <div className="flex space-x-[30px]">
          <NavSection section={news} />
          <NavSection section={products} />
        </div>
      </div>
      <div className="max-w-[400px] w-full">
        <NavSection section={marketing} />
        <NavSection section={support} />
      </div>
    </>
  );
};

export default DashboardPage;
