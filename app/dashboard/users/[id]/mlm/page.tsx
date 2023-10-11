import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const UserMainPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let user: User;

  // try {
  //   const res = await axiosBack.post(
  //     "/user/main_info/get_main_info",
  //     {
  //       user_id: id,
  //     },
  //     {
  //       headers: {
  //         Authorization: apiKey,
  //       },
  //     }
  //   );

  //   console.log(res.data);

  //   const { status, content } = res.data;

  //   if (status.code != 200) {
  //     throw new Error("Error loading Main Info for user");
  //   }

  //   user = content.user;
  //   console.log(user);
  // } catch (error) {
  //   console.error(error);
  //   return <>{String(error)}</>;
  // }

  return <></>;
};

export default UserMainPage;
