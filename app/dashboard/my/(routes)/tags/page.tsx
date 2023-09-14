import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { retrieveApiKey } from "@/lib/serverUtils";

import Breadcrumbs from "@/components/breadcrumbs";
import { homeBreadcrumbs, homeTabs } from "../../constants";
import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import { BACKEND_URL } from "@/lib/serverConstants";
import TagsCard from "./_components/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TagsPage = async ({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  const pageSize = 3;
  const skip =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? (parseInt(searchParams.page) - 1) * pageSize
      : 0;
  const currPage =
    searchParams && searchParams.page && !Array.isArray(searchParams.page)
      ? parseInt(searchParams.page)
      : 1;

  const response = await fetch(BACKEND_URL + "/news/get_tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      skip,
      limit: pageSize,
    }),
    next: { tags: ["tags"] },
  });

  if (!response.ok) {
    throw new Error("Error Loading Tags");
  }

  const { status, content } = await response.json();

  if (status.code !== 200) {
    throw new Error("Error Loading Tags");
  }

  const { tags, count }: { tags: Tags[]; count: number } = content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={homeBreadcrumbs.tags} />
      <Tabs links={homeTabs.news} />
      <Link href="tags/add">
        <Button variant="formSubmit">Создать тэг</Button>
      </Link>
      <div className="flex flex-col space-y-[30px]">
        {tags.map((tag, idx) => (
          <TagsCard key={idx} card={tag} />
        ))}
      </div>
      <div>
        <Pagination count={count} currPage={currPage} pageSize={pageSize} />
      </div>
    </div>
  );
};

export default TagsPage;
