import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { retrieveApiKey } from "@/lib/serverUtils";

import Breadcrumbs from "@/components/breadcrumbs";

import Pagination from "@/components/pagination";
import { BACKEND_URL } from "@/lib/serverConstants";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const MarketingPage = async ({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const pageSize = 8;
  const skip =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? (parseInt(searchParams.page) - 1) * pageSize
      : 0;
  const currPage =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? parseInt(searchParams.page)
      : 1;

  // const response = await fetch(BACKEND_URL + "/admins/get_admins", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: apiKey,
  //   },
  //   body: JSON.stringify({
  //     skip,
  //     limit: pageSize,
  //   }),
  //   next: { tags: ["acc"] },
  // });

  // const data = await response.json();
  // console.log(data);
  // const { status, content } = data;

  // if (status.code != 200) return <div>Ошибка загрузки списка</div>;

  // const { products, count }: { products: Product[]; count: number } = content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <Link href="acc/add">
        <Button variant="formSubmit" size="md" className="text-[16px] h-10">
          Добавить аккаунт администратора
        </Button>
      </Link>
      <div className="flex flex-col space-y-[30px]">
        {/* {products.map((product, idx) => (
            <ProductCard key={idx} card={product} />
          ))} */}
      </div>
      <div>
        {/* <Pagination count={count} currPage={currPage} pageSize={pageSize} /> */}
      </div>
    </div>
  );
};

export default MarketingPage;
