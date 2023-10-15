import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const UserBanPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let user_id: boolean;

  try {
    const res = await axiosBack.post(
      "/main/integration/get_user_lk_id",
      {
        input: "dev_account2",
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
      throw new Error("Error loading User Info");
    }

    user_id = content.user_id;
    // qeluOOfoU16jSye8Go9EcUhr
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <div className="flex flex-col space-y-[10px]">
        <span className="font-medium text-[12px] leading-3 uppercase">
          заблокирован ли доступ к p2p
        </span>
        <span className="font-bold text-[20px] leading-4">Нет</span>
      </div>
    </>
  );
};

export default UserBanPage;
