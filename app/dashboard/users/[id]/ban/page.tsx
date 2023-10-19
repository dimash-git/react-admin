import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import ModalPost from "@/components/modal-post";
import UserBanForm from "./_components/user-ban-form";
import P2PBanForm from "./_components/p2p-ban-form";
import InfoBlock from "@/components/info-block";
import { redirect } from "next/navigation";

const UserBanPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let ban_info: UserBanned;

  try {
    const res = await axiosBack.post(
      "/user/ban_info/get_ban_info",
      {
        user_id: id,
      },
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    // console.log(res.data);

    const { status, content } = res.data;
    if (status.code != 200) {
      throw new Error("Error loading Ban Info for user");
    }

    ban_info = content.ban_info;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <InfoBlock
        title="Заблокирован ли доступ к p2p"
        content={ban_info?.is_p2p_ban ? "Да" : "-"}
      />
      <InfoBlock
        title="Заблокирован ли аккаунт
"
        content={ban_info?.is_user_ban ? "Да" : "-"}
      />
      <div className="flex items-center space-x-[10px]">
        <ModalPost
          Form={P2PBanForm}
          card={ban_info?.is_p2p_ban}
          title="Заблокировать доступ к P2P"
          maxWidth="max-w-[355px]"
        >
          <Button asChild variant="form">
            <span>Заблокировать доступ к P2P</span>
          </Button>
        </ModalPost>
        <ModalPost
          Form={UserBanForm}
          card={ban_info?.is_user_ban}
          title="Заблокировать аккаунт"
          maxWidth="max-w-[355px]"
        >
          <Button asChild variant="form">
            <span>Заблокировать аккаунт</span>
          </Button>
        </ModalPost>
      </div>
    </>
  );
};

export default UserBanPage;
