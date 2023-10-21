import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import Breadcrumbs from "@/components/breadcrumbs";
import PromoForm from "../../_components/promo-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let promo_material;
  try {
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
    const { status, content } = res.data;

    if (status.code !== 200) {
      throw new Error("Error Loading Promo Material");
    }

    promo_material = content.promo_material;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }
  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <PromoForm parsed={promo_material} />
    </>
  );
};

export default EditPage;
