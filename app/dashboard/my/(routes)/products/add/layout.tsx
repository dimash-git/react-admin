import { ProductProvider } from "../_components/products-provider";

const AddTagLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProductProvider>{children}</ProductProvider>;
};

export default AddTagLayout;
