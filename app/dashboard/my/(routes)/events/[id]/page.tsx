import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";

const bdEvents = [
  {
    to: "/dashboard/my",
    name: "Главная",
  },
  {
    to: "/dashboard/my/events",
    name: "Мероприятия",
  },
];

const SingleEventPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Breadcrumbs bd={bdEvents} />
    </div>
  );
};

export default SingleEventPage;
