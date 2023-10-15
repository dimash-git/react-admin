import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BoughtProductCard from "./_components/bought-product-card";

const UserProductPage = async ({ params }: { params: { id: string } }) => {
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

    console.log(res.data);

    const { status, content } = res.data;

    if (status.code != 200) {
      throw new Error("Error loading Bought Products for user");
    }

    products = content.product;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-x-[30px] gap-y-[30px]">
        {products.length > 0 &&
          products.map((product, idx) => (
            <BoughtProductCard key={idx} product={product} />
          ))}
        {/* <BoughtProductCard
          product={{
            product_id: "83919424",
            img_uri:
              "https://cdn.generaltradergroup.com/ig/tdgo/pgoqy8pj/uckhonv2sa5oga1b.jpg",
            name: "GT Classic +",
            description:
              "Агрессивная версия Мультивалютной торговой системы из классической линейки, которая идеально подойдет как начинающему инвестору, так и опытному трейдеру!",
            advantage: [
              "Работает по 5 валютным парам",
              "Работает по 5 валютным парам",
              "Работает по 5 валютным парам",
              "Работает по 5 валютным парам",
            ],
            discount: 10,
            is_pack: true,
            is_robot: true,
          }}
        /> */}
      </div>
    </>
  );
};

export default UserProductPage;
