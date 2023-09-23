import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NewsForm from "../../_components/news-form";
import { homeBreadcrumbs } from "@/app/dashboard/my/constants";

const cat = "news";
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
    "/news/get_single_news",
    {
      news_id: id,
    },
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  // console.log(res.data);

  if (res.data.status.code != 200) return <>Error Loading Single News</>;

  const { news } = res.data.content;
  // console.log(news);

  return (
    <div>
      <Breadcrumbs bd={[...breadcrumbs, { name: `${id} - Редактирование` }]} />
      <NewsForm parsed={news} />
    </div>
  );
};

export default EditPage;
