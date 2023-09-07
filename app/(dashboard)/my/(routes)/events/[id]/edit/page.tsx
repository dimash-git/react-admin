import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";
import EventForm from "../../form";

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
