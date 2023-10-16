import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import BoughtProducts from "./_components/bought-products";

const UserBoughtPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let products: UserBought[];

  try {
    const res = await axiosBack.post(
      "/user/product/get_bought_product",
      {
        user_id: id,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    // console.log(res.data);

    const { status, content } = res.data;

    if (status.code != 200) {
      throw new Error("Error loading Bought Products for user");
    }

    products = content.product;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return <BoughtProducts products={products} />;
};

export default UserBoughtPage;
