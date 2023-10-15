import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { retrieveApiKey } from "@/lib/server-utils";

import { BACKEND_URL } from "@/lib/server-constants";

import Pagination from "@/components/pagination";

import Card from "./_components/card";
import Tabs from "@/components/tabs";
import { mlmTabs } from "../../nav";
import { PAGE_SIZE } from "@/lib/constants";

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

  const pageSize = PAGE_SIZE;
  const skip =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? (parseInt(searchParams.page) - 1) * pageSize
      : 0;
  const currPage =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? parseInt(searchParams.page)
      : 1;

  const response = await fetch(BACKEND_URL + "/user_transfer/get_users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      skip,
      limit: pageSize,
    }),
    next: { tags: ["transfers"] },
  });

  if (!response.ok) {
    return <div>Ошибка загрузки списка</div>;
  }

  const { content } = await response.json();

  console.log(content);

  const { transfers, count }: { transfers: Mlm[]; count: number } = content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Tabs links={mlmTabs.mlm} />
      <div className="flex flex-col space-y-[30px]">
        {transfers ? (
          transfers.map((qual, idx) => <Card key={idx} card={qual} />)
        ) : (
          <div>Пусто</div>
        )}
      </div>

      {/* PAGINATION */}
      {transfers?.length > 0 && (
        <Pagination count={count} currPage={currPage} pageSize={pageSize} />
      )}
    </div>
  );
};

export default Page;
