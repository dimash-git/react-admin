import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";

import { axiosBack, retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { homeBreadcrumbs } from "@/app/dashboard/my/constants";
import Form from "../../_components/products-form";

const cat = "products";
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
    "/product/get_product",
    {
      product_id: id,
    },
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );

  const { status, content } = res.data;
  console.log(content);

  if (status.code != 200) return <>Ошибка загрузки поста</>;

  // const { product } = content;

  return (
    <>
      <Breadcrumbs bd={[...breadcrumbs, { name: `${id} - Редактирование` }]} />
      {/* <Form parsed={product} /> */}
    </>
  );
};

export default EditPage;
