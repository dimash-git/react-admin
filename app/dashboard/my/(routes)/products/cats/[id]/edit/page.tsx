import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { homeBreadcrumbs } from "@/app/dashboard/my/constants";
import CatsForm from "../../_components/сats-form";

const cat = "products";
const lastBread = homeBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/my/${cat}/cats`;

const breadcrumbs = [...homeBreadcrumbs[cat], lastBread] ?? [];

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const res = await axiosBack.post(
    "/product/get_category",
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
      <Breadcrumbs bd={[...breadcrumbs, { name: `${id} - Редактирование` }]} />
      <CatsForm parsed={category} />
    </>
  );
};

export default EditPage;
