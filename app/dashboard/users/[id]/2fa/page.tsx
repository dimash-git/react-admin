import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import ModalPost from "@/components/modal-post";
import InfoBlock from "@/components/info-block";
import User2FAForm from "./_components/user-2fa-form";

const User2FAPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let two_fa_info: User2FA;

  try {
    const res = await axiosBack.post(
      "/user/2fa_info/get_2fa_info",
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
      throw new Error("Error loading 2FA Info for user");
    }

    two_fa_info = content.two_fa_info;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <InfoBlock
        title="Включена ли защита через email"
        content={two_fa_info?.email_enable ? "Да" : "Нет"}
      />
      <InfoBlock
        title="Включена ли защита через номер телефона"
        content={two_fa_info?.phone_enable ? "Да" : "Нет"}
      />
      <InfoBlock
        title="Включена ли защита через google 2fa"
        content={two_fa_info?.google_enable ? "Да" : "Нет"}
      />
      <div>
        <ModalPost
          Form={User2FAForm}
          title="Изменить настройки 2FA"
          maxWidth="max-w-[355px]"
          card={two_fa_info}
        >
          <Button
            asChild
            variant="formSubmit"
            size="md"
            className="text-[16px] h-10"
          >
            <span>Изменить</span>
          </Button>
        </ModalPost>
      </div>
    </>
  );
};

export default User2FAPage;
