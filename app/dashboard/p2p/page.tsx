import { redirect } from "next/navigation";
import { p2pBaseUrl } from "./nav";

const ParametersPage = () => {
  redirect(`${p2pBaseUrl}/appeals`);
};

export default ParametersPage;
