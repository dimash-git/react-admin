import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { retrieveApiKey } from "@/lib/server-utils";
import { redirect } from "next/navigation";

import { BACKEND_URL } from "@/lib/server-constants";
import { PAGE_SIZE } from "@/lib/constants";

import Breadcrumbs from "@/components/breadcrumbs";
import Pagination from "@/components/pagination";
import Card from "./_components/card";
import AddFiat from "./_components/add-fiat";

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

  const pageSize = PAGE_SIZE;
  const skip =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? (parseInt(searchParams.page) - 1) * pageSize
      : 0;
  const currPage =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? parseInt(searchParams.page)
      : 1;

  let fiats: Fiat[];
  let count: number = 0;

  try {
    const response = await fetch(BACKEND_URL + "/fiat/get_fiats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        skip,
        limit: pageSize,
      }),
      next: { tags: ["fiats"] },
    });

    const { status, content } = await response.json();
    if (status.code !== 200) {
      throw new Error("Error Loading Fiat");
    }

    fiats = content.fiats;
    count = content.count;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }
  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <AddFiat />
      <div className="flex flex-col space-y-[30px]">
        {count > 0 && fiats.map((fiat, idx) => <Card key={idx} card={fiat} />)}
      </div>

      {/* PAGINATION */}
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

export default Page;
