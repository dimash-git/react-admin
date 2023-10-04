import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { retrieveApiKey } from "@/lib/serverUtils";

import { BACKEND_URL } from "@/lib/serverConstants";

import Pagination from "@/components/pagination";

import Card from "./_components/card";
import Tabs from "@/components/tabs";
import { mlmTabs } from "./nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

  if (!response.ok) {
    return <div>Ошибка загрузки списка</div>;
  }

  const { content } = await response.json();

  // console.log(content);

  const {
    qualifications,
    count,
  }: { qualifications: MlmList[]; count: number } = content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Tabs links={mlmTabs.mlm} />
      <Link href="mlm/add">
        <Button variant="formSubmit" size="md" className="text-[16px] h-10">
          Добавить квалификацию
        </Button>
      </Link>
      <div className="flex flex-col space-y-[30px]">
        {qualifications.map((qual, idx) => (
          <Card key={idx} card={qual} />
        ))}
      </div>

      {/* PAGINATION */}
      <div>
        <Pagination count={count} currPage={currPage} pageSize={pageSize} />
      </div>
    </div>
  );
};

export default Page;
