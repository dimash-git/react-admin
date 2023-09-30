import ProductForm from "../_components/product-form";
import Breadcrumbs from "@/components/breadcrumbs";
import { homeTabs } from "../../../nav";
import Tabs from "@/components/tabs";
import Container from "@/components/container";

const AddPage = () => {
  return (
    <Container>
      <div className="h-fit flex flex-col space-y-[30px]">
        <Breadcrumbs customLabel="Cоздать продукт" />
        <Tabs links={homeTabs.products} />
        <ProductForm />
      </div>
    </Container>
  );
};

export default AddPage;
