import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import UserSearch from "./_components/user-search";

const UsersPage = async ({}: { params: { slug: string } }) => {
  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }

  return (
    <div className="h-fit flex flex-col space-y-[30px]">
      <UserSearch />
    </div>
  );
};

export default UsersPage;
