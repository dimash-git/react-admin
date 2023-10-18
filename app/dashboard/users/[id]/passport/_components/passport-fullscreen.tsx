"use client";

import React from "react";
import ExpandIcon from "@/public/icons/expand.svg";
import Image from "next/image";

const PassportFullscreen = ({
  passport,
  id,
}: {
  passport: UserPassport;
  id: string;
}) => {
  const toggleFullscreen = (imageId: string) => {
    const imageContainer = document.querySelector(`#${imageId}`);

    if (imageContainer) {
      if (document.fullscreenElement) {
        // Exit fullscreen
        document.exitFullscreen();
      } else {
        // Enter fullscreen for the specific image container
        imageContainer.requestFullscreen();
      }
    }
  };
  return (
    <div className="grid grid-cols-2 gap-x-[30px]">
      <div className="flex flex-col gap-[10px]">
        <span className="text-4 leading-4 font-medium">Главный разворот</span>
        <div
          id="mainImageContainer"
          className="rounded-[10px] overflow-hidden relative max-h-[300px]"
        >
          {passport?.passport_main ? (
            <Image
              src={passport.passport_main}
              alt={`Front: ${id}`}
              height={300}
              width={500}
              className="w-full object-fill"
            />
          ) : (
            <div className="h-[300px] w-full bg-[#101316]"></div>
          )}
          <button
            onClick={() => toggleFullscreen("mainImageContainer")}
            className="absolute left-[10px] bottom-[10px] px-[15px] py-[5px] text-[#0072FF] hover:text-[#a5c0e2] transition flex items-center gap-[10px] bg-[#4555804D] rounded-[5px]"
          >
            На весь экран <ExpandIcon />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <span className="text-4 leading-4 font-medium">Прописка</span>
        <div
          id="livingImageContainer"
          className="rounded-[10px] overflow-hidden relative max-h-[300px]"
        >
          {passport?.passport_living ? (
            <Image
              src={passport.passport_living}
              alt={`Back: ${id}`}
              height={300}
              width={500}
              className="w-full object-fill"
            />
          ) : (
            <div className="h-[300px] w-full bg-[#101316]"></div>
          )}
          <button
            onClick={() => toggleFullscreen("livingImageContainer")}
            className="absolute left-[10px] bottom-[10px] px-[15px] py-[5px] text-[#0072FF] hover:text-[#a5c0e2] transition flex items-center gap-[10px] bg-[#4555804D] rounded-[5px]"
          >
            На весь экран <ExpandIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassportFullscreen;
