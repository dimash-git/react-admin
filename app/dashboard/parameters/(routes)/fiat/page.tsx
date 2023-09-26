import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { retrieveApiKey } from "@/lib/serverUtils";

import { BACKEND_URL } from "@/lib/serverConstants";

import Breadcrumbs from "@/components/breadcrumbs";
import Pagination from "@/components/pagination";
import ModalPost from "@/components/modal-post";

import { paramBreadcrumbs } from "../../nav";
import Card from "./_components/card";
import FiatForm from "./_components/fiat-form";
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

  if (!response.ok) {
    return <div>Ошибка загрузки списка</div>;
  }

  const { content } = await response.json();

  // console.log(content);

  const { fiats, count }: { fiats: Fiat[]; count: number } = content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs bd={paramBreadcrumbs.fiat} />
      <div className="max-w-[200px]">
        <ModalPost Form={FiatForm} title="Добавить фиат">
          <Button
            asChild
            variant="formSubmit"
            size="md"
            className="text-[16px] h-[40px]"
          >
            <span>Добавить фиат</span>
          </Button>
        </ModalPost>
      </div>
      <div className="flex flex-col space-y-[30px]">
        {fiats.map((fiat, idx) => (
          <Card key={idx} card={fiat} />
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
