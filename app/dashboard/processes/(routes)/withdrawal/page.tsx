import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { retrieveApiKey } from "@/lib/server-utils";
import { redirect } from "next/navigation";

import { BACKEND_URL } from "@/lib/server-constants";

import Breadcrumbs from "@/components/breadcrumbs";
import Pagination from "@/components/pagination";

import Card from "./_components/card";
import { PAGE_SIZE } from "@/lib/constants";

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

  const response = await fetch(
    BACKEND_URL + "/withdrawal/get_withdrawal_invoice",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        skip,
        limit: pageSize,
      }),
      next: { tags: ["withdrawals"] },
    }
  );

  if (!response.ok) {
    return <div>Ошибка загрузки списка</div>;
  }

  const { content } = await response.json();

  // console.log(content);

  const {
    withdrawal_invoice,
    count,
  }: { withdrawal_invoice: WithdrawalInvoice[]; count: number } = content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <Breadcrumbs />

      <div className="flex flex-col space-y-[30px]">
        {withdrawal_invoice?.map((invoice, idx) => (
          <Card key={idx} card={invoice} />
        ))}
      </div>

      {/* PAGINATION */}
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

export default Page;
