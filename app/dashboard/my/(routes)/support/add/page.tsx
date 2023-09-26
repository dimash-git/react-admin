import React from "react";

import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import { homeBreadcrumbs, homeTabs } from "@/app/dashboard/my/constants";
import QAForm from "../_components/qa-form";

const cat = "support";
const lastBread = homeBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/my/${cat}/cats`;

const breadcrumbs = [...homeBreadcrumbs[cat], lastBread] ?? [];

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs
        bd={[...breadcrumbs, { name: "Короткий вопрос - Создание" }]}
      />
      <QAForm />
    </div>
  );
};

export default AddPage;
