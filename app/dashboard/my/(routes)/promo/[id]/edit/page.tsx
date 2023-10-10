import Breadcrumbs from "@/components/breadcrumbs";

import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PromoForm from "../../_components/promo-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const res = await axiosBack.post(
    "/promo/get_promo_material",
    {
      promo_id: id,
    },
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  console.log(res.data);

  if (res.data.status.code != 200) return <>Error Loading Promo</>;

  const { promo_material } = res.data.content;
  // console.log(promo_material);

  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <PromoForm parsed={promo_material} />
    </>
  );
};

export default EditPage;
