import { retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dateToUnix } from "@/lib/utils";
import Card from "./_components/card";
import Pagination from "@/components/pagination";
import { PAGE_SIZE } from "@/lib/constants";
import TransactionFilter from "./_components/transaction-filter";
import { BACKEND_URL } from "@/lib/server-constants";
import { redirect } from "next/navigation";

const UserHistoryPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { id } = params;

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

  let transactions: Transaction[];
  let count: number = 0;

  try {
    const response = await await fetch(
      BACKEND_URL + "/user/user_transaction/get_user_transaction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: apiKey,
        },
        body: JSON.stringify({
          user_id: id,
          timestamp_from:
            searchParams?.f ??
            dateToUnix(new Date(Date.now() - 7 * 24 * 3600 * 1000)),
          timestamp_to: searchParams?.t ?? dateToUnix(new Date()),
          type: searchParams?.type ?? "buy",
          status: searchParams?.status ?? "success",
          // from_: "<string>",
          // to_: "<string>",
          skip,
          limit: pageSize,
        }),
        next: { tags: ["transactions"] },
      }
    );

    const data = await response.json();
    const { status, content } = data;

    if (status.code != 200) {
      throw new Error("Error loading Transaction History for user");
    }

    transactions = content.transactions;
    count = transactions.length;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <TransactionFilter />
      <div className="flex flex-col space-y-[30px]">
        {count > 0 ? (
          transactions.map((transaction, idx) => (
            <Card key={idx} card={transaction} />
          ))
        ) : (
          <div>Транзакции не найдены</div>
        )}
      </div>

      {count > 0 && (
        <Pagination
          postsCount={count}
          active={currPage}
          postsPerPage={pageSize}
        />
      )}
    </>
  );
};

export default UserHistoryPage;
