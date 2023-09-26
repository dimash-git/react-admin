import React from "react";
import ProductsForm from "../_components/products-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { homeBreadcrumbs, homeTabs } from "../../../constants";
import Tabs from "@/components/tabs";

const cat = "products";
const lastBread = homeBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/my/${cat}`;

const breadcrumbs = [...homeBreadcrumbs[cat], lastBread] ?? [];

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={[...breadcrumbs, { name: "Cоздать продукт" }]} />
      <Tabs links={homeTabs.products} />
      <ProductsForm />
    </div>
  );
};

export default AddPage;
