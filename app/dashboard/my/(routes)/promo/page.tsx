import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { retrieveApiKey } from "@/lib/server-utils";

import Breadcrumbs from "@/components/breadcrumbs";
import PromoCard from "./_components/card";
import { homeTabs } from "../../nav";
import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import { BACKEND_URL } from "@/lib/server-constants";
import { PAGE_SIZE } from "@/lib/constants";

const EventsPage = async ({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  console.log(searchParams);

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

  const response = await fetch(BACKEND_URL + "/promo/get_promo_materials", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      skip,
      limit: pageSize,
    }),
    next: { tags: ["promos"] },
  });

  if (!response.ok) {
    throw new Error("Error Loading Promo Materials");
  }

  const { status, content } = await response.json();

  if (status.code !== 200) {
    throw new Error("Error Loading Promo Materials");
  }

  const {
    promo_materials,
    count,
  }: { promo_materials: Promo[]; count: number } = content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <Tabs links={homeTabs.promo} />
      <div className="flex flex-col space-y-[30px]">
        {promo_materials.map((promo, idx) => (
          <PromoCard key={idx} card={promo} />
        ))}
      </div>
      <div>
        <Pagination
          postsCount={count}
          active={currPage}
          postsPerPage={pageSize}
        />
      </div>
    </div>
  );
};

export default EventsPage;
