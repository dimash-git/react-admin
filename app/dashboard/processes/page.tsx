import NavSection from "@/components/nav-section";

import { processSections } from "./nav";
import NotifSection from "./notif-section";
import TranSection from "./tran-section";

const ProcessesPage = () => {
  return (
    <>
      <div className="max-w-[508px] w-full">
        <NotifSection />
        <NavSection section={processSections.withdrawal} />
      </div>
      <div className="max-w-[508px] w-full">
        <NavSection section={processSections.passport} />
        <TranSection />
      </div>
    </>
  );
};

export default ProcessesPage;
