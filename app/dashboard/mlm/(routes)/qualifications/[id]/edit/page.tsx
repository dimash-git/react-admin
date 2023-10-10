import Breadcrumbs from "@/components/breadcrumbs";

import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import MlmForm from "../../_components/mlm-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

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

  // console.log(res.data);

  if (status.code != 200) return <>Ошибка загрузки поста</>;

  const { qualification } = content;

  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <MlmForm parsed={qualification} />
    </>
  );
};

export default EditPage;
