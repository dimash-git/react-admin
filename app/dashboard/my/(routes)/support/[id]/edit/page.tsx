import Breadcrumbs from "@/components/breadcrumbs";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import CatsForm from "../../_components/qa-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

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

  if (res.data.status.code != 200) return <>Error Loading Category</>;

  const { category } = res.data.content;

  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <CatsForm parsed={category} />
    </>
  );
};

export default EditPage;
