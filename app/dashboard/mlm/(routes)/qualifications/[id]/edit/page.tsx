import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs";
import MlmForm from "../../_components/mlm-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let qualification: Mlm;
  try {
    const res = await axiosBack.post(
      "/mlm/get_qualification",
      {
        qualification_id: id,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    const { content, status } = res.data;
    if (status.code !== 200) {
      throw new Error("Error Loading Mlm Qualification");
    }

    qualification = content.qualification;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <MlmForm parsed={qualification} />
    </>
  );
};

export default EditPage;
