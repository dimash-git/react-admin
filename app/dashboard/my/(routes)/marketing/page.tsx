import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";

import { BACKEND_URL } from "@/lib/server-constants";
import { PAGE_SIZE } from "@/lib/constants";

import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import Card from "./_components/card";

import { homeTabs } from "../../nav";
import { redirect } from "next/navigation";

const MarketingPage = async ({
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

  const pageSize = PAGE_SIZE;
  const skip =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? (parseInt(searchParams.page) - 1) * pageSize
      : 0;
  const currPage =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? parseInt(searchParams.page)
      : 1;

  let marketing: Marketing[];
  let count: number = 0;
  try {
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

    const { status, content } = await response.json();
    if (status.code !== 200) {
      throw new Error("Error Loading Marketing Products");
    }

    marketing = content.marketing;
    count = content.count;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <Tabs links={homeTabs.marketing} />
      <div className="flex flex-col space-y-[30px]">
        {count > 0 &&
          marketing.map((singleMarketing, idx) => (
            <Card key={idx} card={singleMarketing} />
          ))}
      </div>
      {count > 0 && (
        <Pagination
          postsCount={count}
          active={currPage}
          postsPerPage={pageSize}
        />
      )}
    </div>
  );
};

export default MarketingPage;
