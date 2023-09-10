"use client";

import React from "react";

import NavSection from "@/components/nav-section";

import { useSession } from "next-auth/react";
import { mySections } from "./constants";

const MyPage = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <>
      <div className="max-w-[615px] w-full">
        <NavSection section={mySections.events} />
        <NavSection section={mySections.promo} />
        <div className="flex space-x-[30px]">
          <NavSection section={mySections.news} />
          <NavSection section={mySections.products} />
        </div>
      </div>
      <div className="max-w-[400px] w-full">
        <NavSection section={mySections.marketing} />
        <NavSection section={mySections.support} />
      </div>
    </>
  );
};

export default MyPage;
