import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { retrieveApiKey } from "@/lib/server-utils";

import Breadcrumbs from "@/components/breadcrumbs";

import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import { BACKEND_URL } from "@/lib/server-constants";
import { homeTabs } from "../../../nav";
import Card from "./_components/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PAGE_SIZE } from "@/lib/constants";

const SubCategoriesPage = async ({
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

  const response = await fetch(BACKEND_URL + "/support/get_categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      skip,
      limit: pageSize,
    }),
    next: { tags: ["support_cats"] },
  });

  if (!response.ok) {
    throw new Error("Error Loading Categories");
  }

  const { status, content } = await response.json();

  if (status.code !== 200) {
    throw new Error("Error Loading Categories");
  }

  const { categories, count }: { categories: QuestionCat[]; count: number } =
    content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />
      <Tabs links={homeTabs.support} />

      <div>
        <Button
          asChild
          variant="formSubmit"
          size="md"
          className="text-[16px] h-10"
        >
          <Link href="cats/add"> Создать категорию </Link>
        </Button>
      </div>

      <div className="flex flex-col space-y-[30px]">
        {categories.map((cat, idx) => (
          <Card key={idx} card={cat} />
        ))}
      </div>
      <div>
        <Pagination
          postsCount={count}
          active={currPage}
          postsPerPage={pageSize}
        />
      </div>
    </div>
  );
};

export default SubCategoriesPage;
