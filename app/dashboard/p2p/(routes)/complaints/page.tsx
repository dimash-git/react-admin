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

  let complaints: ComplaintList[] = [];
  let count: number = 0;
  try {
    const fixed_response = await fetch(
      BACKEND_URL + "/p2p_complain/get_fixed_complains",
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
        next: { tags: ["fixed_complaints"] },
      }
    );

    if (!fixed_response.ok) {
      throw new Error("Не удалось получить закфиксированные жалобы");
    }

    const non_fixed_response = await fetch(
      BACKEND_URL + "/p2p_complain/get_complains",
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
        next: { tags: ["non_foxed_complaints"] },
      }
    );

    if (!non_fixed_response.ok) {
      throw new Error("Не удалось получить незакфиксированные жалобы");
    }

    // Combine fixed and non fixed appeals.
    // There was a need for backend devs to make separate endpoint not single
    const non_fixed_data = await non_fixed_response.json();
    const fixed_data = await fixed_response.json();

    complaints = [
      ...non_fixed_data.content.complains,
      ...fixed_data.content.complains,
    ];

    console.log(complaints);

    count = non_fixed_data.content.count + fixed_data.content.count;

    complaints.sort((a, b) => b.create_timestamp - a.create_timestamp);
  } catch (error: unknown) {
    return <div>Ошибка загрузки списка: {String(error)}</div>;
  }
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <Tabs links={p2pTabs.appeals_complaints} />
      <div className="flex flex-col space-y-[30px]">
        {complaints.map((complaint, idx) => (
          <Card key={idx} card={complaint} />
        ))}
      </div>

      {/* PAGINATION */}
      <div>
        {/* <Pagination count={count} currPage={currPage} pageSize={pageSize} /> */}
      </div>
    </div>
  );
};

export default Page;
