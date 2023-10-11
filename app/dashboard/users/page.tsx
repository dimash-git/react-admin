import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { BACKEND_URL } from "@/lib/server-constants";
import { PAGE_SIZE } from "@/lib/constants";
import { retrieveApiKey } from "@/lib/server-utils";

import Pagination from "@/components/pagination";
import Card from "./_components/card";

const UsersPage = async ({
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

  const response = await fetch(BACKEND_URL + "/main/user/get_users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      skip,
      limit: pageSize,
    }),
    next: { tags: ["users"] },
  });

  const { status, content } = await response.json();

  if (status.code !== 200) {
    throw new Error("Error Loading Marketing Products");
  }

  console.log(content);

  const { users, count }: { users: any[]; count: number } = content;

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <div className="flex flex-col space-y-[30px]">
        {users.map((user, idx) => (
          <Card key={idx} card={user} />
        ))}
      </div>
      <div>
        <Pagination count={count} currPage={currPage} pageSize={pageSize} />
      </div>
    </div>
  );
};

export default UsersPage;
