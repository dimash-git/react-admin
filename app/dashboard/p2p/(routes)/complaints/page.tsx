import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { retrieveApiKey } from "@/lib/serverUtils";

import { BACKEND_URL } from "@/lib/serverConstants";

import Breadcrumbs from "@/components/breadcrumbs";
import Pagination from "@/components/pagination";

import Card from "./_components/card";
import Tabs from "@/components/tabs";
import { p2pTabs } from "../../nav";

const Page = async ({
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

  const response = await fetch(BACKEND_URL + "/p2p_complain/get_appeals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      skip,
      limit: pageSize,
      is_fixed: false,
    }),
    next: { tags: ["complaints"] },
  });

  if (!response.ok) {
    return <div>Ошибка загрузки списка</div>;
  }

  const data = await response.json();

  const { status, content } = data;

  console.log(data);

  // const { countries, count }: { countries: Country[]; count: number } = content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <Tabs links={p2pTabs.appeals_complaints} />
      {/* <div className="flex flex-col space-y-[30px]">
        {countries.map((country, idx) => (
          <Card key={idx} card={country} />
        ))}
      </div> */}

      {/* PAGINATION */}
      <div>
        {/* <Pagination count={count} currPage={currPage} pageSize={pageSize} /> */}
      </div>
    </div>
  );
};

export default Page;
