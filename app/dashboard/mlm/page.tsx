import { redirect } from "next/navigation";
import { mlmBaseUrl } from "./nav";

const MlmPage = () => {
  redirect(`${mlmBaseUrl}/qualifications`);
};

export default MlmPage;
