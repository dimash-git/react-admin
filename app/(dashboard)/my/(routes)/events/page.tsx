import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";
import EventsCard from "./card";

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
    <div className="h-fit">
      <Breadcrumbs bd={bdEvents} />
      <div className="mt-[30px] flex flex-col space-y-[30px]">
        {Array.from({ length: 6 }).map((card, idx) => (
          <EventsCard key={idx} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
