import Breadcrumbs from "@/components/breadcrumbs";
import MlmForm from "../_components/mlm-form";

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs customLabel="Cоздать квалификацию" />
      <MlmForm />
    </div>
  );
};

export default AddPage;
