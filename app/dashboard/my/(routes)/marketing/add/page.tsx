import React from "react";
import MarketingForm from "../_components/marketing-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { homeBreadcrumbs, homeTabs } from "../../../constants";
import Tabs from "@/components/tabs";

const cat = "marketing";
const lastBread = homeBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/my/${cat}`;

const breadcrumbs = [...homeBreadcrumbs[cat], lastBread] ?? [];

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs
        bd={[...breadcrumbs, { name: "Cоздать маркетинг продукт" }]}
      />
      <Tabs links={homeTabs.marketing} />
      <MarketingForm />
    </div>
  );
};

export default AddPage;
