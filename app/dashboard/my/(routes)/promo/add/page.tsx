import PromoForm from "../_components/promo-form";
import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import { homeTabs } from "../../../nav";

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs customLabel="Cоздать промо материал" />
      <Tabs links={homeTabs.promo} />
      <PromoForm />
    </div>
  );
};

export default AddPage;
