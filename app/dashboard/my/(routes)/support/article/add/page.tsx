import Breadcrumbs from "@/components/breadcrumbs";
import CatsForm from "../_components/article-form";

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs customLabel="Категория - Создание" />
      <CatsForm />
    </div>
  );
};

export default AddPage;
