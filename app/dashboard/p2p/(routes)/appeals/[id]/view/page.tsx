import Breadcrumbs from "@/components/breadcrumbs";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const ViewPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id);

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const res = await axiosBack.post(
    "/p2p_appeal/get_appeal",
    {
      appeal_id: id,
    },
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );
  console.log(res.data);

  const { content, status } = res.data;

  // console.log(res.data);

  if (status.code != 200) return <>Ошибка загрузки поста</>;

  // const { qualification } = content;

  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
    </>
  );
};

export default ViewPage;
