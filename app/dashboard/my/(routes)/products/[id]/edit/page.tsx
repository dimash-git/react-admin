import Breadcrumbs from "@/components/breadcrumbs";
import React from "react";

import { retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { homeBreadcrumbs } from "@/app/dashboard/my/constants";
import Form from "../../_components/products-form";
import { BACKEND_URL } from "@/lib/serverConstants";

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

  const response = await fetch(BACKEND_URL + "/product/get_product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      product_id: id,
    }),
    next: { tags: ["product"] },
  });

  const data = await response.json();

  const { status, content } = data;

  console.log(data);

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
