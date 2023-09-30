import { MarketingProvider } from "../_components/marketing-provider";

const AddPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <MarketingProvider>{children}</MarketingProvider>;
};

export default AddPageLayout;
