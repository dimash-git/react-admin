import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { retrieveApiKey } from "@/lib/server-utils";
import { redirect } from "next/navigation";

import { BACKEND_URL } from "@/lib/server-constants";
import { PAGE_SIZE } from "@/lib/constants";

import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import Breadcrumbs from "@/components/breadcrumbs";
import PromoCard from "./_components/card";

import { homeTabs } from "../../nav";

const PromoPage = async ({
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

  let promo_materials: Promo[];
  let count: number;
  try {
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

    const { status, content } = await response.json();

    if (status.code !== 200) {
      throw new Error("Error Loading Promo Material");
    }

    promo_materials = content.promo_materials;
    count = content.count;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <Tabs links={homeTabs.promo} />
      <div className="flex flex-col space-y-[30px]">
        {count > 0 &&
          promo_materials.map((promo, idx) => (
            <PromoCard key={idx} card={promo} />
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

export default PromoPage;
