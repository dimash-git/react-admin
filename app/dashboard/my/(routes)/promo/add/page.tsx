import React from "react";
import Form from "../_components/promo-form";
import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import { homeTabs } from "../../../constants";

const breadcrumbs = [
  {
    to: "/dashboard/my",
    name: "Главная",
  },
  {
    to: "/dashboard/my/promo",
    name: "Промо материалы",
  },
];

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={[...breadcrumbs, { name: "Cоздать промо материал" }]} />
      <Tabs links={homeTabs.promo} />
      <Form />
    </div>
  );
};

export default AddPage;
