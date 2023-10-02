import Breadcrumbs from "@/components/breadcrumbs";

import { retrieveApiKey } from "@/lib/serverUtils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import ProductForm from "../../_components/product-form";
import { BACKEND_URL } from "@/lib/serverConstants";
import Container from "@/components/container";

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
  // console.log(data);

  const { status, content } = data;

  if (status.code != 200) return <div>Ошибка загрузки поста</div>;

  const { product } = content;

  return (
    <Container>
      <div className="flex flex-col space-y-[30px]">
        <Breadcrumbs customLabel={`${id} - Редактирование`} slice={2} />
        <ProductForm parsed={product} />
      </div>
    </Container>
  );
};

export default EditPage;
