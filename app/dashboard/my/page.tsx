"use client";

import React from "react";

import NavSection from "@/components/nav-section";

import { useSession } from "next-auth/react";
import { homeSections } from "./constants";

const MyPage = () => {
  const { data: session } = useSession();

  // console.log(session);

  return (
    <>
      <div className="max-w-[615px] w-full">
        <NavSection section={homeSections.events} />
        <NavSection section={homeSections.promo} />
        <div className="flex space-x-[30px]">
          <NavSection section={homeSections.news} />
          <NavSection section={homeSections.products} />
        </div>
      </div>
      <div className="max-w-[400px] w-full">
        <NavSection section={homeSections.marketing} />
        <NavSection section={homeSections.support} />
      </div>
    </>
  );
};

export default MyPage;
