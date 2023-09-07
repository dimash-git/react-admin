import { cn } from "@/lib/utils";
import React from "react";

import CardActions from "./card-actions";

const EventsCard = () => {
  const online = true;
  return (
    <div className="flex font-medium items-center pb-ten justify-between border-b-[#2D3D52] border-b-[1px]">
      <div className="flex gap-[30px] items-center max-w-[300px] w-full">
        <div className="card__cover w-[94px] h-[50px] bg-[#2D3D52]"></div>
        <div className="flex flex-col gap-[7px]">
          <span className="card__title text-[15px] leading-4 font-semibold">
            Заголовок мероприятия
          </span>
          <span className="card__date text-[10px]">08.08.2023</span>
        </div>
      </div>
      <div className="flex flex-col gap-[5px]">
        <span className="text-[10px] uppercase">Тип мероприятия</span>
        <span
          className={cn(
            "text-[15px] leading-4 uppercase font-semibold",
            online ? "text-thGreen" : "text-thOrange"
          )}
        >
          {online ? "Онлайн" : "Оффлайн"}
        </span>
      </div>
      <div className="flex flex-col gap-[7px]">
        <span className="text-[10px] uppercase">ID</span>
        <span className="text-[10px] uppercase">83919424</span>
      </div>
      <div className="flex gap-ten items-center">
        <CardActions id="010000" />
      </div>
    </div>
  );
};

export default EventsCard;
