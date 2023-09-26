import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { retrieveApiKey } from "@/lib/serverUtils";

import { BACKEND_URL } from "@/lib/serverConstants";

import Breadcrumbs from "@/components/breadcrumbs";
import Pagination from "@/components/pagination";
import ModalPost from "@/components/modal-post";

import { paramBreadcrumbs } from "../../nav";
import Card from "./_components/card";
import BankForm from "./_components/bank-form";
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

  const response = await fetch(BACKEND_URL + "/bank/get_banks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      skip,
      limit: pageSize,
    }),
    next: { tags: ["banks"] },
  });

  if (!response.ok) {
    return <div>Ошибка загрузки списка</div>;
  }

  const { content } = await response.json();

  // console.log(content);

  const { banks, count }: { banks: Bank[]; count: number } = content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={paramBreadcrumbs.bank} />
      <div className="max-w-[200px]">
        <ModalPost Form={BankForm} title="Добавить банк">
          <Button
            asChild
            variant="formSubmit"
            size="md"
            className="text-[16px] h-10"
          >
            <span>Добавить банк</span>
          </Button>
        </ModalPost>
      </div>
      <div className="flex flex-col space-y-[30px]">
        {banks.map((bank, idx) => (
          <Card key={idx} card={bank} />
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
