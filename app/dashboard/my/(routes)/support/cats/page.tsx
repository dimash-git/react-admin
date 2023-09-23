import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { retrieveApiKey } from "@/lib/serverUtils";

import Breadcrumbs from "@/components/breadcrumbs";

import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import { BACKEND_URL } from "@/lib/serverConstants";
import { homeBreadcrumbs, homeTabs } from "../../../constants";
import CatCard from "./_components/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SubCategoriesPage = async ({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  console.log(searchParams);

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

  const { categories, count }: { categories: SupCategories[]; count: number } =
    content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={homeBreadcrumbs.support} />
      <Tabs links={homeTabs.support} />
      <Link href="cats/add">
        <Button variant="formSubmit">Создать категорию</Button>
      </Link>
      <div className="flex flex-col space-y-[30px]">
        {categories.map((cat, idx) => (
          <CatCard key={idx} card={cat} />
        ))}
      </div>
      <div>
        <Pagination count={count} currPage={currPage} pageSize={pageSize} />
      </div>
    </div>
  );
};

export default SubCategoriesPage;
