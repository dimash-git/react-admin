import React from "react";
import PromoForm from "../_components/promo-form";
import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import { homeBreadcrumbs, homeTabs } from "../../../constants";

const cat = "promo";
const lastBread = homeBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/my/${cat}`;

const breadcrumbs = [...homeBreadcrumbs[cat], lastBread] ?? [];

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={[...breadcrumbs, { name: "Cоздать промо материал" }]} />
      <Tabs links={homeTabs.promo} />
      <PromoForm />
    </div>
  );
};

export default AddPage;
