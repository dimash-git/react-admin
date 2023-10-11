import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const UserBanPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let history: any;

  try {
    const res = await axiosBack.post(
      "/user/user_transaction/get_user_transaction",
      {
        user_id: id,
        timestamp_from: "<integer>",
        timestamp_to: "<integer>",
        type: "mlm_percent",
        status: "success",
        from_: "<string>",
        to_: "<string>",
        skip: 0,
        limit: 9,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    console.log(res.data);

    const { status, content } = res.data;

    if (status.code != 200) {
      throw new Error("Error loading Transaction History for user");
    }

    history = content.history;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return <></>;
};

export default UserBanPage;
