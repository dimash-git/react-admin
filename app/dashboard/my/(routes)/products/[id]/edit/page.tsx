import { retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import { BACKEND_URL } from "@/lib/server-constants";

import Container from "@/components/container";
import Breadcrumbs from "@/components/breadcrumbs";
import ProductForm from "../../_components/product-form";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let product: Product;
  try {
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

    const { status, content } = await response.json();

    if (status.code != 200) {
      throw new Error("Error loading Product");
    }

    product = content.product;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }
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
