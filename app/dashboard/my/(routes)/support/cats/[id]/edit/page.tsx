import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Breadcrumbs from "@/components/breadcrumbs";
import CatsForm from "../../_components/сats-form";
import { redirect } from "next/navigation";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let category: QuestionCat;
  try {
    const res = await axiosBack.post(
      "/support/get_category",
      {
        category_id: id,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    const { status, content } = res.data;

    if (status.code != 200) {
      throw new Error("Error loading Support Question Category");
    }

    category = content.category;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <CatsForm parsed={category} />
    </>
  );
};

export default EditPage;
