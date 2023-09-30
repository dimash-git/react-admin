import { ProductProvider } from "../_components/products-provider";

const AddPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProductProvider>{children}</ProductProvider>;
};

export default AddPageLayout;
