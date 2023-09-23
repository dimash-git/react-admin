import React from "react";
import Form from "../_components/event-form";
import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import { homeTabs } from "../../../constants";

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

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={[...bdEvents, { name: "Cоздать мероприятие" }]} />
      <Tabs links={homeTabs.events} />
      <Form />
    </div>
  );
};

export default AddPage;
