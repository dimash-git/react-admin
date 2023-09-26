import Breadcrumbs from "@/components/breadcrumbs";
import { mlmBreadcrumbs } from "../nav";
import MlmForm from "../_components/mlm-form";

const cat = "mlm";
const lastBread = mlmBreadcrumbs[cat].pop() ?? { name: "nowhere" };

const breadcrumbs = [...mlmBreadcrumbs[cat], lastBread] ?? [];

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={[...breadcrumbs, { name: "Cоздать квалификацию" }]} />
      <MlmForm />
    </div>
  );
};

export default AddPage;
