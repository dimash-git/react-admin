import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PromoForm from "../../_components/promo-form";

const breadcrumbs = [
  {
    to: "/dashboard/my",
    name: "Главная",
  },
  {
    to: "/dashboard/my/promo",
    name: "Промо материалы",
  },
];

const SingleEventEditPage = async ({ params }: { params: { id: string } }) => {
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

  return (
    <div>
      <Breadcrumbs bd={[...breadcrumbs, { name: `${id} - Редактирование` }]} />
      <PromoForm parsed={promo_material} />
    </div>
  );
};

export default SingleEventEditPage;
