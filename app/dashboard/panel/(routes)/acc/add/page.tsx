import Breadcrumbs from "@/components/breadcrumbs";
import AccForm from "../_components/acc-form";

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs customLabel="Добавить аккаунт администратора" />
      <AccForm />
    </div>
  );
};

export default AddPage;
