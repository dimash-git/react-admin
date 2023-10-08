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
  // GET SESSION INFO
  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const pageSize = Math.floor(8 / 2); // instead of 8, get half for each type of appeals
  const skip =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? (parseInt(searchParams.page) - 1) * pageSize
      : 0;
  const currPage =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? parseInt(searchParams.page)
      : 1;

  let appeals: AppealList[] = [];
  let count: number = 0;
  try {
    const fixed_response = await fetch(
      BACKEND_URL + "/p2p_appeal/get_fixed_appeals",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
        body: JSON.stringify({
          skip,
          limit: pageSize,
        }),
        next: { tags: ["fixed_appeals"] },
      }
    );

    if (!fixed_response.ok) {
      throw new Error("Не удалось получить закфиксированные апелляции");
    }

    const non_fixed_response = await fetch(
      BACKEND_URL + "/p2p_appeal/get_appeals",
      {
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
        next: { tags: ["non_fixed_appeals"] },
      }
    );

    if (!non_fixed_response.ok) {
      throw new Error("Не удалось получить незакфиксированные апелляции");
    }

    // Combine fixed and non fixed appeals.
    // There was a need for backend devs to make separate endpoint not single
    const non_fixed_data = await non_fixed_response.json();
    const fixed_data = await fixed_response.json();

    const fixedAppeals = fixed_data.content.appeals.map((appeal: Appeal) => ({
      ...appeal,
      is_fixed: true,
    }));

    appeals = [...non_fixed_data.content.appeals, ...fixedAppeals];
    appeals.sort((a, b) => b.create_timestamp - a.create_timestamp);

    count = non_fixed_data.content.count + fixed_data.content.count;

    console.log("count =", count, pageSize);
  } catch (error: unknown) {
    return <div>Ошибка загрузки списка: {String(error)}</div>;
  }

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <Tabs links={p2pTabs.appeals_complaints} />

      <div className="flex flex-col space-y-[30px]">
        {appeals.map((appeal, idx) => (
          <Card key={idx} card={appeal} />
        ))}
      </div>

      {/* PAGINATION */}
      {count > 0 && (
        <Pagination count={count} currPage={currPage} pageSize={pageSize * 2} />
      )}
    </div>
  );
};

export default Page;
