import NavSection from "@/components/nav-section";

import { panelSections } from "./nav";
import WalletSection from "./wallet-section";
import ClauseSection from "./clause-section";
import CoefSection from "./coef-section";

const ParametersPage = () => {
  return (
    <>
      <div className="max-w-[508px] w-full">
        <NavSection section={panelSections.acc} />
        <ClauseSection />
      </div>
      <div className="max-w-[508px] w-full">
        <WalletSection />
        <CoefSection />
      </div>
    </>
  );
};

export default ParametersPage;
