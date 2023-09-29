import ProductForm from "../_components/product-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { homeTabs } from "../../../nav";
import Tabs from "@/components/tabs";

const AddPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs customLabel="Cоздать продукт" />
      <Tabs links={homeTabs.products} />
      <ProductForm />
    </div>
  );
};

export default AddPage;
