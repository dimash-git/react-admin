import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs";
import Form from "../../_components/marketing-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let single_marketing: Marketing;
  try {
    const res = await axiosBack.post(
      "/marketing/get_single_marketing",
      {
        marketing_id: id,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    const { status, content } = res.data;
    if (status.code !== 200) {
      throw new Error("Error Loading Marketing Product");
    }

    single_marketing = content.single_marketing;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <Form parsed={single_marketing} />
    </>
  );
};

export default EditPage;
