import React from "react";
import TagsForm from "../_components/tag-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { homeBreadcrumbs } from "../../../constants";

const cat = "tags";
const lastBread = homeBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/my/${cat}`;

const breadcrumbs = [...homeBreadcrumbs[cat], lastBread] ?? [];

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={[...breadcrumbs, { name: "Cоздать тэг" }]} />
      <TagsForm />
    </div>
  );
};

export default AddPage;
