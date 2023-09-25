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
          <span className="inline-flex items-center justify-center rounded-[5px] text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-thBlue text-[thGray] text-[12px] leading-[14px] font-bold hover:bg-thBlue/80 h-[39px] py-[10px] px-10">
            Добавить фиат
          </span>
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
