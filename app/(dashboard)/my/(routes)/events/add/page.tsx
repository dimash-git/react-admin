import React from "react";
import EventForm from "../form";
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";
const bdEvents = [
  {
    to: "/my",
    name: "Главная",
  },
  {
    to: "/my/events",
    name: "Мероприятия",
  },
];
const EventAddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={[...bdEvents, { name: "Cоздать мероприятие" }]} />
      <div className="p-ten gap-[10px] rounded-twenty bg-[#2D3D52] max-h-[58px] h-full uppercase text-[15px] leading-4 font-medium flex items-center justify-between">
        <Link
          href="/my/events"
          className=" w-full text-center rounded-twenty py-ten px-[30px]"
        >
          все мероприятия
        </Link>
        <Link
          href=""
          className="bg-thBlue hover:bg-thBlue/80 transition w-full text-center rounded-twenty py-ten px-[30px]"
        >
          Создать мероприятие
        </Link>
      </div>
      <EventForm />
    </div>
  );
};

export default EventAddPage;
