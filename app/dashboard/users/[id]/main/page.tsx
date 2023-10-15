import { axiosBack, retrieveApiKey } from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import InfoBlock from "@/components/info-block";
import Image from "next/image";

const UserMainPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session = await getServerSession(authOptions);
  if (!session) return;
  const apiKey = retrieveApiKey(session.backendTokens);
  if (!apiKey) return;

  let main_info: UserMain;

  try {
    const res = await axiosBack.post(
      "/user/main_info/get_main_info",
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
      throw new Error("Error loading Main Info for user");
    }

    main_info = content.main_info;
  } catch (error: any) {
    console.error(error);
    return <>{String(error.response.status)}</>;
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col space-y-[30px]">
          <InfoBlock title="ID пользователя" content={main_info?.user_id} />
          <InfoBlock title="Логин" content={main_info?.user_login} />
          <InfoBlock title="телефон" content={main_info?.user_phone} />
          <InfoBlock title="Почта" content={main_info?.user_email} />
          <InfoBlock
            title="Подтвержден ли аккаунт"
            content={main_info?.user_is_confirmed ? "Да" : "Нет"}
          />
          <InfoBlock
            title="id родителя"
            content={main_info?.parent_id ?? "-"}
          />
          <InfoBlock
            title="Пройдена академия"
            content={main_info?.user_is_passed_academy ? "Да" : "Нет"}
          />
          <InfoBlock title="Баланс" content={String(main_info?.balance)} />
        </div>
        <div className="flex flex-col space-y-[10px]">
          <span className="font-medium text-[12px] leading-3 uppercase">
            лого пользователя
          </span>
          {main_info?.logo && (
            <Image
              alt="Лого пользователя"
              src={main_info.logo}
              height={200}
              width={200}
              className="rounded-[10px]"
            />
          )}
        </div>
      </div>
      <div>
        <Button
          asChild
          type="button"
          variant="formSubmit"
          size="md"
          className="text-[16px] h-10"
        >
          <Link href="main/edit">Изменить</Link>
        </Button>
      </div>
    </>
  );
};

export default UserMainPage;
