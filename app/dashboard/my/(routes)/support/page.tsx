import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { retrieveApiKey } from "@/lib/server-utils";
import { redirect } from "next/navigation";

import { BACKEND_URL } from "@/lib/server-constants";
import { PAGE_SIZE } from "@/lib/constants";

import Breadcrumbs from "@/components/breadcrumbs";
import Tabs from "@/components/tabs";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import Card from "./_components/card";

import { homeTabs } from "../../nav";
import Link from "next/link";

const Page = async ({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  console.log(searchParams);

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

  let questions: Question[];
  let count: number = 0;

  try {
    const response = await fetch(BACKEND_URL + "/support/get_questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        skip,
        limit: pageSize,
      }),
      next: { tags: ["support_qa"] },
    });

    const { status, content } = await response.json();

    if (status.code != 200) {
      throw new Error("Error loading Support Questions");
    }
    questions = content.questions;
    count = content.count;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

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
          <Link href="support/add"> Создать вопрос</Link>
        </Button>
      </div>

      <div className="flex flex-col space-y-[30px]">
        {count > 0 && questions.map((qa, idx) => <Card key={idx} card={qa} />)}
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

export default Page;
