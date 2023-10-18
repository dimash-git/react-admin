import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { Button } from "@/components/ui/button";
import InfoBlock from "@/components/info-block";
import { ContactBlock } from "@/components/contact-block";
import TgIcon from "@/public/icons/telegram.svg";

import Link from "next/link";
import { unixToReadableDate } from "@/lib/utils";
import { redirect } from "next/navigation";

const UserPersonalPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (session?.error == "RefreshAccessTokenError") {
    redirect("/sign-in");
  }
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let personal_info: UserPersonal;

  try {
    const res = await axiosBack.post(
      "/user/personal_info/get_personal_info",
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
      throw new Error("Error loading Personal Info for user");
    }

    personal_info = content.personal_info;
  } catch (error) {
    console.error(error);
    return <>{String(error)}</>;
  }

  return (
    <>
      <InfoBlock title="Имя" content={personal_info?.first_name} />
      <InfoBlock title="Фамилия" content={personal_info?.last_name} />
      <InfoBlock title="Отчество" content={personal_info?.middle_name} />
      <InfoBlock
        title="День рождения"
        content={
          personal_info?.birthday_timestamp
            ? unixToReadableDate(personal_info.birthday_timestamp)
            : "-"
        }
      />
      <InfoBlock title="Страна" content={personal_info?.country} />
      <ContactBlock Icon={TgIcon} value={personal_info?.telegram} />

      <div>
        <Button
          asChild
          type="button"
          variant="formSubmit"
          size="md"
          className="text-[16px] h-10"
        >
          <Link href="personal/edit">Изменить</Link>
        </Button>
      </div>
    </>
  );
};

export default UserPersonalPage;
