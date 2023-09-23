import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { homeBreadcrumbs } from "@/app/dashboard/my/constants";
import Form from "../../_components/marketing-form";

const cat = "marketing";
const lastBread = homeBreadcrumbs[cat].pop() ?? { name: "nowhere" };
lastBread.to = `/dashboard/my/${cat}`;

const breadcrumbs = [...homeBreadcrumbs[cat], lastBread] ?? [];

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const res = await axiosBack.post(
    "/marketing/get_single_marketing",
    {
      marketing_id: id,
    },
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  // console.log(res.data);

  if (res.data.status.code != 200) return <>Error Loading Marketing</>;

  const { single_marketing } = res.data.content;

  return (
    <>
      <Breadcrumbs bd={[...breadcrumbs, { name: `${id} - Редактирование` }]} />
      <Form parsed={single_marketing} />
    </>
  );
};

export default EditPage;
