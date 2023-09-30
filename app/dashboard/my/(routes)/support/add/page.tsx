import Breadcrumbs from "@/components/breadcrumbs";
import QAForm from "../_components/qa-form";

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs customLabel="Короткий вопрос - Создание" />
      <QAForm />
    </div>
  );
};

export default AddPage;
