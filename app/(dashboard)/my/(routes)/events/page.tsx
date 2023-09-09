import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";
import EventsCard from "./card";
import Link from "next/link";

const bdEvents = [
  {
    to: "/my",
    name: "Главная",
  },
  {
    name: "Мероприятия",
  },
];

const EventsPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={bdEvents} />
      <div className="p-ten gap-[10px] rounded-twenty bg-[#2D3D52] max-h-[58px] h-full uppercase text-[15px] leading-4 font-medium flex items-center justify-between">
        <Link
          href=""
          className="bg-thBlue hover:bg-thBlue/80 transition w-full text-center rounded-twenty py-ten px-[30px]"
        >
          все мероприятия
        </Link>
        <Link
          href="/my/events/add"
          className="w-full text-center rounded-twenty py-ten px-[30px]"
        >
          Создать мероприятие
        </Link>
      </div>
      <div className="flex flex-col space-y-[30px]">
        {Array.from({ length: 6 }).map((card, idx) => (
          <EventsCard key={idx} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
