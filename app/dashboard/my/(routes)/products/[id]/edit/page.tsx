import Breadcrumbs from "@/components/breadcrumbs";

import { retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import ProductForm from "../../_components/product-form";
import { BACKEND_URL } from "@/lib/serverConstants";

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

  const { product } = content;

  return (
    <>
      <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
      <ProductForm parsed={product} />
    </>
  );
};

export default EditPage;
