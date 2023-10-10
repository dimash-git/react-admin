import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { retrieveApiKey } from "@/lib/server-utils";

import Breadcrumbs from "@/components/breadcrumbs";
import { homeTabs } from "../../nav";
import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import { BACKEND_URL } from "@/lib/server-constants";
import ProductCard from "./_components/card";
import Container from "@/components/container";

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

  const pageSize = 3;
  const skip =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? (parseInt(searchParams.page) - 1) * pageSize
      : 0;
  const currPage =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? parseInt(searchParams.page)
      : 1;

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

  const { status, content } = await response.json();

  if (status.code !== 200) {
    throw new Error("Error Loading Products");
  }

  // console.log(content);

  const { products, count }: { products: Product[]; count: number } = content;

  return (
    <Container>
      <div className="h-fit flex flex-col space-y-[30px]">
        <Breadcrumbs />
        <Tabs links={homeTabs.products} />
        <div className="flex flex-col space-y-[30px]">
          {products.map((product, idx) => (
            <ProductCard key={idx} card={product} />
          ))}
        </div>
        <div>
          <Pagination count={count} currPage={currPage} pageSize={pageSize} />
        </div>
      </div>
    </Container>
  );
};

export default MarketingPage;
