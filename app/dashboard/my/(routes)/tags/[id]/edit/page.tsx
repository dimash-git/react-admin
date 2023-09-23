import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TagsForm from "../../../tags/_components/tag-form";
import { homeBreadcrumbs } from "@/app/dashboard/my/constants";

const cat = "tags";
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

  console.log(res.data);

  if (res.data.status.code != 200) return <>Error Loading Tag</>;

  const { tag } = res.data.content;

  return (
    <div>
      <Breadcrumbs bd={[...breadcrumbs, { name: `${id} - Редактирование` }]} />
      <TagsForm parsed={tag} />
    </div>
  );
};

export default EditPage;
