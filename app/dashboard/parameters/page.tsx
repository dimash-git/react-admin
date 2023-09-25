import NavSection from "@/components/nav-section";

import { paramSections } from "./nav";
import AcademySection from "./academy-section";

const MyPage = () => {
  return (
    <>
      <div className="max-w-[723px] w-full">
        <NavSection section={paramSections.fiat} />
        <NavSection section={paramSections.bank} />
        <NavSection section={paramSections.tradingview} />
      </div>
      <div className="max-w-[293px] w-full">
        <AcademySection />
        <NavSection section={paramSections.countries} />
      </div>
    </>
  );
};

export default MyPage;
