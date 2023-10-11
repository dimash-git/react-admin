import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { BACKEND_URL } from "@/lib/server-constants";
import { PAGE_SIZE } from "@/lib/constants";
import { retrieveApiKey } from "@/lib/server-utils";

import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import Card from "./_components/card";
import { homeTabs } from "../../nav";

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

  const response = await fetch(BACKEND_URL + "/marketing/get_marketing", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      skip,
      limit: pageSize,
    }),
    next: { tags: ["marketing"] },
  });

  if (!response.ok) {
    throw new Error("Error Loading Marketing Products");
  }

  const { status, content } = await response.json();

  if (status.code !== 200) {
    throw new Error("Error Loading Marketing Products");
  }

  const { marketing, count }: { marketing: Marketing[]; count: number } =
    content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <Tabs links={homeTabs.marketing} />
      <div className="flex flex-col space-y-[30px]">
        {marketing.map((singleMarketing, idx) => (
          <Card key={idx} card={singleMarketing} />
        ))}
      </div>
      <div>
        <Pagination count={count} currPage={currPage} pageSize={pageSize} />
      </div>
    </div>
  );
};

export default MarketingPage;
