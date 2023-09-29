import MarketingForm from "../_components/marketing-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { homeTabs } from "../../../nav";
import Tabs from "@/components/tabs";

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs customLabel="Cоздать маркетинг продукт" />
      <Tabs links={homeTabs.marketing} />
      <MarketingForm />
    </div>
  );
};

export default AddPage;
