import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { retrieveApiKey } from "@/lib/server-utils";
import { redirect } from "next/navigation";

import { BACKEND_URL } from "@/lib/server-constants";
import { PAGE_SIZE } from "@/lib/constants";

import Breadcrumbs from "@/components/breadcrumbs";
import Pagination from "@/components/pagination";
import Tabs from "@/components/tabs";
import Card from "./_components/card";

import { p2pTabs } from "../../nav";

const Page = async ({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const pageSize = Math.floor(PAGE_SIZE / 2); // instead of 8, get half for each type of appeals
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
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <Tabs links={p2pTabs.appeals_complaints} />

      <div className="flex flex-col space-y-[30px]">
        {count > 0 &&
          appeals.map((appeal, idx) => <Card key={idx} card={appeal} />)}
      </div>

      {/* PAGINATION */}
      {count > 0 && (
        <Pagination
          postsCount={count}
          active={currPage}
          postsPerPage={pageSize * 2}
        />
      )}
    </div>
  );
};

export default Page;
