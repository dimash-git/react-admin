import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { retrieveApiKey } from "@/lib/server-utils";
import { redirect } from "next/navigation";

import { BACKEND_URL } from "@/lib/server-constants";
import { PAGE_SIZE } from "@/lib/constants";

import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import Tabs from "@/components/tabs";

import Card from "./_components/card";
import { mlmTabs } from "../../nav";
import Link from "next/link";

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

  let qualifications: MlmList[];
  let count: number = 0;

  try {
    const response = await fetch(BACKEND_URL + "/mlm/get_qualifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        skip,
        limit: pageSize,
      }),
      next: { tags: ["mlm"] },
    });

    const { status, content } = await response.json();
    if (status.code !== 200) {
      throw new Error("Error Loading Mlm Qualifications");
    }

    qualifications = content.qualifications;
    count = content.count;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Tabs links={mlmTabs.mlm} />
      <div>
        <Button
          asChild
          variant="formSubmit"
          size="md"
          className="text-[16px] h-10"
        >
          <Link href="qualifications/add"> Добавить квалификацию</Link>
        </Button>
      </div>

      <div className="flex flex-col space-y-[30px]">
        {count > 0 &&
          qualifications.map((qual, idx) => <Card key={idx} card={qual} />)}
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
