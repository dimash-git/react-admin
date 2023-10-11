import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import ModalPost from "@/components/modal-post";
import UserBanForm from "./_components/user-ban-form";
import P2PBanForm from "./_components/p2p-ban-form";

const UserBanPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let two_fa_info: boolean;

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

    console.log(res.data);

    const { status, content } = res.data;

    if (status.code != 200) {
      throw new Error("Error loading Ban Info for user");
    }

    two_fa_info = content.two_fa_info;
    console.log(two_fa_info);
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
      <div className="flex flex-col space-y-[10px]">
        <span className="font-medium text-[12px] leading-3 uppercase">
          Причина блокировки доступа к p2p
        </span>
        <span className="font-bold text-[20px] leading-4">-</span>
      </div>
      <div className="flex flex-col space-y-[10px]">
        <span className="font-medium text-[12px] leading-3 uppercase">
          Заблокирован ли аккаунт
        </span>
        <span className="font-bold text-[20px] leading-4">Да</span>
      </div>
      <div className="flex flex-col space-y-[10px]">
        <span className="font-medium text-[12px] leading-3 uppercase">
          Причина блокировки аккаунта
        </span>
        <span className="font-bold text-[20px] leading-4">-</span>
      </div>
      <div className="flex items-center space-x-[10px]">
        <ModalPost
          Form={P2PBanForm}
          title="Заблокировать доступ к P2P"
          maxWidth="max-w-[355px]"
        >
          <Button asChild variant="form">
            <span>Заблокировать доступ к P2P</span>
          </Button>
        </ModalPost>
        <ModalPost
          Form={UserBanForm}
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
