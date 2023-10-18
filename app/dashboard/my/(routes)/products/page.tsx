import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { retrieveApiKey } from "@/lib/server-utils";
import { BACKEND_URL } from "@/lib/server-constants";

import Breadcrumbs from "@/components/breadcrumbs";
import Container from "@/components/container";
import Pagination from "@/components/pagination";
import Tabs from "@/components/tabs";

import Card from "./_components/card";
import { homeTabs } from "../../nav";
import { PAGE_SIZE } from "@/lib/constants";

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

  const pageSize = PAGE_SIZE;
  const skip =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? (parseInt(searchParams.page) - 1) * pageSize
      : 0;
  const currPage =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? parseInt(searchParams.page)
      : 1;

  let products: Product[];
  let count: number = 0;

  try {
    const response = await fetch(BACKEND_URL + "/product/get_products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        skip,
        limit: pageSize,
      }),
      next: { tags: ["products"] },
    });

    if (!response.ok) {
      throw new Error("Error Loading Products");
    }

    const { content } = await response.json();

    // console.log(content);

    products = content.products;
    count = content.count;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <Container>
      <div className="h-fit flex flex-col space-y-[30px]">
        <Breadcrumbs />
        <Tabs links={homeTabs.products} />
        <div className="flex flex-col space-y-[30px]">
          {products &&
            products.map((product, idx) => <Card key={idx} item={product} />)}
        </div>
        <div>
          <Pagination
            postsCount={count}
            active={currPage}
            postsPerPage={pageSize}
          />
        </div>
      </div>
    </Container>
  );
};

export default MarketingPage;
