import React from "react";
import ClauseSettingsForm from "./_components/clause-settings-form";
import Breadcrumbs from "@/components/breadcrumbs";

const ClauseSettingsPage = () => {
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <ClauseSettingsForm />
    </div>
  );
};

export default ClauseSettingsPage;
