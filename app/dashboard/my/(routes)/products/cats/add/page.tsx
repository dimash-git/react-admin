import Breadcrumbs from "@/components/breadcrumbs";
import { homeBreadcrumbs } from "@/app/dashboard/my/constants";
import CatsForm from "../_components/сats-form";

const cat = "products";
const lastBread = homeBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/my/${cat}`;

const breadcrumbs = [...homeBreadcrumbs[cat], lastBread] ?? [];

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={[...breadcrumbs, { name: "Категория - Создание" }]} />
      <CatsForm />
    </div>
  );
};

export default AddPage;
