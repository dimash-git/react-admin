import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";
import EventForm from "../../_components/form";

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

const SingleEventEditPage = ({ params }: { params: { id: string } }) => {
  const eventId = params.id;
  return (
    <div>
      <Breadcrumbs
        bd={[...bdEvents, { name: `${eventId} - Редактирование` }]}
      />
      <EventForm />
    </div>
  );
};

export default SingleEventEditPage;
