import Breadcrumbs from "@/components/breadcrumbs";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { mlmBreadcrumbs } from "../../nav";
import MlmForm from "../../_components/mlm-form";

const cat = "mlm";
const lastBread = mlmBreadcrumbs[cat].pop() ?? { name: "nowhere" };
const breadcrumbs = [...mlmBreadcrumbs[cat], lastBread] ?? [];

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
      <Breadcrumbs bd={[...breadcrumbs, { name: `${id} - Редактирование` }]} />
      <MlmForm parsed={qualification} />
    </>
  );
};

export default EditPage;
