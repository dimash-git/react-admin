import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs";
import TagsForm from "../../_components/tag-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let tag: Tag;
  try {
    const res = await axiosBack.post(
      "/news/get_tag",
      {
        tag_id: id,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    // console.log(res.data);
    const { status, content } = res.data;

    if (status.code != 200) {
      throw new Error("Error loading News Tags");
    }

    tag = content.tag;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <TagsForm parsed={tag} />
    </>
  );
};

export default EditPage;
